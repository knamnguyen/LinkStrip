export function loadTags(tagListName, tagContainer, inputField) {
  chrome.storage.local.get({ [tagListName]: [] }, function (result) {
    const tags = result[tagListName];
    tags.forEach((tagText) => {
      const tagElement = createTag(tagText); // Ensure createTag is accessible
      tagContainer.appendChild(tagElement);
    });
    tagContainer.appendChild(inputField);
  });
}

export function saveTag(tagText, tagListName) {
  chrome.storage.local.get({ [tagListName]: [] }, function (result) {
    const updatedTags = result[tagListName];
    if (!updatedTags.includes(tagText)) {
      updatedTags.push(tagText);
      chrome.storage.local.set({ [tagListName]: updatedTags }, function () {
        console.log(`Tag saved in ${tagListName}:`, tagText);
      });
    }
  });
}

export function deleteTag(tagText, tagListName) {
  chrome.storage.local.get({ [tagListName]: [] }, function (result) {
    const updatedTags = result[tagListName].filter((t) => t !== tagText);
    chrome.storage.local.set({ [tagListName]: updatedTags }, function () {
      console.log(`Tag deleted from ${tagListName}:`, tagText);
    });
  });
}
