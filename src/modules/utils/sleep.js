//function to sleep randomly between a, b seconds
export default function sleep(a = 1, b = 2) {
  return new Promise((resolve) => {
    setTimeout(resolve, (a + Math.random() * (b - a)) * 1000);
  });
}
