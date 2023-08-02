import { conectaApi } from "./conectaApi.js";

const voltar = document.querySelector("[data-container-voltar]");

const paisImagem = document.querySelector("[data-imagem]");
const paisNome = document.querySelector("[data-nome-pais]");
const paisNomeNativo = document.querySelector("[data-nome-nativo]");
const paisPopulacao = document.querySelector("[data-populacao]");
const paisRegiao = document.querySelector("[data-regiao]");
const paisSubRegiao = document.querySelector("[data-sub-regiao]");
const paisCapital = document.querySelector("[data-capital]");
const paisTld = document.querySelector("[data-tld]");
const paisMoeda = document.querySelector("[data-moeda]");
const paisLinguagens = document.querySelector("[data-linguagens]");
const paisFronteiros = document.querySelectorAll("[data-fronteiro]");

const urlSearchParams = new URLSearchParams(window.location.search)
const nomePaisUrl = urlSearchParams.get("pais")

puxaDadosDoPaisNaApi(nomePaisUrl);

async function puxaDadosDoPaisNaApi(nomePais) {
    const paisesApi = await conectaApi.listaPaises();

    const dadosDoPaisClicado = paisesApi.filter(pais => pais.name.common === nomePais)
    dadosDoPaisClicado.map((elemento) => adicionaDados(
            elemento.flags.svg, elemento.name.common, elemento.translations.nld.common, elemento.population, 
            elemento.region, elemento.subregion, elemento.capital, elemento.tld, elemento.currencies, 
            elemento.languages,elemento.borders
    ));
}

function adicionaDados(imagem, nome, nomeNativo, populacao, regiao, subRegiao, capital, tld, moeda, linguagens, fronteiros) {
    paisImagem.src = imagem;
    paisNome.innerHTML = nome;
    paisNomeNativo.append(nomeNativo);
    paisPopulacao.append(populacao);
    paisRegiao.append(regiao);
    paisSubRegiao.append(subRegiao);
    paisCapital.append(capital);
    paisTld.append(tld);

    // Converte os dados da MOEDA, de OBJETO para um ARRAY

    const arrayMoeda = [moeda] 

    const arrayDadosMoeda = arrayMoeda.map((obj) => {
        return Object.keys(obj).map((key) => {
            return obj[key];
        })
    })

    paisMoeda.append(arrayDadosMoeda[0][0].name)

    // Converte os dados das LINGUAGENS, de OBJETO para um ARRAY

    const arrayLinguagens = [linguagens]

    const arrayDadosLinguagens = arrayLinguagens.map((obj) => {
        return Object.keys(obj).map((key) => {
            return obj[key];
        })
    })

    arrayDadosLinguagens[0].forEach((elemento) => {
        paisLinguagens.innerHTML += (`${elemento}, `)
    })

    paisLinguagens.innerHTML = paisLinguagens.innerHTML.slice(0, -2);
    
    // Adiciona até 3 paises fronteiros

    for (let i = 0; i < 3; i++) {
        paisFronteiros[i].innerHTML = fronteiros[i];
    }
}

// BOTÃO DE VOLTAR 

voltar.addEventListener("click", () => {
    window.location.href = "/index.html"
})
