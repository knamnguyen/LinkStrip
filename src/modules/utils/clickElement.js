// Function to dispatch a click event to an element
export default function clickElement(element) {
  if (element) {
    // Create a new click event
    var clickEvent = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: false,
    });
    // Dispatch the event on the target element
    
    element.dispatchEvent(clickEvent);
  }
}
