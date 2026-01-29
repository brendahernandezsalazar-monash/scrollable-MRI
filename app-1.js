const img = document.getElementById("sliceImg");
const slider = document.getElementById("slider");
const sliceLabel = document.getElementById("sliceLabel");

const NUM_SLICES = 27;
const EXT = ".png";

// Bulletproof base URL for GitHub Pages project sites
const BASE_URL = new URL("./assets/slices/", document.baseURI).toString();

slider.max = String(NUM_SLICES);

function srcFor(i) {
  return `${BASE_URL}${i}${EXT}`;
}

function setSlice(i) {
  const url = srcFor(i);
  console.log("Loading:", url);     // <-- open DevTools Console to see this
  img.onerror = () => console.error("FAILED:", url);

  img.src = url;
  if (sliceLabel) sliceLabel.textContent = `${i} / ${NUM_SLICES}`;
}

slider.addEventListener("input", () => setSlice(Number(slider.value)));
setSlice(1);
