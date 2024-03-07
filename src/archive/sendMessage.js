import clickElement from './utils/clickElement.js';
import typeInElement from './utils/typeInElement.js';
import getUserNamePostAuthor from './utils/getUserNamePostAuthor.js';

// Function to check if the aria-label matches the criteria to select the invite button
function matchesCriteria(ariaLabel) {
  var words = ariaLabel.split(' ');
  return (
    words.length <= 12 &&
    ariaLabel.startsWith('Invite ') &&
    ariaLabel.endsWith(' to connect')
  );
}

// timeWait = 1000;

// export default function sendConnectWithNote() {
//   console.log('sendConnectWithNote');

//   // Find all elements with an aria-label attribute
//   var allElements = document.querySelectorAll('[aria-label]');

//   // Find the first element that matches the criteria
//   var elementToInvite = Array.from(allElements).find((element) =>
//     matchesCriteria(element.getAttribute('aria-label'))
//   );

//   // Click the first matching element, if found
//   clickElement(elementToInvite);

//   setTimeout(function () {
//     // Select the element with aria-label="Add a note" and click it
//     var elementToAddNote = document.querySelector('[aria-label="Add a note"]');
//     clickElement(elementToAddNote);

//     // After 500 milliseconds, select the textarea and construct the greeting
//     setTimeout(function () {
//       var userName = getUserNamePostAuthor(); // Get the user's name from the h1 tag
//       var greeting = 'Hello ' + userName + '!'; // Construct the personalized greeting
//       var textarea = document.querySelector(
//         'textarea[placeholder="Ex: We know each other from…"]'
//       );
//       if (textarea) {
//         typeInElement(textarea, greeting);
//       }
//     }, timewait);
//   }, timewait);
// }

function waitForElement(selector, callback, timeout = 10000, interval = 100) {
  const startTime = Date.now();

  (function pollElement() {
    const element = document.querySelector(selector);
    const elapsedTime = Date.now() - startTime;

    if (element && element.offsetHeight > 0) {
      callback(element);
    } else if (elapsedTime < timeout) {
      setTimeout(pollElement, interval);
    } else {
      console.log(`Element ${selector} not found within ${timeout}ms.`);
    }
  })();
}

export default function sendConnectWithNote() {
  console.log('sendMessge');

  // Step 1: Select all elements with the class 'artdeco-button__text'
  const elements = document.querySelectorAll('.artdeco-button__text');

  // Step 2: Filter out the exact element with the text 'Message'
  const messageElement = Array.from(elements).find(
    (el) => el.textContent.trim() === 'Message'
  );
  console.log('elementToMessage', messageElement);
  clickElement(messageElement);

  var userName = getUserNamePostAuthor(); // Get the user's name from the h1 tag
  waitForElement('[placeholder="Subject (optional)"]', (elemMessageSubject) => {
    console.log('elemMessageSubject', elemMessageSubject);
    typeInElement(elemMessageSubject, 'Hello ' + userName + '!');
    waitForElement('[aria-label="Write a message…"]', (elemMessageBody) => {
      console.log('elemMessageBody', elemMessageBody);
      elemMessageBody.focus();
      var placeholder = document.querySelector(
        '[data-placeholder="Write a message…"]'
      );
      if (
        placeholder &&
        placeholder.classList.contains('msg-form__placeholder')
      ) {
        placeholder.classList.remove('msg-form__placeholder');
      }
      typeInElement(elemMessageBody, 'Hello from Ky Nam!');
    });
  });
}

// msg-form__placeholder
//         t-14 t-black--light t-normal

//         t-14 t-black--light t-normal

// // Wait for the "Add a note" element to be visible and clickable
// waitForElement('[aria-label="Add a note"]', (elementToAddNote) => {
//   clickElement(elementToAddNote);

//   // Wait for the textarea to be visible and clickable
//   waitForElement(
//     'textarea[placeholder="Ex: We know each other from…"]',
//     (textarea) => {
//       var userName = getUserNamePostAuthor(); // Get the user's name from the h1 tag
//       var greeting = 'Hello ' + userName + '!'; // Construct the personalized greeting
//       typeInElement(textarea, greeting);
//     }
//   );
// });
