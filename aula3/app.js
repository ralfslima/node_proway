// Importar módulo express
const express = require('express');

// Importar módulo express-handlebars
const { engine } = require('express-handlebars');

// App
const app = express();

// Bootstrap
app.use('/css', express.static(__dirname + "/node_modules/bootstrap/dist/css"));

// Configuração do express-handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// Função para obter os Pokémons


async function obterPokémons(){

    let pokemons = [];

    for(let i=1; i<=151; i++){
        fetch('https://pokeapi.co/api/v2/pokemon/'+i)
        .then(retorno => retorno.json())
        .then(retorno => pokemons.push(retorno));
    }

    return pokemons;
}

// Rotas
app.get('/', (req, res) => {
    res.render('pagina1', {'nome':'Ralf', 'exibir':false});
});

app.get('/pagina2', (req, res) => {

    fetch('https://jsonplaceholder.typicode.com/comments')
    .then(retorno => retorno.json())
    .then(comentarios => res.render('pagina2', {'vetor':comentarios}));

});

app.get('/exercicio2', async (req, res) => {

    let cep = '89010204';
    fetch('https://viacep.com.br/ws/'+cep+'/json/')
    .then(r => r.json())
    .then(r => res.render('exercicio2', {'dados':r}));

    res.end();
});

// Porta do servidor
app.listen(8080);