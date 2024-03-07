export default function generatePastelColor() {
  // Generate random HSL values with emphasis on light, pastel tones
  const hue = Math.floor(Math.random() * 360); // Full color spectrum
  const saturation = Math.floor(Math.random() * 50) + 50; // Between 50-100% for softer colors
  const lightness = Math.floor(Math.random() * 25) + 75; // Between 75-100% for light shades

  // Convert HSL to RGB for use
  let chroma = ((1 - Math.abs((2 * lightness) / 100 - 1)) * saturation) / 100;
  let hueSegment = hue / 60;
  let x = chroma * (1 - Math.abs((hueSegment % 2) - 1));
  let rgbTemp = [0, 0, 0];

  if (0 <= hueSegment && hueSegment < 1) {
    rgbTemp = [chroma, x, 0];
  } else if (1 <= hueSegment && hueSegment < 2) {
    rgbTemp = [x, chroma, 0];
  } else if (2 <= hueSegment && hueSegment < 3) {
    rgbTemp = [0, chroma, x];
  } else if (3 <= hueSegment && hueSegment < 4) {
    rgbTemp = [0, x, chroma];
  } else if (4 <= hueSegment && hueSegment < 5) {
    rgbTemp = [x, 0, chroma];
  } else if (5 <= hueSegment && hueSegment < 6) {
    rgbTemp = [chroma, 0, x];
  }

  let m = lightness / 100 - 0.5 * chroma;
  let [r, g, b] = rgbTemp.map((n) => Math.round((n + m) * 255));

  return `rgb(${r}, ${g}, ${b})`;
}