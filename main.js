"use strict";
let handle,
    openFile = document.body,
    openedFilesCount = 0,
    code;

const $ = e => document.querySelector(e),
      body = openFile,
      template = $("main"),
      openedFiles = $("#of");

// Open file
$("#testfile").addEventListener("click", async () => {
    [handle] = await window.showOpenFilePicker({id: "file"});

    const file = await handle.getFile(),
          data = await file.text(),
          main = template.cloneNode(true),
          tab = document.createElement("button"),
          icon = document.createElement("span"),
          name = document.createElement("div");

    openFile.classList.remove("active");
    openFile = tab;

    [main, tab].forEach(e => e.classList.add("id-" + openedFilesCount, "active"));
    openedFilesCount++;
    code = main.querySelector("textarea");
    icon.classList = (file.name.match(/(?=.)[a-z]\w*$/i) || [""])[0];
    name.innerHTML = file.name;

    tab.appendChild(icon);
    tab.appendChild(name);
    openedFiles.appendChild(tab);

    code.value = data;
    body.appendChild(main);
});

// Open directory
$("#testdir").addEventListener("click", async () => {
    handle = await window.showDirectoryPicker({id: "dir"});

    for await (const entry of handle.values()) {
        console.log(entry);
        // console.log(entry.kind, entry.name);

        // File
        if (entry.kind === "file") {

            

        }
        // Directory
        else {

        }
    }
});

// Close opened files // TODO
openedFiles.addEventListener("click", ev => {
    const target = ev.target;

    // Open file
    if (target.tagName === "BUTTON") {
        // TODO
    }
    // Close file
    else {
        const parent = target.parentNode,
              next = parent.nextElementSibling; // TODO: no next sibling? => prev; no prev? => ?
              main = $("main." + parent.classList[0]);

        openFile = next;
        next.classList.add("active");
        // TODO show <main>

        // // main.classList.remove("active");
        main.remove(); // TODO: find better solution (improve efficiency)
        parent.remove();
    }
});









// ----------------------------------------------
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
