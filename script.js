

console.log("Pedidos válidos:", pedidosValidos);
console.log("Pedidos pagos:", pedidosPagos);
console.log("Total faturado: R$", totalFaturado.toFixed(2));
console.log("Pedidos:", textosPedidos);


const formCep = document.querySelector("#formCep");
const campoCep = document.querySelector("#cep");
const botaoCep = document.querySelector("#botaoCep");
const statusCep = document.querySelector("#statusCep");
const resultadoCep = document.querySelector("#resultadoCep");
const historicoCep = document.querySelector("#historicoCep");

const historico = [];

formCep.addEventListener("submit", buscarCep);

async function buscarCep(event) {
    event.preventDefault();

    const cep = campoCep.value.trim();

    if (!/^\d{8}$/.test(cep)) {
        statusCep.textContent = "Digite um CEP válido com 8 dígitos.";
        resultadoCep.replaceChildren();
        return;
    }

    statusCep.textContent = "Buscando...";
    botaoCep.disabled = true;
    resultadoCep.replaceChildren();

    try {
        const resposta = await fetch(
            `https://viacep.com.br/ws/${cep}/json/`,
            {
                signal: AbortSignal.timeout(5000)
            }
        );

        if (!resposta.ok) {
            throw new Error("Erro HTTP");
        }

        const dados = await resposta.json();

        if (dados.erro) {
            statusCep.textContent = "CEP não encontrado";
            return;
        }

        statusCep.textContent = "";

        mostrarResultadoCep(dados);

        historico.push({
            cep: cep,
            cidade: dados.localidade,
            uf: dados.uf
        });

        mostrarHistorico();

    } catch (erro) {
        statusCep.textContent = "Falha na conexão. Tente novamente.";
        console.error("Erro ao buscar CEP:", erro);

    } finally {
        botaoCep.disabled = false;
    }
}

function mostrarResultadoCep(dados) {
    resultadoCep.replaceChildren();

    const campos = [
        ["Rua", dados.logradouro],
        ["Bairro", dados.bairro],
        ["Cidade", dados.localidade],
        ["UF", dados.uf]
    ];

    campos.forEach(([titulo, valor]) => {
        const dt = document.createElement("dt");
        const dd = document.createElement("dd");

        dt.textContent = titulo;
        dd.textContent = valor || "Não informado";

        resultadoCep.append(dt, dd);
    });
}

function mostrarHistorico() {
    historicoCep.replaceChildren();

    historico.forEach(item => {
        const li = document.createElement("li");

        li.textContent =
            `${item.cep} — ${item.cidade}/${item.uf}`;

        historicoCep.append(li);
    });
}


const formPokemon = document.querySelector("#formPokemon");
const campoPokemon = document.querySelector("#pokemon");
const botaoPokemon = document.querySelector("#botaoPokemon");
const statusPokemon = document.querySelector("#statusPokemon");
const resultadoPokemon = document.querySelector("#resultadoPokemon");

formPokemon.addEventListener("submit", buscarPokemon);

async function buscarPokemon(event) {
    event.preventDefault();

    const nome = campoPokemon.value.trim().toLowerCase();

    if (nome === "") {
        statusPokemon.textContent = "Digite o nome de um Pokémon.";
        resultadoPokemon.replaceChildren();
        return;
    }

    statusPokemon.textContent = "Buscando...";
    botaoPokemon.disabled = true;
    resultadoPokemon.replaceChildren();

    try {
        const resposta = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${nome}`
        );

        if (!resposta.ok) {
            if (resposta.status === 404) {
                throw new Error("PokemonNotFound");
            }

            throw new Error("Erro HTTP");
        }

        const dados = await resposta.json();

        statusPokemon.textContent = "";

        mostrarPokemon(dados);

    } catch (erro) {
        if (erro.message === "PokemonNotFound") {
            statusPokemon.textContent = "Pokémon não encontrado.";
        } else {
            statusPokemon.textContent =
                "Falha na conexão. Tente novamente.";

            console.error("Erro ao buscar Pokémon:", erro);
        }

    } finally {
        botaoPokemon.disabled = false;
    }
}

function mostrarPokemon(pokemon) {
    resultadoPokemon.replaceChildren();

    const titulo = document.createElement("h3");
    titulo.textContent = pokemon.name;

    const imagem = document.createElement("img");
    imagem.src = pokemon.sprites.front_default;
    imagem.alt = `Imagem do Pokémon ${pokemon.name}`;

    const tipos = document.createElement("p");

    const nomesTipos = pokemon.types.map(tipo => {
        return tipo.type.name;
    });

    tipos.textContent = `Tipos: ${nomesTipos.join(", ")}`;

    resultadoPokemon.append(
        titulo,
        imagem,
        tipos
    );
}

