"use strict";
const $ = e => document.querySelector(e),
      body = document.body,
      template = $("main"),
      welcomePage = $("#welcome"),
      menu = $("menu"),
      tabs = $("#tabs");

let handle,
    idIndex = 0,
    main = welcomePage,
    tab = main,
    code;

// Mark file as unsaved
const unsaved = () => {
    tab.classList.add("unsaved");
    code.removeEventListener("keyup", unsaved);
},

// Create tab
createTab = (id, fileName, parent, isDir) => {
    const file = { name: fileName },
          icon = document.createElement("span"),
          name = document.createElement("div");
        
    tab = document.createElement("button");
    tab.classList.add(id);

    icon.classList = isDir ? "directory" : (file.name.match(/(?=.)[a-z]\w*$/i) || [""])[0];
    name.innerHTML = file.name;
    
    tab.appendChild(icon);
    tab.appendChild(name);
    parent.appendChild(tab);
},

// Open file
fsOpen = (id, fileName) => {
    tab.classList.remove("active");
    main.classList.remove("active");

    main = $("main." + id),
    tab = $("#tabs ." + id);

    if (!id) {
        id = "id-" + idIndex++;
    }

    // --- Main ---
    if (!main) {
        main = template.cloneNode(true);
        main.classList.add(id);
        body.appendChild(main);
        // TODO: textarea value
    }

    // Focus textarea
    code = main.firstElementChild;
    code.focus();
    code.addEventListener("keyup", unsaved);

    // --- Tabs ---
    if (!tab) {
        createTab(id, fileName || "Untitled", tabs);
    }

    tab.classList.add("active");
    main.classList.add("active");
};

// Open/Close tabs
tabs.addEventListener("click", ev => {
    const target = ev.target;

    // Open file
    if (target.tagName === "BUTTON") {
        fsOpen(target.classList[0]);
    }
    // Close file
    else {
        const sibling = tab.nextElementSibling || tab.previousElementSibling;

        tab.remove();
        main.classList.remove("active");

        if (sibling) {
            fsOpen(sibling.classList[0]);
        }
        else {
            tab = main = welcomePage;
            welcomePage.classList.add("active");
        }
    }
});

// Open file from menu
menu.addEventListener("click", ev => {
    const target = ev.target,
          child = target.firstChild;

    if (target.tagName === "MENU") return;

    // Open/Close directory
    if (child.classList.contains("directory")) {
        [child, target.parentNode].forEach(e => e.classList.toggle("open"));
    }
    // Open file
    else {
        fsOpen(target.classList[0], target.lastChild.innerHTML);
    }
});

// ----- Keyboard shortcuts -----
// Open file
$("#testfile").addEventListener("click", async () => {
    [handle] = await window.showOpenFilePicker({id: "file"});

    const file = await handle.getFile(),
          data = await file.text();

    fsOpen(null, file.name);
    code.value = data;
});

// Open directory
$("#testdir").addEventListener("click", async () => {
    console.log("Open directory");
    handle = await window.showDirectoryPicker({id: "dir"});
    // const values = await handle.values();

    // console.log("values:", values);

    for await (const entry of handle.values()) {
        // File
        if (entry.kind === "file") {
            createTab("id-" + idIndex++, entry.name, menu);
        }
        // Directory
        else {
            createTab("id-" + idIndex++, entry.name, menu, true);
            // TODO: files in dir + sort a-z
        }
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
