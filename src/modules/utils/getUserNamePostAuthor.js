// Function to get the user's name from the h1 tag
export default function getUserNamePostAuthor() {
  var h1 = document.querySelector('h1');
  return h1 ? h1.textContent.trim() : '';
}
