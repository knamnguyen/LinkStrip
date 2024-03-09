import activateButton from '../utils/activateButton.js';
import deactivateButton from '../utils/deactivateButton.js';
import createButton from '../utils/createButton.js';
import createDivider from '../utils/createDivider.js';

import {
  hideTime60min,
  hideTime12h,
  hideTime1day,
  showTime60min,
  showTime12h,
  showTime1day,
} from '../filterFunction/hidePostTime.js';

export default function addButtonFilterFeed(container) {
  if (!container) return;

  if (container.id === 'dontshow-button-container') return;

  if (container.querySelector('#filter-button-container')) return;

  console.log('add button filter feed triggered');

  // Step 1: Create the div element
  var divElement = document.createElement('div');

  // Step 2: Add the required classes to the div
  divElement.classList.add('display-flex', 't-black');

  divElement.id = 'filter-button-container';
  divElement.style.marginRight = '1px';
  divElement.style.gap = '0.5px';

  //create filter span
  var filterSpan = document.createElement('span');
  filterSpan.textContent = 'Filter last:';
  filterSpan.classList.add('t-black--light', 't-12', 't-bold');
  filterSpan.style.whiteSpace = 'nowrap';

  // Create filter buttons
  var filterButtonLast60 = createButton(
    'filter-button-last-60',
    '60 min',
    handleClickFilter
  );
  var dividerElement1 = createDivider();
  var filterButtonLast12 = createButton(
    'filter-button-last-12',
    '12 hours',
    handleClickFilter
  );
  var dividerElement2 = createDivider();
  var filterButtonLastDay = createButton(
    'filter-button-last-day',
    '1 day',
    handleClickFilter
  );
  var dividerElement3 = createDivider();
  var filterButtonOff = createButton(
    'filter-button-off',
    'Off',
    handleClickFilter
  );

  // Add buttons and dividers to the DOM as needed

  //combine into div
  divElement.appendChild(filterSpan);
  divElement.appendChild(filterButtonLast60);
  divElement.appendChild(dividerElement1);
  divElement.appendChild(filterButtonLast12);
  divElement.appendChild(dividerElement2);
  divElement.appendChild(filterButtonLastDay);
  divElement.appendChild(dividerElement3);
  divElement.appendChild(filterButtonOff);

  // Load the saved states of the buttons
  const filterButtons = [
    'filter-button-last-60',
    'filter-button-last-12',
    'filter-button-last-day',
    'filter-button-off',
  ];

  for (const id of filterButtons) {
    chrome.storage.local.get(id, (result) => {
      const button = document.getElementById(id);
      if (result[id]) {
        activateButton(button);
        checkButtonStatesForObservers();
        // activate initial observers
        //get saved states of the buttons
      } else {
        deactivateButton(button);
        checkButtonStatesForObservers();
      }
    });
  }

  //get header's height
  // const header = document.getElementsByTagName('header')[0];
  const header = document.getElementById('global-nav');
  const headerHeight = header.offsetHeight;
  console.log('headerHeight', headerHeight);

  //add div as the first child of container
  container.style.display = 'flex';
  container.style.position = 'sticky';

  container.style.top = (75 - 52 + headerHeight).toString() + 'px';
  container.style.zIndex = '10';
  container.style.backgroundColor = '#f4f2ee';
  container.style.borderRadius = '0 0 8px 8px';
  container.style.padding = '3px 5px';
  container.prepend(divElement);
}

function handleClickFilter(mode) {
  const filterButtons = [
    'filter-button-last-60',
    'filter-button-last-12',
    'filter-button-last-day',
    'filter-button-off',
  ];

  const offButton = document.getElementById('filter-button-off');

  for (const id of filterButtons) {
    const button = document.getElementById(id);

    if (id === mode) {
      if (id === 'filter-button-off') {
        // If 'off' button is clicked while active, do nothing
        if (!button.classList.contains('t-bold')) {
          activateButton(button);
        }
      } else {
        // For other buttons, toggle their active state
        if (button.classList.contains('t-bold')) {
          deactivateButton(button);
        } else {
          activateButton(button);
        }
      }
      console.log('buttonActive', button);
    } else {
      deactivateButton(button);
    }
  }

  // After all buttons have been processed, check if 'off' button should be activated
  const anyButtonActive = filterButtons.some((id) => {
    if (id === 'filter-button-off') return false; // Ignore 'off' button in this check
    const button = document.getElementById(id);
    return button.classList.contains('t-bold');
  });

  if (!anyButtonActive) {
    activateButton(offButton);
  } else {
    deactivateButton(offButton);
  }

  checkButtonStatesForObservers();
}

// Define observers globally to manage them easily
let min60Observer = null;
let h12bserver = null;
let day1Observer = null;

// Function to start observing changes for ads, companies, and banners
function startObservers(mode) {
  const config = { childList: true, subtree: true };

  //get parent of the feed
  const feedParent = document.querySelector('.scaffold-finite-scroll__content');

  // Observer for ads
  if (!min60Observer && mode === 'filter-button-last-60') {
    hideTime60min(feedParent);
    min60Observer = new MutationObserver((mutations) => {
      hideTime60min(feedParent);
    });
    min60Observer.observe(document.body, config);
  }

  // Observer for companies
  if (!h12bserver && mode === 'filter-button-last-12') {
    hideTime12h(feedParent);
    h12bserver = new MutationObserver((mutations) => {
      hideTime12h(feedParent);
    });
    h12bserver.observe(document.body, config);
  }

  // Observer for banners
  if (!day1Observer && mode === 'filter-button-last-day') {
    hideTime1day(feedParent);
    day1Observer = new MutationObserver((mutations) => {
      hideTime1day(feedParent);
    });
    day1Observer.observe(document.body, config);
  }

  console.log('observers started:', mode);
}

// Function to stop all observers
function stopObservers(mode) {
  //get parent of the feed
  const feedParent = document.querySelector('.scaffold-finite-scroll__content');

  if (min60Observer && mode === 'filter-button-last-60') {
    min60Observer.disconnect();
    min60Observer = null;
    showTime60min(feedParent);
  }
  if (h12bserver && mode === 'filter-button-last-12') {
    h12bserver.disconnect();
    h12bserver = null;
    showTime12h(feedParent);
  }
  if (day1Observer && mode === 'filter-button-last-day') {
    day1Observer.disconnect();
    day1Observer = null;
    showTime1day(feedParent);
  }

  if (mode === 'filter-button-off') {
    if (min60Observer) {
      min60Observer.disconnect();
      min60Observer = null;
      showTime60min(feedParent);
    }
    if (h12bserver) {
      h12bserver.disconnect();
      h12bserver = null;
      showTime12h(feedParent);
    }
    if (day1Observer) {
      day1Observer.disconnect();
      day1Observer = null;
      showTime1day(feedParent);
    }
  }

  console.log('observers stopped:', mode);
}

//active is set by activate/deactivate functions
function checkButtonStatesForObservers() {
  const filterButtonLast60Active = document
    .getElementById('filter-button-last-60')
    .getAttribute('active');
  const filterButtonLast12Active = document
    .getElementById('filter-button-last-12')
    .getAttribute('active');
  const filterButtonLastDayActive = document
    .getElementById('filter-button-last-day')
    .getAttribute('active');
  const filterButtonOffActive = document
    .getElementById('filter-button-off')
    .getAttribute('active');

  console.log('filterButtonLast60Active', filterButtonLast60Active);
  console.log('filterButtonLast12Active', filterButtonLast12Active);
  console.log('filterButtonLastDayActive', filterButtonLastDayActive);
  console.log('filterButtonOffActive', filterButtonOffActive);

  if (filterButtonOffActive === 'true') {
    //Shut down all filters and observers
    stopObservers('filter-button-off');
  }

  if (filterButtonLast60Active === 'true') {
    //activate ad filter
    startObservers('filter-button-last-60');
    console.log('filter-button-last-60 active, OBSERVER STARTED');
  } else {
    //deactivate ad filter
    stopObservers('filter-button-last-60');
  }

  if (filterButtonLast12Active === 'true') {
    //activate company filter
    startObservers('filter-button-last-12');
  } else {
    //deactivate company filter
    stopObservers('filter-button-last-12');
  }

  if (filterButtonLastDayActive === 'true') {
    //activate linkedin banner filter
    startObservers('filter-button-last-day');
  } else {
    //deactivate linkedin banner filter
    stopObservers('filter-button-last-day');
  }
}
