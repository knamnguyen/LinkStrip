chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete') {
    chrome.tabs.sendMessage(tabId, {
      message: 'urlChange',
      url: tab.url,
    });
  }
});

function updateBadge(number) {
  chrome.action.setBadgeText({ text: '+' + number.toString() });
  chrome.action.setBadgeBackgroundColor({ color: [0, 0, 0, 100] });
}

// updateBadge(5); // This will display '5' on the badge.
