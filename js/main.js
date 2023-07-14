const body = document.querySelector("body");
const campoDarkMode = document.querySelector("[data-dark-mode]");
const iconeLua = document.querySelector("[data-icone-lua]");
const inputDoFiltro = document.querySelector("[data-campo-filtro-input]");
const listaDeRegioes = document.querySelector("[data-lista-regioes]");
const regioes = document.querySelectorAll("[data-regiao]");

function darkMode() {

    if (iconeLua.name === "moon-outline") {
        iconeLua.name = "moon"
    } else {
        iconeLua.name = "moon-outline"
    };

    body.classList.toggle("dark");
}

campoDarkMode.addEventListener("click", () => {
    darkMode();
});

inputDoFiltro.addEventListener("focus", () => {
    listaDeRegioes.style.display = "block";
    setTimeout(function() {
        listaDeRegioes.style.transform = "translate(0px)"
    },0)
    
});

inputDoFiltro.addEventListener("blur", () => {
    listaDeRegioes.style.display = "none";
    setTimeout(function() {
        listaDeRegioes.style.transform = "translate(0px, -5px)"
    },0)
});

regioes.forEach((regiao) => regiao.addEventListener("mousedown", () => {
    inputDoFiltro.value = regiao.innerHTML
}))