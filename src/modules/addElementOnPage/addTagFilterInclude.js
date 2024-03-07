import activateButton from '../utils/activateButton.js';
import deactivateButton from '../utils/deactivateButton.js';
import createButton from '../utils/createButton.js';
import createDivider from '../utils/createDivider.js';
import generatePastelColor from '../utils/generatePastelColor.js';

//import icon for extension
const iconPath = chrome.runtime.getURL('icons/ls-icon-512x512.png');

export default async function addTagFilterInclude(container) {
  if (!container) return;
  if (container.querySelector('#tag-filter-input-container')) return;

  //function to create new tag
  function createTag(text) {
    const tag = document.createElement('div');
    tag.style.display = 'flex';
    tag.style.alignItems = 'center';
    tag.style.flexShrink = '1';
    tag.style.minWidth = '0px';
    tag.style.maxWidth = '100%';
    tag.style.height = '20px';
    tag.style.borderRadius = '3px';
    tag.style.paddingLeft = '6px';
    tag.style.paddingRight = '0px';
    tag.style.fontSize = '14px';
    tag.style.fontWeight = '450';
    tag.style.lineHeight = '120%';
    tag.style.color = 'black';
    //   tag.style.background = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
    //     Math.random() * 256
    //   )}, ${Math.floor(Math.random() * 256)}, 0.6)`;

    // Update the tag background color to use pastel colors
    tag.style.background = generatePastelColor();
    tag.style.margin = '0px 6px 6px 0px';
    tag.style.whiteSpace = 'nowrap';
    tag.style.overflow = 'hidden';
    tag.style.textOverflow = 'ellipsis';

    // Create the span element for the tag text
    const span = document.createElement('span');
    span.style.whiteSpace = 'nowrap';
    span.style.overflow = 'hidden';
    span.style.textOverflow = 'ellipsis';
    span.style.display = 'inline-flex';
    span.style.alignItems = 'center';
    span.style.height = '20px';
    span.style.lineHeight = '20px';
    span.textContent = text;

    const removeButton = document.createElement('div');
    removeButton.role = 'button';
    removeButton.tabIndex = '0';
    removeButton.className = 'notion-token-remove-button';
    removeButton.style.userSelect = 'none';
    removeButton.style.transition = 'background 20ms ease-in 0s';
    removeButton.style.cursor = 'pointer';
    removeButton.style.display = 'flex';
    removeButton.style.alignItems = 'center';
    removeButton.style.justifyContent = 'center';
    removeButton.style.flexGrow = '0';
    removeButton.style.flexShrink = '0';
    removeButton.style.marginLeft = '2px';
    removeButton.style.marginRight = '2px';
    removeButton.style.width = '20px';
    removeButton.style.height = '20px';

    // Create the SVG element for the close icon
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('role', 'graphics-symbol');
    svg.setAttribute('viewBox', '0 0 8 8');
    svg.setAttribute('class', 'closeThick');
    svg.setAttribute(
      'style',
      ' width: 8px; height: 8px; display: block; fill: black; flex-shrink: 0; opacity: 0.5;'
    );

    const polygon = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'polygon'
    );
    polygon.setAttribute(
      'points',
      '8 1.01818182 6.98181818 0 4 2.98181818 1.01818182 0 0 1.01818182 2.98181818 4 0 6.98181818 1.01818182 8 4 5.01818182 6.98181818 8 8 6.98181818 5.01818182 4'
    );
    polygon.setAttribute('style', 'fill: black');

    removeButton.appendChild(svg);

    svg.appendChild(polygon);
    removeButton.addEventListener('click', function () {
      tagContainer.removeChild(tag);
      deleteTag(text);
    });

    tag.appendChild(span);
    tag.appendChild(removeButton);

    saveTag(text);
    return tag;
  }

  // Create the main container
  const mainContainer = document.createElement('div');
  mainContainer.id = 'tag-filter-input-container';
  mainContainer.className = 'notion-scroller vertical';
  mainContainer.style.zIndex = '1';
  mainContainer.style.flexShrink = '0';
  mainContainer.style.maxHeight = '240px';
  // mainContainer.style.boxShadow = 'rgba(55, 53, 47, 0.16) 0px -1px inset';
  mainContainer.style.overflow = 'hidden auto';
  mainContainer.style.marginRight = '0px';
  mainContainer.style.marginBottom = '0px';
  mainContainer.style.marginTop = '0px';

  // Create the tag container
  const tagContainer = document.createElement('div');
  tagContainer.className = 'notion-scroller vertical horizontal';
  tagContainer.style.zIndex = '1';
  tagContainer.style.display = 'flex';
  tagContainer.style.flexWrap = 'wrap';
  tagContainer.style.alignItems = 'flex-start';
  // tagContainer.style.background = 'rgba(242, 241, 238, 0.6)';
  tagContainer.style.cursor = 'text';
  tagContainer.style.overflow = 'auto';
  tagContainer.style.padding = '5px 9px 1px';
  tagContainer.style.width = '100%';
  tagContainer.style.minHeight = '34px';
  tagContainer.style.fontSize = '14px';
  tagContainer.style.marginRight = '0px';
  tagContainer.style.marginBottom = '0px';

  // Create the input field for adding new tags
  const inputField = document.createElement('input');
  inputField.type = 'text';
  inputField.style.fontSize = 'inherit';
  inputField.style.keHeight = 'inherit';
  inputField.style.border = 'none';
  inputField.style.background = 'none';
  inputField.style.width = '100%';
  inputField.style.display = 'block';
  inputField.style.resize = 'none';
  inputField.style.padding = '0px';
  inputField.style.height = '18px';
  inputField.style.flex = '1 1 60px';
  inputField.style.minWidth = '60px';
  inputField.style.margin = '0px 6px 6px 0px';
  //   inputField.style.borderTopLeftRadius = '4px';
  //   inputField.style.borderTopRightRadius = '4px';
  //   inputField.style.borderBottomLeftRadius = '4px'
  inputField.placeholder = 'new tag...';
  inputField.style.outline = 'none';
  inputField.style.outline = 'none';

  inputField.style.boxShadow = 'none';

  // Handle the enter key press to add a new tag
  inputField.addEventListener('keypress', function (e) {
    if (e.key === 'Enter' && inputField.value.trim() !== '') {
      const newTag = createTag(inputField.value.trim());
      tagContainer.insertBefore(newTag, inputField);
      inputField.value = ''; // Clear the input field after adding a tag
    }
  });

  //load tags from storage
  loadTags();
  mainContainer.appendChild(tagContainer);

  // Prepend the main container as the first child of the second '.scaffold-layout__sticky-content' element
  const targetContainer = container;
  // targetContainer.insertBefore(mainContainer, targetContainer.firstChild);
  targetContainer.appendChild(mainContainer);

  //TAG HANDLING

  function loadTags() {
    chrome.storage.local.get({ includeTags: [] }, function (result) {
      const tags = result.includeTags;
      tags.forEach((tagText) => {
        const tagElement = createTag(tagText); // Use your function to create and display the tag
        tagContainer.appendChild(tagElement);
      });
      tagContainer.appendChild(inputField);
    });
  }

  function saveTag(tagText) {
    chrome.storage.local.get({ includeTags: [] }, function (result) {
      const updatedTags = result.includeTags;
      if (!updatedTags.includes(tagText)) {
        updatedTags.push(tagText);
        chrome.storage.local.set({ includeTags: updatedTags }, function () {
          console.log('Tag saved:', tagText);
        });
      }
    });
  }

  function deleteTag(tagText) {
    chrome.storage.local.get({ includeTags: [] }, function (result) {
      const updatedTags = result.includeTags.filter((t) => t !== tagText);
      chrome.storage.local.set({ includeTags: updatedTags }, function () {
        console.log('Tag deleted:', tagText);
      });
    });
  }

  ///////////////////////////////////////////////////////////////////

  var divElement = document.createElement('div');

  // Step 2: Add the required classes to the div
  divElement.classList.add('display-flex', 't-black');

  divElement.id = 'filter-button-container';
  divElement.style.marginRight = '1px';
  divElement.style.gap = '0.5px';
  divElement.style.marginTop = '10px';

  //create filter span
  var tagModeSpan = document.createElement('span');
  tagModeSpan.textContent = 'Include option:';
  tagModeSpan.classList.add('t-black--light', 't-12', 't-bold');
  tagModeSpan.style.whiteSpace = 'nowrap';

  // Create filter buttons
  var tagFilterButtonAnd = createButton(
    'tag-filter-and',
    'AND',
    handleClickFilter
  );
  var dividerElement1 = createDivider();
  var tagFilterButtonOr = createButton(
    'tag-filter-or',
    'OR',
    handleClickFilter
  );
  var dividerElement2 = createDivider();
  var filterButtonOff = createButton(
    'tag-filter-button-off',
    'Off',
    handleClickFilter
  );

  var linkButtonKyNam = createButton('link-button-kynam', 'Say Hi 🙋‍♂️', () => {
    window.open('https://ko-fi.com/kynam', '_blank');
  });

  // Add buttons and dividers to the DOM as needed

  //combine into div
  divElement.appendChild(tagModeSpan);
  divElement.appendChild(tagFilterButtonAnd);
  divElement.appendChild(dividerElement1);
  divElement.appendChild(tagFilterButtonOr);

  divElement.appendChild(dividerElement2);
  divElement.appendChild(filterButtonOff);

  // Load the saved states of the buttons
  const filterButtons = [
    'tag-filter-and',
    'tag-filter-or',
    'tag-filter-button-off',
  ];

  for (const id of filterButtons) {
    chrome.storage.local.get(id, (result) => {
      const button = document.getElementById(id);
      if (result[id]) {
        activateButton(button);
      } else {
        deactivateButton(button);
      }
    });
  }

  mainContainer.prepend(divElement);
  // Create the title container
  const titleContainer = document.createElement('div');
  const textTitle = document.createElement('span');
  textTitle.textContent = 'LinkStrip';
  titleContainer.style.fontstyle = 'bold';
  textTitle.style.display = 'flex';
  textTitle.style.alignItems = 'center';
  titleContainer.style.display = 'flex';
  titleContainer.style.alignItems = 'center';
  titleContainer.style.justifyContent = 'space-between';

  const iconTitle = document.createElement('img');
  iconTitle.src = iconPath;
  iconTitle.style.width = '20px';
  iconTitle.style.height = '20px';
  iconTitle.style.marginRight = '10px';
  textTitle.prepend(iconTitle);

  titleContainer.appendChild(textTitle);
  titleContainer.appendChild(linkButtonKyNam);
  mainContainer.prepend(titleContainer);
}

//ON OFF BUTTON HANDDLING

function handleClickFilter(mode) {
  const filterButtons = [
    'tag-filter-and',
    'tag-filter-or',
    'tag-filter-button-off',
  ];

  const offButton = document.getElementById('tag-filter-button-off');

  for (const id of filterButtons) {
    const button = document.getElementById(id);

    if (id === mode) {
      if (id === 'tag-filter-button-off') {
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
    if (id === 'tag-filter-button-off') return false; // Ignore 'off' button in this check
    const button = document.getElementById(id);
    return button.classList.contains('t-bold');
  });

  if (!anyButtonActive) {
    activateButton(offButton);
  } else {
    deactivateButton(offButton);
  }
}