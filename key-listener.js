"use strict";
// Pairs for auto closing
const autoClosePairs = {
    "(": ")",
    "{": "}",
    "[": "]",
    "<": ">",
    "\"": "\"",
    "'": "'",
    "`": "`"
},

// Keyboard shortcuts [alt+key]
shortcuts = key => {
    console.log(`[alt+${key}]`); // TODO
},

// Key listener [key]
keyListener = ev => {
    const key = ev.key;
    // console.log(`[${key}]`);

    // Shortcuts
    if (ev.altKey) {
        ev.preventDefault();
        return shortcuts(key);
        // return key.length === 1 ? shortcuts(key) : null;
    }

    // Indentation
    if (key === "Tab") {
        ev.preventDefault();

        const v = code.value,
              start = code.selectionStart,
              end = code.selectionEnd;

        // Replace tab with 4 whitespace characters
        if (start === end) {
            code.value = v.substring(0, start) + "    " + v.substring(end);
            return code.selectionStart = code.selectionEnd = start + 4;
        }
        // Unindent selection // TODO
        if (ev.shiftKey) {
            console.log("TODO: Unindent selection");
        }
        // Indent selection
        else {
            const indStart = v.lastIndexOf("\n", start),
                  first = v.substring(0, indStart),
                  selection = v.substring(indStart, end);

            code.value = first + selection.replace(/^/gm, "    ") + v.substring(end);
            code.selectionStart = start + (first ? 8 : 4);
            return code.selectionEnd = end + 4 * selection.match(/^/gm).length;
        }
    }

    // Auto close brackets etc.
    if (/[({[<"'`]/.test(key)) {
        ev.preventDefault();

        const start = code.selectionStart;
        code.value = code.value.substring(0, start) + key + autoClosePairs[key] + code.value.substring(code.selectionEnd);
        return code.selectionStart = code.selectionEnd = start + 1;
    }
};


/* ---------- UNUSED CODE ----------
let keyChr = "";
code.addEventListener("keypress", ev => {
    const key = ev.key,
          idx = code.selectionStart,
          div = document.createElement("div");

    div.innerHTML = key;
    div.dataset.i = idx;

    Newline
    if (key === "Enter") {
        div.classList = "ln";
    }

    console.log(
        idx,
        $(`code [data-i="${idx}"]`)
    );

    console.log(code.selectionStart);
    
    // return code.appendChild(div);

    if (ev.altKey) return shortcut(key);

    keyCount += 1;

    console.log(ev, key);

    
    if (key === "Alt") {
        ev.preventDefault();
        // isAlt = true;
    }

    keyCount += 1;
    keyChr += key;

    console.log(keyCount);

    // Newline [enter]
    if (key === "Enter") {
        const line = document.createElement("div");
        line.innerHTML = ++ln;
        return lines.appendChild(line);
    }

    // Delete [Backspace]
    if (key === "Backspace") {
        if (code.value[code.selectionStart - 1] === "\n") {
            lines.lastChild.remove();
            return --ln;
        }
    }

    // Delete [Delete]
    if (key === "Delete") {
        if (code.value[code.selectionStart] === "\n") {
            lines.lastChild.remove();
            return --ln;
        }
    }
});
*/
