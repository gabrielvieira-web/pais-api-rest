const html = document.querySelector("html");
const campoDarkMode = document.querySelector("[data-dark-mode]");
const iconeLua = document.querySelector("[data-icone-lua]");

function darkMode() {

    if (iconeLua.name === "moon-outline") {
        iconeLua.name = "moon"
    } else {
        iconeLua.name = "moon-outline"
    };

    html.classList.toggle("dark");
}

campoDarkMode.addEventListener("click", () => {
    darkMode();
});
