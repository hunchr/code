"use strict";
const $ = e => document.querySelector(e),
      wait = async ms => await new Promise(res => setTimeout(res, ms)),
      body = document.body,
      template = $("main"),
      welcomePage = $("#welcome"),
      menu = $("menu"),
      tabs = $("#tabs");

let handle,
    idx = 0,
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
createTab = (id, file, parent) => {
    const fileIcon = document.createElement("div"),
          name = document.createElement("div"),
          moreIcon = document.createElement("div");

    tab = document.createElement("button");
    tab.classList.add(id, "tab");
    // tab.style.paddingLeft = padding + "rem";

    name.innerHTML = file.name;
    
    tab.appendChild(fileIcon);
    tab.appendChild(name);
    tab.appendChild(moreIcon);
    parent.appendChild(tab);
    // fs.push(entry);

    // Directory
    if (file?.kind === "directory") {
        // const dir = document.createElement("span");

        // fileIcon.dataset.d = entry.name;
        // tab.classList.add("dir", "collapsed");

        // parent.appendChild(dir);
        
        // getFiles(dir, entry.values(), padding + .375);
    }
    // File
    else {
        fileIcon.dataset.e = (file.name.match(/(?<=\.)[^. ]+$/) || [""])[0];
    }
},

// // Open file
// openFile = (id, fileName) => {
//     tab.classList.remove("active");
//     main.classList.remove("active");

//     main = $("main." + id),
//     tab = $("#tabs ." + id);

//     if (!id) {
//         id = "id-" + idx++;
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


// Open file
openFile = (index, fileName) => {
    tab.classList.remove("open");
    main.classList.remove("open");

    main = $("main." + index),
    tab = $("#tabs ." + index);

    if (!index) {
        return console.log("no index (todo: fix)");
        // id = "id-" + idx++;
    }

    // --- Main ---
    if (!main) {
        main = template.cloneNode(true);
        main.classList.add(index);
        body.appendChild(main);
        // TODO: textarea value

        console.log(fs[Number(index.substring(4))]);
    }

    // Focus textarea
    code = main.firstElementChild;
    code.focus();
    code.addEventListener("keyup", unsaved);

    // --- Tabs ---
    if (!tab) {
        createTab(index, { name: fileName || "Untitled"}, tabs);
    }

    tab.classList.add("open");
    main.classList.add("open");
},

// Get files and directories from file system // TODO: marge with createTab()
getFiles = async (parent, entries, padding) => {
    for await (const entry of entries) {
        const fileIcon = document.createElement("div"),
              name = document.createElement("div"),
              moreIcon = document.createElement("div");
                
        tab = document.createElement("button");
        tab.classList.add("idx-" + idx++, "tab");
        tab.style.paddingLeft = padding + "rem";

        name.innerHTML = entry.name;
        
        tab.appendChild(fileIcon);
        tab.appendChild(name);
        tab.appendChild(moreIcon);
        parent.appendChild(tab);
        fs.push(entry);

        // Directory
        if (entry.kind === "directory") {
            const dir = document.createElement("span");

            fileIcon.dataset.d = entry.name;
            tab.classList.add("dir", "collapsed");

            parent.appendChild(dir);
            
            getFiles(dir, entry.values(), padding + .375);
        }
        // File
        else {
            fileIcon.dataset.e = (entry.name.match(/(?<=\.)[^. ]+$/) || [""])[0];
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
    const btn = ev.target,
          tag = btn.tagName;

    // No file selected
    if (tag === "MENU") {
        return;
    }
    // Show more options
    else if (tag === "DIV") {
        return console.log("TODO: show more options");
    }
    // Open/Close directory
    else if (btn.classList.contains("dir")) {
        btn.classList.toggle("collapsed");
    }
    // Open file
    else {
        console.log("TODO: open file from menu", btn);
        openFile(btn.classList[0], btn.querySelector(":nth-child(2)").innerHTML);
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

    getFiles(menu, handle.values(), .1875);
    // fs = fs.sort((a, b) => a.kind.localeCompare(b.kind));    
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
