import iconTheme from "./settings/icon-theme.json" assert { type: "json" };

const style = document.querySelector("style"),
      fileExtensions = iconTheme.fileExtensions;

// Icon theme
for (const extension in fileExtensions) {
    style.innerHTML += `.${extension}{background-image:url(e/${extension}.svg)}`
}
