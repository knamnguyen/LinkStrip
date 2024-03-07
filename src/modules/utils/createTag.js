import { deleteTag, saveTag } from './tagHandlers.js';
import generatePastelColor from './generatePastelColor.js';

export default function createTag(text, tagList) {
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
    deleteTag(text, 'includeTags');
  });

  tag.appendChild(span);
  tag.appendChild(removeButton);

  saveTag(text, tagList);

  return tag;
}
