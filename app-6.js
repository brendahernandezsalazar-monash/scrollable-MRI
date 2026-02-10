const img = document.getElementById("sliceImg");
const slider = document.getElementById("slider");
const sliceLabel = document.getElementById("sliceLabel");
const panel = document.getElementById("vSliderWrap");

const NUM_SLICES = 17;
const BASE = "assets/slices6/"; // folder
// filenames: 1.png, 2.png, ... 17.png

slider.min = "1";
slider.max = String(NUM_SLICES);

function srcFor(i){
  return `${BASE}${i}.png`;
}

function setSlice(i){
  img.src = srcFor(i);
  sliceLabel.textContent = `${i} / ${NUM_SLICES}`;
}

/**
 * Make the overlay panel match the rendered image height,
 * and make the slider length match the panel height.
 */
function layoutOverlay(){
  const h = img.clientHeight;
  if (!h) return;

  // panel height = image height - small padding
  const panelH = Math.max(220, h - 24);
  panel.style.height = `${panelH}px`;

  // slider usable length inside panel (minus labels area)
  const sliderLen = Math.max(160, Math.min(480, panelH - 90));
  slider.style.width = `${sliderLen}px`;
}

// When image loads (every slice), re-layout
img.addEventListener("load", layoutOverlay);

// On resize, re-layout
window.addEventListener("resize", layoutOverlay);

// Slider
slider.addEventListener("input", () => setSlice(Number(slider.value)));

// Optional: mouse wheel scroll
img.addEventListener("wheel", (e) => {
  e.preventDefault();
  const delta = Math.sign(e.deltaY);
  let v = Number(slider.value) + delta;
  v = Math.max(1, Math.min(NUM_SLICES, v));
  slider.value = String(v);
  setSlice(v);
}, { passive: false });

// Init
setSlice(1);
