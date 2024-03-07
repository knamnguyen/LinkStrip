export default function createButton(id, text, clickHandler) {
  var button = document.createElement('button');
  button.id = id;
  button.classList.add(
    't-12',
    'mh1',
    'artdeco-button--muted',
    'artdeco-button--tertiary',
    'button',
    'ember-view'
  );
  button.textContent = text;
  button.style.whiteSpace = 'nowrap';
  button.onclick = () => clickHandler(id);
  return button;
}