
/**
 * @type {import("./types.d.ts")}
 */

const debug = {
  /**@type {HTMLInputElement}*/
  b: document.getElementById("b_debug"),
  /**@type {HTMLTextAreaElement} */
  o: document.getElementById("o_debug"),
  /**@type {HTMLLabelElement}*/
  l: document.getElementById("l_debug"),
  shouldShow() {
    return debug.b.checked;
  },
  isShowing() {
    return debug.o.style.display !== "none";
  },
  show (show = true) {
    debug.l.style.display =
    debug.o.style.display = show ? "unset" : "none";
  },
  log (...data) {
    debug.o.value += data.join(" ") + "\n";
  }
};
debug.b.onchange = ()=>{
  debug.show( debug.shouldShow() );
}
debug.show( debug.shouldShow() );

const fills = document.getElementById("fills");

/**
 * @param {Fill} fill 
 * @returns {HTMLDivElement}
 */
function createFill(fill) {
  const result = document.createElement("div");
  result.className = "fill-item";
  result.id = "fill-" + fill.id;

  const origin = document.createElement("span");
  origin.textContent = fill.origin;
  result.appendChild(origin);

  const value = document.createElement("textarea");
  value.value = fill.data;
  result.appendChild(value);

  return result;
}

/**
 * @param {Fill[]} fills 
 */
function setFills (fills) {
  for (const fill of fills) {
    const f = createFill(fill);
    fills.appendChild(f);
  }
}

chrome.runtime.onMessage.addListener((msg, sender, respond)=>{
  if (msg.type === "ctx" && msg.fills) {
    setFills(msg.fills);
  }
});