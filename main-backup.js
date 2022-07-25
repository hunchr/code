"use strict";
let ln = 1;
const $ = e => document.querySelector(e),
      lines = $("main > div"),
      code = $("code"),
      ta = $("textarea"),

// Keyboard shortcuts [alt+key]
shortcut = key => {
    console.log(`[alt+${key}]`);
};

// Key listener
ta.addEventListener("keydown", ev => {
    const key = ev.key;

    // // Keyboard shortcuts [alt]
    // if (ev.altKey) {
    //     ev.preventDefault();
    //     return key === "Alt" ? null : shortcut(key);
    // }

    // // Newline [enter]
    // if (key === "Enter") {
    //     const line = document.createElement("div");
    //     line.innerHTML = ++ln;
    //     return lines.appendChild(line);
    // }

    // // Delete [Backspace]
    // if (key === "Backspace") {
    //     if (ta.value[ta.selectionStart - 1] === "\n") {
    //         lines.lastChild.remove();
    //         return --ln;
    //     }
    // }

    // // Delete [Delete]
    // if (key === "Delete") {
    //     if (ta.value[ta.selectionStart] === "\n") {
    //         lines.lastChild.remove();
    //         return --ln;
    //     }
    // }
});
