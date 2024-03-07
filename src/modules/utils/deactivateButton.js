export default function deactivateButton(button) {
  button.classList.remove('t-bold');
  button.classList.add('t-12');
  button.style.backgroundColor = '';
  button.style.color = '';
  button.setAttribute('active', false);
  chrome.storage.local.set({ [button.id]: false });
}
