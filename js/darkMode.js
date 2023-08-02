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

function loadTheme() {
    const darkModeTheme = localStorage.getItem("dark")

    if (darkModeTheme) {
        darkMode();
    }
}

loadTheme();

campoDarkMode.addEventListener("click", () => {
    darkMode();

    localStorage.removeItem("dark")

    if (html.classList.contains("dark")) {
        localStorage.setItem("dark", 1);
    }
});
