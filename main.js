"use strict";
const $ = e => document.querySelector(e),
      wait = async ms => await new Promise(res => setTimeout(res, ms)),
      body = document.body,
      template = $("main"),
      startPage = $("#welcome"),
      menu = $("menu"),
      tabs = $("#tabs");

let handle,
    idx = 0,
    main = startPage,
    tab = main,
    code,
    fs = [];

// Mark file as unsaved
const unsaved = () => {
    tab.classList.add("unsaved");
    code.removeEventListener("keyup", unsaved);
},

// Create tab
createTab = (parent, id, file, padding) => {
    const fileIcon = document.createElement("div"),
          name = document.createElement("div"),
          moreIcon = document.createElement("div");

    tab = document.createElement("button");
    tab.classList.add(id, "tab");

    name.innerHTML = file.name;
    
    tab.appendChild(fileIcon);
    tab.appendChild(name);
    tab.appendChild(moreIcon);
    parent.appendChild(tab);

    // Directory
    if (padding) {
        const dir = document.createElement("span");

        fileIcon.dataset.d = file.name;
        tab.classList.add("dir", "collapsed");

        parent.appendChild(dir);
        
        getFiles(dir, file.values(), padding + .375);
    }
    // File
    else {
        fileIcon.dataset.e = (file.name.match(/(?<=\.)[^. ]+$/) || [""])[0];
    }
},

// Get files and directories from file system
getFiles = async (parent, entries, padding) => {
    for await (const entry of entries) {
        fs.push(entry);
        createTab(parent, "idx-" + idx++, entry, entry.kind === "directory" ? padding : false);
        tab.style.paddingLeft = padding + "rem";
    }
},

// Open file
openFile = (index, fileName) => {
    tab.classList.remove("open");
    main.classList.remove("open");

    tab = $("#tabs ." + index);
    main = $("main." + index);
    code = main?.firstElementChild;

    // Set index
    if (!index) {
        index = "idx-" + idx++;
    }

    // Create tab if needed
    if (!tab) {
        createTab(tabs, index, { name: fileName || "Untitled"});
    }

    // Create main if needed
    if (!main) {
        main = template.cloneNode(true);
        main.classList.add(index);
        body.appendChild(main);
        
        code = main.firstElementChild;
        code.addEventListener("keydown", keyboardShortcuts);

        // TODO: textarea value
        // console.log(fs[Number(index.substring(4))]);
    }

    // Focus textarea
    code.focus();
    code.addEventListener("keyup", unsaved);

    tab.classList.add("open");
    main.classList.add("open");
};

// Open file from menu
menu.addEventListener("click", ev => {
    const btn = ev.target,
          tag = btn.tagName;

    // No file selected
    if (tag === "MENU") {
        return;
    }
    // Show more options
    if (tag === "DIV") {
        return console.log("TODO: show more options");
    }
    // Open/Close directory
    if (btn.classList.contains("dir")) {
        return btn.classList.toggle("collapsed");
    }

    // Open file
    openFile(btn.classList[0], btn.querySelector(":nth-child(2)").innerHTML);
});

// Open/Close tab
tabs.addEventListener("click", ev => {
    const target = ev.target;

    // No tab selected
    if (target.id === "tabs") {
        return;
    }
    // Open file
    if (target.tagName === "BUTTON") {
        return openFile(target.classList[0]);
    }

    // --- Close file --- // TODO: alert: save changes?
    const sibling = tab.nextElementSibling || tab.previousElementSibling;

    tab.remove();
    main.classList.remove("open");

    if (sibling) {
        return openFile(sibling.classList[0]);
    }
    
    // Show start page if no tabs are open
    tab = main = startPage;
    startPage.classList.add("open");
});

// ----- Functions -----
// Open file
$("#testfile").addEventListener("click", async () => {
    // Get file
    try {
        [handle] = await window.showOpenFilePicker({id: "file"});
    }
    catch {
        return;
    }

    const file = await handle.getFile();

    fs.push(file);
    openFile(null, file.name);
});

// Open directory
$("#testdir").addEventListener("click", async () => {
    // Get directory
    try {
        handle = await window.showDirectoryPicker({id: "dir"});
    }
    catch {
        return;
    }

    // Reset everything
    fs = [];
    idx = 0;
    tabs.innerHTML = "";
    menu.innerHTML = "";

    // Remove all textareas
    document.querySelectorAll("main:not(#welcome, :first-of-type)").forEach(e => {
        e.remove();
    });

    // Show start page
    tab = main = startPage;
    startPage.classList.add("open");

    // Open directory
    getFiles(menu, handle.values(), .1875);
    // TODO: sort: fs = fs.sort((a, b) => a.kind.localeCompare(b.kind))
});
