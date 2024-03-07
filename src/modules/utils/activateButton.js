export default function activateButton(button) {
  button.classList.add('t-bold');
  button.classList.remove('t-12');
  button.style.backgroundColor = '#666666';
  button.style.color = 'white';
  button.setAttribute('active', true);
  chrome.storage.local.set({ [button.id]: true });
}
