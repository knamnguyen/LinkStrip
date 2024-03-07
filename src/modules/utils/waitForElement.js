export default function waitForElement(selector, callback, timeout = 10000, interval = 100) {
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
