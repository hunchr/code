"use strict";
const keyboardShortcuts = ev => {
    console.log(`[${ev.key}]`);
};







// ---------- OLD STUFF ----------
// let keyChr = "";
    //   nav = $("nav");
    //   code = $("code"),
    //   ta = $("textarea"),

// Keyboard shortcuts [alt+key]
// shortcut = key => {
//     console.log(`[alt+${key}]`); // TODO
// };

// Detect keyboard shortcuts
// ta.addEventListener("keydown", ev => {
//     if (ev.altKey) {
//         const key = ev.key;
//         ev.preventDefault();
//         if (key.length === 1) shortcut(key);
//     }
// });

// Key listener
// ta.addEventListener("keypress", ev => {
//     const key = ev.key,
//           idx = ta.selectionStart,
//           div = document.createElement("div");

//     div.innerHTML = key;
//     div.dataset.i = idx;

//     // Newline
//     if (key === "Enter") {
//         div.classList = "ln";
//     }

//     console.log(
//         idx,
//         // $(`code [data-i="${idx}"]`)
//     );

//     // console.log(ta.selectionStart);
    
//     return code.appendChild(div);

//     // if (ev.altKey) return shortcut(key);

//     // keyCount += 1;

//     // console.log(ev, key);

    
//     // if (key === "Alt") {
//     //     ev.preventDefault();
//     //     // isAlt = true;
//     // }

//     // keyCount += 1;
//     // keyChr += key;

//     // console.log(keyCount);



//     // // Newline [enter]
//     // if (key === "Enter") {
//     //     const line = document.createElement("div");
//     //     line.innerHTML = ++ln;
//     //     return lines.appendChild(line);
//     // }

//     // // Delete [Backspace]
//     // if (key === "Backspace") {
//     //     if (ta.value[ta.selectionStart - 1] === "\n") {
//     //         lines.lastChild.remove();
//     //         return --ln;
//     //     }
//     // }

//     // // Delete [Delete]
//     // if (key === "Delete") {
//     //     if (ta.value[ta.selectionStart] === "\n") {
//     //         lines.lastChild.remove();
//     //         return --ln;
//     //     }
//     // }
// });

// ta.addEventListener("keydown", ev => {
//     const key = ev.key;

//     if (ev.altKey) {
//         ev.preventDefault();
//         if (key === "Alt") return;
//         keyChr += "+" + key;
//         // console.log(`[alt+${key}]`);
//     }

//     // // keyCount -= 1;
//     // console.log(key, keyCount);
// });

// ta.addEventListener("keyup", ev => {
//     if (ev.key === "Alt") {
//         console.log(`[${keyChr.substring(1)}]`);
//         keyChr = "";
//     }
//     // const key = ev.key;
//     // keyCount -= 1;
// });
