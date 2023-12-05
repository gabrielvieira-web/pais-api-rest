async function listaPaises() {
    const conexao = await fetch("https://restcountries.com/v3.1/all");
    const conexaoConvertida = await conexao.json();

    return conexaoConvertida
}

async function buscaPais(termoDeBusca) {
    const conexao = await fetch(`https://restcountries.com/v3.1/name/${termoDeBusca}`);
    const conexaoConvertida = await conexao.json()

    return conexaoConvertida;
}

export const conectaApi = {
    listaPaises,
    buscaPais
}
