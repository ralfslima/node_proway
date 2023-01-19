// Importar módulo express
const express = require('express');

// Importar módulo express-handlebars
const { engine } = require('express-handlebars');

// App
const app = express();

// Bootstrap
app.use('/css', express.static(__dirname + "/node_modules/bootstrap/dist/css"));

// Manipular informações vindas de formulário
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// Configuração do express-handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// Rotas
app.get('/', (req, res) => {
    res.render('pagina1', {'nome':'Ralf', 'exibir':false});
});

app.get('/pagina2', (req, res) => {

    fetch('https://jsonplaceholder.typicode.com/comments')
    .then(retorno => retorno.json())
    .then(comentarios => res.render('pagina2', {'vetor':comentarios}));

});

app.get('/exercicio1', (req, res) => {
    res.render('exercicio1', {'exibirDados':false});
});

app.post('/exercicio1', (req, res) => {

    let cep = req.body.cep;
    fetch('https://viacep.com.br/ws/'+cep+'/json/')
    .then(retorno => retorno.json())
    .then(retorno => res.render('exercicio1', {'exibirDados':true, 'dados':retorno}));

});

app.get('/exercicio2', async (req, res) => {

    // Vetor contendo os Pokémons
    let pokemons = [];

    // Laço de repetição e requisição
    for(let i=1; i<=151; i++){
        const requisicao = await fetch('https://pokeapi.co/api/v2/pokemon/'+i);
        const conversao = await requisicao.json()
        pokemons.push(conversao);
    } 

    console.log(pokemons);
    
    // Renderizar página
    res.render('exercicio2', {'pokemons':pokemons});
});

app.get('/exercicio3', async (req, res) => {

    // Objeto contendo os dados do dólar e do euro
    let dolar = '';
    let euro  = '';

    // Requisições
    const requisicaoDolar = await fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL')
    const converterDolar = await requisicaoDolar.json()
    dolar = (converterDolar.USDBRL);

    const requisicaoEuro = await fetch('https://economia.awesomeapi.com.br/json/last/EUR-BRL')
    const converterEuro = await requisicaoEuro.json()
    euro = (converterEuro.EURBRL);
    
    // Renderizar página
    res.render('exercicio3', {'dolar':dolar,'euro':euro});
});

// Porta do servidor
app.listen(8080);