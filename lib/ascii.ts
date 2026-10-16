/** Image sampling is independent of drawing and animation. */
export const DENSITY_RAMP = " .,:;i1tfLCG08@";
export type BrightnessMap = { values: Float32Array; cols: number; rows: number };

export function sampleImage(image: HTMLImageElement, cols: number, rows: number): BrightnessMap | null {
  if (!Number.isInteger(cols) || !Number.isInteger(rows) || cols < 1 || rows < 1) return null;
  const offscreen = document.createElement("canvas");
  offscreen.width = cols;
  offscreen.height = rows;
  const context = offscreen.getContext("2d", { willReadFrequently: true });
  if (!context) return null;
  // The source has open space above the hair. Crop only that margin.
  const sourceY = image.naturalHeight * 0.13;
  context.drawImage(image, 0, sourceY, image.naturalWidth, image.naturalHeight - sourceY, 0, 0, cols, rows);
  const pixels = context.getImageData(0, 0, cols, rows).data;
  const values = new Float32Array(cols * rows);
  for (let i = 0; i < values.length; i++) {
    const luminance = (pixels[i * 4] * 0.2126 + pixels[i * 4 + 1] * 0.7152 + pixels[i * 4 + 2] * 0.0722) / 255;
    // Invert the white background; retain tonal separation in skin and glasses.
    const ink = luminance > 0.945 ? 0 : Math.pow(Math.max(0, 1 - luminance), 0.72);
    const y = Math.floor(i / cols) / rows;
    values[i] = Math.min(1, ink * (y > 0.72 ? 1 - (y - 0.72) * 2.7 : 1));
  }
  return { values, cols, rows };
}

type Frame = (time: number) => void;
const subscribers = new Set<Frame>();
let animationId = 0;
let lastTime = 0;
function tick(time: number) {
  if (time - lastTime >= 1000 / 30) {
    lastTime = time;
    if (!document.hidden) subscribers.forEach((draw) => draw(time));
  }
  animationId = subscribers.size ? requestAnimationFrame(tick) : 0;
}

/** All visible ASCII canvases share one capped RAF scheduler. */
export function subscribeFrame(callback: Frame) {
  subscribers.add(callback);
  if (!animationId) animationId = requestAnimationFrame(tick);
  return () => {
    subscribers.delete(callback);
    if (!subscribers.size && animationId) {
      cancelAnimationFrame(animationId);
      animationId = 0;
    }
  };
}

export function ecgValue(x: number) {
  const gaussian = (center: number, width: number, height: number) => height * Math.exp(-Math.pow((x - center) / width, 2));
  return gaussian(0.17, 0.045, 0.13) - gaussian(0.37, 0.018, 0.2) + gaussian(0.4, 0.014, 1) - gaussian(0.44, 0.023, 0.35) + gaussian(0.65, 0.07, 0.23);
}
