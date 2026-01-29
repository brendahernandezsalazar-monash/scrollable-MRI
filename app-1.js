const img = document.getElementById("sliceImg");
const slider = document.getElementById("slider");
const sliceLabel = document.getElementById("sliceLabel");

const NUM_SLICES = 27;
const BASE = "assets/slices/";   // folder
const EXT = ".png";              // file type

slider.max = String(NUM_SLICES);

function srcFor(i) {
  return `${BASE}${i}${EXT}`;    // 1.png, 2.png, ..., 27.png
}

function preload(i) {
  if (i < 1 || i > NUM_SLICES) return;
  const im = new Image();
  im.src = srcFor(i);
}

function setSlice(i) {
  img.src = srcFor(i);
  sliceLabel.textContent = `${i} / ${NUM_SLICES}`;

  // smoother scrolling
  preload(i + 1);
  preload(i - 1);
}

// Slider
slider.addEventListener("input", () => setSlice(Number(slider.value)));

// Mouse wheel scroll (over the image)
img.addEventListener("wheel", (e) => {
  e.preventDefault();
  const delta = Math.sign(e.deltaY);
  let v = Number(slider.value) + delta;
  v = Math.max(1, Math.min(NUM_SLICES, v));
  slider.value = String(v);
  setSlice(v);
}, { passive: false });

// Keyboard scroll
window.addEventListener("keydown", (e) => {
  if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
  let v = Number(slider.value) + (e.key === "ArrowRight" ? 1 : -1);
  v = Math.max(1, Math.min(NUM_SLICES, v));
  slider.value = String(v);
  setSlice(v);
});

setSlice(1);
