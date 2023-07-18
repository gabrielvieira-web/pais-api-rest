import { conectaApi } from "./conectaApi.js";

const secaoPaises = document.querySelector("[data-paises]");
const barraDePesquisa = document.querySelector("[data-input-search]");
const inputDoFiltro = document.querySelector("[data-campo-filtro-input]");
const listaDeRegioes = document.querySelector("[data-lista-regioes]");
const regioes = document.querySelectorAll("[data-regiao]");

// BARRA DE PESQUISA 

barraDePesquisa.addEventListener("keyup", e => {
    verificaBusca(e);
})

async function verificaBusca(e) {
    if (e.key === "Enter") {
        const termoDeBusca = barraDePesquisa.value;
        const resultadoDaBusca = await conectaApi.buscaPais(termoDeBusca);

        secaoPaises.innerHTML = "";

        resultadoDaBusca.forEach(elemento => secaoPaises.appendChild(constroiCardPais(
            elemento.flags.png, elemento.name.common, elemento.population, elemento.region, elemento.capital
        )));
    }
}

// CAMPO DE FILTRO

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

regioes.forEach((regiao) => regiao.addEventListener("mousedown", (e) => {
    const regiao = inputDoFiltro.value = e.target.innerText
    filtraPaises(regiao);
}));

// EXIBE OS PAISES

function constroiCardPais(image, name, population, region, capital) {
    const cardPais = document.createElement("div") 
    cardPais.className = "paises__container-pais"
    cardPais.innerHTML = `
        <img src="${image}" alt="image pais" class="paises__container-pais__imagem">
        <div class="paises__container-pais__dados-pais">
            <h2 class="paises__container-pais__dados-pais__nome-pais">${name}</h2>
            <h3 class="paises__container-pais__dados-pais__populacao"><span>Population:</span>${population}</h3>
            <h3 class="paises__container-pais__dados-pais__regiao"><span>Region:</span>${region}</h3>
            <h3 class="paises__container-pais__dados-pais__capital"><span>Capital:</span>${capital}</h3>
        </div>
    `

    return cardPais;
}

// FILTRA PAISES

async function filtraPaises(regiao) {
    const paisesApi = await conectaApi.listaPaises();
    const paisesFiltrados = paisesApi.filter(
        elemento => elemento.region === regiao || elemento.region === "Americas" && regiao === "America");

    secaoPaises.innerHTML = "";

    paisesFiltrados.forEach(elemento => secaoPaises.appendChild(constroiCardPais(
            elemento.flags.png, elemento.name.common, elemento.population, elemento.region, elemento.capital)));
}

// MOSTRA TODOS OS PAISES

async function mostraTodosPaises() {
    const paisesApi = await conectaApi.listaPaises();
    
    paisesApi.forEach(elemento => secaoPaises.appendChild(constroiCardPais(
        elemento.flags.png, elemento.name.common, elemento.population, elemento.region, elemento.capital)));
}

mostraTodosPaises();
