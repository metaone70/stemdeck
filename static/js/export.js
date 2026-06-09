// export.js — transpose slider state for mixdown export

const _PITCHES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

let _originalKey = null; // e.g. "F# min"

const transposeSlider = document.getElementById("transposeSlider");
const transposeLabel = document.getElementById("transposeLabel");
const transposeRow = document.getElementById("transposeRow");
const transposeTargetKey = document.getElementById("transposeTargetKey");

function _parseKey(key) {
  const m = String(key || "").match(/^([A-G]#?)\s+(maj|min)$/);
  if (!m) return null;
  return { root: m[1], type: m[2] };
}

function _transposeKey(key, semitones) {
  const parsed = _parseKey(key);
  if (!parsed) return null;
  const idx = _PITCHES.indexOf(parsed.root);
  if (idx === -1) return null;
  const target = (idx + semitones + 1200) % 12;
  return `${_PITCHES[target]} ${parsed.type}`;
}

function _updateTargetKeyDisplay() {
  const v = parseInt(transposeSlider?.value || "0", 10);
  if (transposeLabel) {
    transposeLabel.textContent = v > 0 ? `+${v}` : String(v);
  }
  if (transposeTargetKey && _originalKey) {
    const target = _transposeKey(_originalKey, v);
    transposeTargetKey.textContent = target ? `→ ${target}` : "—";
  }
}

/** Call when a track loads to set the original detected key. */
export function setOriginalKey(key) {
  _originalKey = key;
  _updateTargetKeyDisplay();
}

/** Show the transpose row. Called when wireUpAudio finishes. */
export function showTransposeRow() {
  if (transposeRow) transposeRow.classList.remove("hidden");
}

/** Hide the transpose row. Called on destroyPlayer / renderEmptyShell. */
export function hideTransposeRow() {
  if (transposeRow) transposeRow.classList.add("hidden");
}

/** Return the current transpose semitone value. Called by player.js mixdown URL builder. */
export function getTransposeSemitones() {
  return parseInt(transposeSlider?.value || "0", 10);
}

export function wireTranspose() {
  transposeSlider?.addEventListener("input", _updateTargetKeyDisplay);
  _updateTargetKeyDisplay();
}
