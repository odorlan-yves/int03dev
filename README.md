Tecnologias utilizadas
HTML5
JavaScript
Fetch API
ViaCEP
PokéAPI
📌 Parte 1 - Manipulação de Dados

Foi criado um array de objetos chamado pedidos.

Os pedidos são:

Validados com filter()
Filtrados pelo status "pago"
Somados utilizando reduce()
Formatados utilizando toFixed(2)

Exemplo de resultado:

Bia — R$ 120.00
Ana — R$ 200.00
📍 Parte 2 - Buscador de CEP

O projeto possui um formulário para pesquisar CEP.

O CEP precisa:

Ter somente números
Possuir exatamente 8 dígitos
Ter os espaços removidos com trim()

A consulta é realizada através da API ViaCEP.

Estados da tela

O projeto trabalha com quatro estados:

Carregando

Buscando...

Erro

Falha na conexão. Tente novamente.

Não encontrado

CEP não encontrado

Sucesso

Exibe:

Rua
Bairro
Cidade
UF

Os dados são inseridos no DOM utilizando createElement() e textContent.

🕘 Histórico

As pesquisas realizadas são armazenadas em um array de objetos e exibidas na tela.

Exemplo:

01001000 — São Paulo/SP
🐱 Parte 3 - Mini Pokédex

Foi criada uma busca de Pokémon utilizando a PokéAPI.

O nome informado pelo usuário é:

Limpo com trim()
Convertido para letras minúsculas com toLowerCase()

Quando o Pokémon é encontrado, são exibidos:

Nome
Imagem
Tipos

Caso o Pokémon não exista, é exibida a mensagem:

Pokémon não encontrado.
⚠️ Tratamento de erros

O fetch() não considera erros HTTP, como 404, automaticamente como erro.

Por isso é necessário verificar:

if (!resposta.ok)

Assim é possível tratar corretamente erros como 404 e outros problemas HTTP.

Também são tratados erros de conexão.

🔐 Segurança

Para evitar problemas de XSS, os dados recebidos das APIs não são inseridos utilizando innerHTML.

O projeto utiliza:

createElement()

e:

textContent

para inserir os dados no HTML.

⏳ Async/Await

As requisições são feitas utilizando async/await.

Exemplo:

const resposta = await fetch(url);

Isso facilita o trabalho com operações assíncronas.

⚡ Promise.all

O Promise.all() pode ser mais rápido que vários await seguidos porque permite iniciar várias requisições ao mesmo tempo.

Com await sequencial:

const resultado1 = await buscar1();
const resultado2 = await buscar2();
const resultado3 = await buscar3();

Cada requisição espera a anterior terminar.

Com Promise.all():

const resultados = await Promise.all([
    buscar1(),
    buscar2(),
    buscar3()
]);

As requisições podem acontecer em paralelo, e o código espera todas terminarem.

Isso aproveita melhor o tempo de rede quando as requisições são independentes.

🔄 Event Loop

O JavaScript executa as operações seguindo, de forma simplificada:

Código síncrono
      ↓
Microtarefas
(Promises / await)
      ↓
Tarefas
(setTimeout / eventos)
⏱️ Timeout

Na busca de CEP foi utilizado:

AbortSignal.timeout(5000)

Isso limita a requisição a 5 segundos.

▶️ Como executar
Baixe ou clone o projeto.
Abra a pasta do projeto.
Abra o arquivo index.html no navegador.
Teste o buscador de CEP.
Teste a Mini Pokédex.
Abra o Console do navegador para visualizar os resultados da Parte 1.
🎯 Objetivo

O objetivo do projeto é praticar:

Objetos
Arrays
map()
filter()
reduce()
Promises
async/await
Fetch API
APIs externas
Manipulação do DOM
Tratamento de erros
Estados de interface
Event Loop
