import activateButton from '../utils/activateButton.js';
import deactivateButton from '../utils/deactivateButton.js';
import createButton from '../utils/createButton.js';
import createDivider from '../utils/createDivider.js';

//import hidePostTYpe
import {
  hideAd,
  hideCompany,
  hideBanner,
  showAd,
  showCompany,
  showBanner,
} from '../filterFunction/hidePostType.js';

export default function addButtonDontShowFeed(container) {
  if (!container) return;
  if (document.getElementById('dontshow-button-container')) return;

  console.log('add button filter feed triggered');

  //create the parent div element

  // Step 1: Create the div element
  var divElement = document.createElement('div');

  // Step 2: Add the required classes to the div
  divElement.classList.add('display-flex', 't-black');

  // divElement.id = 'dontshow-button-container';
  divElement.style.marginRight = '1px';
  divElement.style.gap = '0.5px';

  //create filter span
  var hideSpan = document.createElement('span');
  hideSpan.textContent = "Don't show:";
  hideSpan.classList.add('t-black--light', 't-12', 't-bold');
  hideSpan.style.whiteSpace = 'nowrap';

  // Usage example:
  var hideButtonAd = createButton(
    'hide-button-ad',
    'Promoted',
    handleClickHide
  );
  var dividerElement1 = createDivider();
  var hideButtonCompany = createButton(
    'hide-button-company',
    'Company',
    handleClickHide
  );
  var dividerElement2 = createDivider();
  var hideButtonLinkedinBanner = createButton(
    'hide-button-linkedin-banner',
    'Banner',
    handleClickHide
  );
  var dividerElement3 = createDivider();
  var hideButtonOff = createButton('hide-button-off', 'Off', handleClickHide);
  var dividerElement4 = createDivider();
  var linkButtonKyNam = createButton('link-button-kynam', 'Say Hi 🙋‍♂️', () => {
    window.open('https://ko-fi.com/kynam', '_blank');
  });

  //combine into div
  divElement.appendChild(hideSpan);
  divElement.appendChild(hideButtonAd);
  divElement.appendChild(dividerElement1);
  divElement.appendChild(hideButtonCompany);
  divElement.appendChild(dividerElement2);
  divElement.appendChild(hideButtonLinkedinBanner);
  divElement.appendChild(dividerElement3);
  divElement.appendChild(hideButtonOff);

  // load initial state of buttons
  const hideButtons = [
    'hide-button-ad',
    'hide-button-company',
    'hide-button-linkedin-banner',
    'hide-button-off',
  ];

  for (const id of hideButtons) {
    chrome.storage.local.get([id], function (result) {
      const button = document.getElementById(id);
      if (result[id]) {
        activateButton(button);
        checkButtonStatesForObservers();
      } else {
        deactivateButton(button);
      }
    });
  }

  //get the buttons that are active based on the initial state

  //set up initial observers based on the initial state of the buttons

  //creat parent div elemen
  const parentDivElement = document.createElement('div');
  parentDivElement.id = 'dontshow-button-container';
  parentDivElement.classList.add(
    'artdeco-dropdown',
    'artdeco-dropdown--placement-bottom',
    'artdeco-dropdown--justification-right',
    'ember-view'
  );

  //get header's height
  // const header = document.getElementsByTagName('header')[0];
  const header = document.getElementById('global-nav');

  const headerHeight = header.offsetHeight;
  console.log('headerHeight', headerHeight);

  parentDivElement.style.display = 'flex';
  parentDivElement.style.justifyContent = 'space-between';
  parentDivElement.style.position = 'sticky';
  parentDivElement.style.top = `${headerHeight - 0.5}px`;
  parentDivElement.style.zIndex = '10';
  parentDivElement.style.backgroundColor = 'rgb(244, 242, 238)';
  parentDivElement.style.padding = '3px 5px';

  parentDivElement.appendChild(divElement);
  parentDivElement.appendChild(linkButtonKyNam);

  container.before(parentDivElement);
}

//everytime a button is clicked, must reset the observer

//this guys rerenders all buttons on every click to any button
function handleClickHide(mode) {
  //prev mode

  const hideButtons = [
    'hide-button-ad',
    'hide-button-company',
    'hide-button-linkedin-banner',
    'hide-button-off',
  ];

  const offButton = document.getElementById('hide-button-off');

  for (const id of hideButtons) {
    const button = document.getElementById(id);

    if (id === mode) {
      if (id === 'hide-button-off') {
        // If 'off' button is clicked while active, do nothing
        if (!button.classList.contains('t-bold')) {
          activateButton(button);
          // Deactivate all other buttons
          for (const otherId of hideButtons) {
            if (otherId !== 'hide-button-off') {
              const otherButton = document.getElementById(otherId);
              deactivateButton(otherButton);
            }
          }
        }
      } else {
        // For other buttons, toggle their active state
        if (button.classList.contains('t-bold')) {
          deactivateButton(button);
        } else {
          activateButton(button);
          // If any other button is activated, deactivate the 'off' button
          deactivateButton(offButton);
        }
      }
      console.log('buttonActive', button);
    }
  }

  // After all buttons have been processed, check if 'off' button should be activated
  const anyButtonActive = hideButtons.some((id) => {
    if (id === 'hide-button-off') return false; // Ignore 'off' button in this check
    const button = document.getElementById(id);
    return button.classList.contains('t-bold');
  });

  if (!anyButtonActive) {
    activateButton(offButton);
  }

  //check buttons' state
  checkButtonStatesForObservers();
}

// Define observers globally to manage them easily
let adObserver = null;
let companyObserver = null;
let bannerObserver = null;

// Function to start observing changes for ads, companies, and banners
function startObservers(mode) {
  //get parent of the feed
  const feedParent = document.getElementsByClassName(
    'scaffold-finite-scroll__content'
  )[0];

  const config = { childList: true, subtree: true };

  // Observer for ads
  if (!adObserver && mode === 'hide-button-ad') {
    hideAd(feedParent);
    adObserver = new MutationObserver((mutations) => {
      hideAd(feedParent);
    });
    adObserver.observe(document.body, config);
  }

  // Observer for companies
  if (!companyObserver && mode === 'hide-button-company') {
    hideCompany(feedParent);
    companyObserver = new MutationObserver((mutations) => {
      hideCompany(feedParent);
    });
    companyObserver.observe(document.body, config);
  }

  // Observer for banners
  if (!bannerObserver && mode === 'hide-button-linkedin-banner') {
    hideBanner(feedParent);
    bannerObserver = new MutationObserver((mutations) => {
      hideBanner(feedParent);
    });
    bannerObserver.observe(document.body, config);
  }

  console.log('observers started:', mode);
}

// Function to stop all observers
function stopObservers(mode) {
  //get parent of the feed
  const feedParent = document.getElementsByClassName(
    'scaffold-finite-scroll__content'
  )[0];

  if (adObserver && mode === 'hide-button-ad') {
    adObserver.disconnect();
    adObserver = null;
    showAd(feedParent);
  }
  if (companyObserver && mode === 'hide-button-company') {
    companyObserver.disconnect();
    companyObserver = null;
    showCompany(feedParent);
  }
  if (bannerObserver && mode === 'hide-button-linkedin-banner') {
    bannerObserver.disconnect();
    bannerObserver = null;
    showBanner(feedParent);
  }

  if (mode === 'hide-button-off') {
    if (adObserver) {
      adObserver.disconnect();
      adObserver = null;
      showAd(feedParent);
    }
    if (companyObserver) {
      companyObserver.disconnect();
      companyObserver = null;
      showCompany(feedParent);
    }
    if (bannerObserver) {
      bannerObserver.disconnect();
      bannerObserver = null;
      showBanner(feedParent);
    }
  }

  console.log('observers stopped:', mode);
}

function checkButtonStatesForObservers() {
  const hideButtonAdActive = document
    .getElementById('hide-button-ad')
    .getAttribute('active');
  const hideButtonCompanyActive = document
    .getElementById('hide-button-company')
    .getAttribute('active');
  const hideButtonLinkedinBannerActive = document
    .getElementById('hide-button-linkedin-banner')
    .getAttribute('active');
  const hideButtonOffActive = document
    .getElementById('hide-button-off')
    .getAttribute('active');

  console.log('hideButtonAdActive', hideButtonAdActive);
  console.log('hideButtonCompanyActive', hideButtonCompanyActive);
  console.log('hideButtonLinkedinBannerActive', hideButtonLinkedinBannerActive);
  console.log('hideButtonOffActive', hideButtonOffActive);

  if (hideButtonOffActive === 'true') {
    //Shut down all filters and observers
    stopObservers('hide-button-off');
  }

  if (hideButtonAdActive === 'true') {
    //activate ad filter
    startObservers('hide-button-ad');
  } else {
    //deactivate ad filter
    stopObservers('hide-button-ad');
  }

  if (hideButtonCompanyActive === 'true') {
    //activate company filter
    startObservers('hide-button-company');
  } else {
    //deactivate company filter
    stopObservers('hide-button-company');
  }

  if (hideButtonLinkedinBannerActive === 'true') {
    //activate linkedin banner filter
    startObservers('hide-button-linkedin-banner');
  } else {
    //deactivate linkedin banner filter
    stopObservers('hide-button-linkedin-banner');
  }
}
