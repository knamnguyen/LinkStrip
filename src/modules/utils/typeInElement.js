// // Function to simulate typing into a textarea or a contenteditable div
// export default function typeInElement(element, text) {
//   if (
//     element.tagName.toLowerCase() === 'textarea' ||
//     element.tagName.toLowerCase() === 'input'
//   ) {
//     element.value = text;
//   } else if (element.isContentEditable) {
//     element.textContent = '';
//     for (let char of text) {
//       let keyEvent = new KeyboardEvent('keydown', { key: char, bubbles: true });
//       element.dispatchEvent(keyEvent);

//       keyEvent = new KeyboardEvent('keypress', { key: char, bubbles: true });
//       element.dispatchEvent(keyEvent);

//       element.textContent += char;

//       keyEvent = new KeyboardEvent('keyup', { key: char, bubbles: true });
//       element.dispatchEvent(keyEvent);
//     }
//   }

//   // Dispatch an input event to simulate user typing
//   var event = new Event('input', { bubbles: true });
//   element.dispatchEvent(event);
// }

// export default function typeInElement(element, text) {
//   if (
//     element.tagName.toLowerCase() === 'textarea' ||
//     element.tagName.toLowerCase() === 'input'
//   ) {
//     element.value = text;
//     element.dispatchEvent(new Event('input', { bubbles: true }));
//     element.dispatchEvent(new Event('change', { bubbles: true }));
//   } else if (element.isContentEditable) {
//     element.textContent = '';
//     for (let char of text) {
//       let keyEvent = new KeyboardEvent('keydown', { key: char, bubbles: true });
//       element.dispatchEvent(keyEvent);

//       keyEvent = new KeyboardEvent('keypress', { key: char, bubbles: true });
//       element.dispatchEvent(keyEvent);

//       element.textContent += char;

//       keyEvent = new KeyboardEvent('keyup', { key: char, bubbles: true });
//       element.dispatchEvent(keyEvent);

//       element.dispatchEvent(new Event('input', { bubbles: true }));
//       element.dispatchEvent(new Event('change', { bubbles: true }));
//     }
//   }
// }

export default function typeInElement(element, text) {
  if (
    element.tagName.toLowerCase() === 'textarea' ||
    element.tagName.toLowerCase() === 'input'
  ) {
    element.value = text;
    element.dispatchEvent(new Event('input', { bubbles: true }));
    element.dispatchEvent(new Event('change', { bubbles: true }));
  } else if (element.isContentEditable) {
    // Simulate paste event
    element.focus();
    let pasteEvent = new ClipboardEvent('paste', {
      dataType: 'text/plain',
      data: text,
      bubbles: true,
    });
    // let typeEvent = new KeyboardEvent('keypress', { key: 'v', bubbles: true });

    element.dispatchEvent(pasteEvent);
    element.textContent = text;
  }
}
