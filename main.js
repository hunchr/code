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
    code,
    fs = [];

// Mark file as unsaved
const unsaved = () => {
    tab.classList.add("unsaved");
    code.removeEventListener("keyup", unsaved);
},

// Create tab // TODO
// createTab = (id, fileName, parent, isDir) => {
//     const file = { name: fileName },
//           icon = document.createElement("span"),
//           name = document.createElement("div");
        
//     tab = document.createElement("button");
//     tab.classList.add(id);

//     icon.classList = isDir ? "directory" : (file.name.match(/(?=.)[a-z]\w*$/i) || [""])[0];
//     name.innerHTML = file.name;
    
//     tab.appendChild(icon);
//     tab.appendChild(name);
//     parent.appendChild(tab);
// },

// // Open file
// openFile = (id, fileName) => {
//     tab.classList.remove("active");
//     main.classList.remove("active");

//     main = $("main." + id),
//     tab = $("#tabs ." + id);

//     if (!id) {
//         id = "id-" + idIndex++;
//     }

//     // --- Main ---
//     if (!main) {
//         main = template.cloneNode(true);
//         main.classList.add(id);
//         body.appendChild(main);
//         // TODO: textarea value
//     }

//     // Focus textarea
//     code = main.firstElementChild;
//     code.focus();
//     code.addEventListener("keyup", unsaved);

//     // --- Tabs ---
//     if (!tab) {
//         createTab(id, fileName || "Untitled", tabs);
//     }

//     tab.classList.add("active");
//     main.classList.add("active");
// },

// Get files from file system
getFiles = async (parent, entries) => {
    for await (const entry of entries) {
        parent.push(entry);

        if (entry.kind === "directory") {
            entry.children = [];
            getFiles(entry.children, entry.values());
        }
    }
},

// Show files/directories in menu
displayFiles = (parent, entries) => {
    for (const entry of entries) {
        const icon = document.createElement("span"),
              name = document.createElement("div");
                
        tab = document.createElement("button");
        // tab.classList.add("id-" + idIndex++);

        name.innerHTML = entry.name;
        
        tab.appendChild(icon);
        tab.appendChild(name);
        
        if (entry.kind === "directory") {
            const dir = document.createElement("div");

            dir.classList = "directory";
            tab.classList.add("dir", "collapsed");
            icon.dataset.d = entry.name;

            dir.appendChild(tab);
            parent.appendChild(dir);

            displayFiles(tab, entry.children);
        }
        else {
            icon.dataset.e = (entry.name.match(/(?<=\.)[^. ]+$/) || [""])[0];
            parent.appendChild(tab);
        }
    }
};

// // Open/Close tabs
// tabs.addEventListener("click", ev => {
//     const target = ev.target;

//     // Open file
//     if (target.tagName === "BUTTON") {
//         openFile(target.classList[0]);
//     }
//     // Close file
//     else {
//         const sibling = tab.nextElementSibling || tab.previousElementSibling;

//         tab.remove();
//         main.classList.remove("active");

//         if (sibling) {
//             openFile(sibling.classList[0]);
//         }
//         else {
//             tab = main = welcomePage;
//             welcomePage.classList.add("active");
//         }
//     }
// });

// Open file from menu
menu.addEventListener("click", ev => {
    const target = ev.target,
          tag = target.tagName,
          child = target.firstChild;

    if (tag === "MENU") return;

    // Show more options
    if (tag === "DIV") {
        console.log("TODO: show more options");
    }
    // Open/Close directory
    else if (target.classList.contains("dir")) {
        target.classList.toggle("collapsed");
        // [child, target.parentNode].forEach(e => e.classList.toggle("open"));
    }
    // Open file
    else {
        console.log("TODO: open file from menu");
        // openFile(target.classList[0], target.lastChild.innerHTML);
    }
});

// ----- Keyboard shortcuts -----
// Open file
// $("#testfile").addEventListener("click", async () => {
//     [handle] = await window.showOpenFilePicker({id: "file"});

//     const file = await handle.getFile(),
//           data = await file.text();

//     openFile(null, file.name);
//     code.value = data;
// });

// Open directory
$("#testdir").addEventListener("click", async () => {
    handle = await window.showDirectoryPicker({id: "dir"});

    getFiles(fs, handle.values()).then(() => {
        fs = fs.sort((a, b) => a.kind.localeCompare(b.kind));
        displayFiles(menu, fs);
    });
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
