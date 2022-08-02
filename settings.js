import iconTheme from "./settings/icon-theme.json" assert { type: "json" };

const style = document.querySelector("style"),
      fileExtensions = iconTheme.fileExtensions,
      directoryNames = iconTheme.directoryNames;

for (const extension in fileExtensions) {
    style.innerHTML += `[data-e="${extension}"]{background-image:url(e/${extension}.svg)}`
}

for (const name in directoryNames) {
    style.innerHTML += `[data-d="${name}"]{background-image:url(d/${name}.svg)}`
}
