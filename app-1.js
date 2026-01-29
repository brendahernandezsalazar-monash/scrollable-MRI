const img = document.getElementById("sliceImg");
const slider = document.getElementById("slider");
const sliceLabel = document.getElementById("sliceLabel");

const NUM_SLICES = 27;
const EXT = ".png";

// ✅ This makes the path work whether you're on / or /repo-name/
const BASE_URL = new URL("assets/slices/", document.baseURI).toString();

slider.max = String(NUM_SLICES);

function srcFor(i) {
  return `${BASE_URL}${i}${EXT}`;   // .../assets/slices/1.png
}

function preload(i) {
  if (i < 1 || i > NUM_SLICES) return;
  const im = new Image();
  im.src = srcFor(i);
}

function setSlice(i) {
  const url = srcFor(i);
  img.src = url;
  if (sliceLabel) sliceLabel.textContent = `${i} / ${NUM_SLICES}`;

  preload(i + 1);
  preload(i - 1);
}

// Slider
slider.addEventListener("input", () => setSlice(Number(slider.value)));

// Mouse wheel
img.addEventListener("wheel", (e) => {
  e.preventDefault();
  const delta = Math.sign(e.deltaY);
  let v = Number(slider.value) + delta;
  v = Math.max(1, Math.min(NUM_SLICES, v));
  slider.value = String(v);
  setSlice(v);
}, { passive: false });

// Keyboard
window.addEventListener("keydown", (e) => {
  if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
  let v = Number(slider.value) + (e.key === "ArrowRight" ? 1 : -1);
  v = Math.max(1, Math.min(NUM_SLICES, v));
  slider.value = String(v);
  setSlice(v);
});

setSlice(1);
