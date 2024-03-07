import addButtonFilterFeed from './modules/addElementOnPage/addButtonFilterFeed.js';
import addButtonDontShowFeed from './modules/addElementOnPage/addButtonDontShowFeed.js';
import addTagFilterInclude from './modules/addElementOnPage/addTagFilterInclude.js';
import addTagFilterExclude from './modules/addElementOnPage/addTagFilterExclude.js';

import './popup.css';
import waitForElement from './modules/utils/waitForElement.js';
import throttle from './modules/utils/throttle.js';
import sleep from './modules/utils/sleep.js';

// document.addEventListener('DOMContentLoaded', () => {
//   handleChangeAddNewButton();
//   // Listen for popstate events, which are triggered by back/forward navigation
//   window.addEventListener('popstate', () => {
//     handleChangeAddNewButton();
//   });
// });
// handleChangeAddNewButton();

// //body contains both the post feed and the react modal should it appear
// const handleChangeAddNewButtonThrottled = throttle(
//   handleChangeAddNewButton,
//   200
// );

// let feedObserve = new MutationObserver(handleChangeAddNewButtonThrottled);
// const config = {
//   childList: true,
//   subtree: true,
// };

function handleUrlChange(url) {
  // feedObserve.disconnect();

  if (
    url.startsWith('https://www.linkedin.com/feed/') ||
    url.startsWith('https://www.linkedin.com/posts/')
  ) {
    // handleChangeAddNewButton();
    //the better way would be to use a mutation observer - which is not necesaary in most cases
    setTimeout(handleChangeAddNewButton, 1000);
    console.log('THIS IS THE FEED');
  }
}

// Function that responds to messages from the background script
function handleMessage(request, sender, sendResponse) {
  //   console.log('request', request);
  if (request.message === 'urlChange') {
    handleUrlChange(request.url);
  }
}
// Listen for messages from the background script to detect url changes
chrome.runtime.onMessage.addListener(handleMessage);

//this happens on first load (new url change & fresh content is loaded) and when new posts appear (observer)
async function handleChangeAddNewButton() {
  //select the top feed bar for addButtonFilter with class
  const containerFeedBar = document.getElementsByClassName(
    'mb2 artdeco-dropdown artdeco-dropdown--placement-bottom artdeco-dropdown--justification-right ember-view'
  );
  Array.from(containerFeedBar).forEach((container) => {
    addButtonFilterFeed(container);
    addButtonDontShowFeed(container);
  });

  // const containerTagFilterInputSticky = document.querySelectorAll(
  //   '.scaffold-layout__sticky-content'
  // )[1];

  const containerTagFilterInputSticky = document.getElementsByClassName(
    'scaffold-layout__sticky-content'
  )[1];

  // })
  if (
    containerTagFilterInputSticky &&
    !document.getElementById('filter-tag-container')
  ) {
    console.log('filter ADDING');

    //create container for tag filter
    const filterTagContainer = document.createElement('div');
    filterTagContainer.id = 'filter-tag-container';
    filterTagContainer.style.marginBottom = '10px';
    filterTagContainer.style.backgroundColor = 'white';
    // filterTagContainer.style.border = '10px solid ##eaeaea';
    filterTagContainer.style.border = '1.25px solid #e0dfdb';
    filterTagContainer.style.borderWidth = '1.25px';
    filterTagContainer.style.borderRadius = '8px';
    filterTagContainer.style.padding = '12px';
    containerTagFilterInputSticky.prepend(filterTagContainer);

    addTagFilterInclude(filterTagContainer);
    addTagFilterExclude(filterTagContainer);
  } else {
    console.log('TOO FAST');
    console.log('containerTagFilterInputSticky', containerTagFilterInputSticky);
  }

  //HIde irrelevant posts - put here so that affects observer
  // hideIrrelevantPosts();
}

