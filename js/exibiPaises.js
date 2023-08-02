import { conectaApi } from "./conectaApi.js";

// ELEMENTOS index.html

const secaoPaises = document.querySelector("#conteudo-paises");
const barraDePesquisa = document.querySelector("[data-input-search]");
const inputDoFiltro = document.querySelector("[data-campo-filtro-input]");
const listaDeRegioes = document.querySelector("[data-lista-regioes]");
const regioes = document.querySelectorAll("[data-regiao]");
const conteudo = document.querySelector("[data-conteudo]");



// EXIBI TODOS OS PAISES AO CARREGAR A PAGINA

todosPaises();

// BARRA DE PESQUISA 

barraDePesquisa.addEventListener("keyup", e => {
    verificaBusca(e);
}) 

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
    filtraPaises(regiao)
}));

// EXIBE OS PAISES

function constroiCardPais(imagem, nome, populacao, regiao, capital) {
    const cardPais = document.createElement("div") 
    cardPais.className = "paises__container-pais"
    cardPais.dataset.card = "pais"
    cardPais.innerHTML = `
        <img src="${imagem}" alt="image pais" class="paises__container-pais__imagem">
        <div class="paises__container-pais__dados-pais">
            <h2 class="paises__container-pais__dados-pais__nome-pais">${nome}</h2>
            <h3 class="paises__container-pais__dados-pais__populacao"><span>Population:</span>${populacao}</h3>
            <h3 class="paises__container-pais__dados-pais__regiao"><span>Region:</span>${regiao}</h3>
            <h3 class="paises__container-pais__dados-pais__capital"><span>Capital:</span>${capital}</h3>
        </div>
    `

    return cardPais;
}

// MOSTRA TODOS OS PAISES

async function todosPaises() {
    const paisesApi = await conectaApi.listaPaises();
    
    paisesApi.forEach(elemento => secaoPaises.appendChild(constroiCardPais(
        elemento.flags.png, elemento.name.common, elemento.population, elemento.region, elemento.capital)));

    pegaNomeDoPaisClicado();
}

// FILTRA PAISES

async function filtraPaises(regiao) {
    const paisesApi = await conectaApi.listaPaises();
    const paisesFiltrados = paisesApi.filter(
        elemento => elemento.region === regiao || elemento.region === "Americas" && regiao === "America");

    secaoPaises.innerHTML = "";

    paisesFiltrados.forEach(elemento => secaoPaises.appendChild(constroiCardPais(
            elemento.flags.png, elemento.name.common, elemento.population, elemento.region, elemento.capital)));

    pegaNomeDoPaisClicado();
}

// BUSCA PAIS

async function verificaBusca(e) {
    if (e.key === "Enter") {
        try {
            const termoDeBusca = barraDePesquisa.value;
            const resultadoDaBusca = await conectaApi.buscaPais(termoDeBusca);
    
            secaoPaises.innerHTML = "";
    
            resultadoDaBusca.forEach(elemento => secaoPaises.appendChild(constroiCardPais(
                elemento.flags.png, elemento.name.common, elemento.population, elemento.region, elemento.capital
            )));

            pegaNomeDoPaisClicado();

        } catch {
            secaoPaises.innerHTML = `
            <div class="paises__container-erro">
                <img src="image/erro.png" alt="Imagem Erro" class="paises__container-erro__imagem-erro">
                <h2 class="paises__container-erro__mensagem">Desculpe, mais não foi possivel encontrar esse Pais!</h2>
            </div>
            `
        }
    }
}

// AÇÃO DE CLICK EM TODOS OS PAISES

function pegaNomeDoPaisClicado() {

    const cardPaises = document.querySelectorAll("[data-card]");
    
    cardPaises.forEach((pais) => pais.addEventListener("click", () => {
        const nomeDoPaisClicado = pais.childNodes[3].childNodes[1].innerText;
        window.location.href = `/conteudoPais.html?pais=${nomeDoPaisClicado}`
    }));
}
