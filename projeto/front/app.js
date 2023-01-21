// Importar Express
const express = require('express');

// Importar o Express-handlebars
const { engine } = require('express-handlebars');

// App
const app = express();

// Importar o Bootstrap
app.use('/bootstrap', express.static(__dirname+'/node_modules/bootstrap/dist/css'));

// Importar o CSS
app.use('/css', express.static(__dirname+"/css"));

// Configuração do handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// Manipular formulário
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// Rotas
app.get('/', (req, res) => {
    
    fetch('http://localhost:3000/produtos')
    .then(retorno => retorno.json())
    .then(retorno_json => res.render('index', {'produtos':retorno_json}));

});

app.post('/cadastrar', (req, res) => {
    
    // Objeto
    let obj = {'nome': req.body.nome, 'valor': req.body.valor};

    // Fetch
    fetch('http://localhost:3000/produtos', {
        method:'post',
        body: JSON.stringify(obj),
        headers:{'Content-Type':'application/json'}
    })
    .then(res.redirect('/'));

});

app.get('/produtoSelecionado/:id', (req, res) => {

    fetch('http://localhost:3000/produtos/'+req.params.id)
    .then(retorno => retorno.json())
    .then(retorno_convertido => res.render('editar', {'produto':retorno_convertido}));

});

app.post('/editar', (req, res) => {
    
    // Objeto
    let obj = {'nome': req.body.nome, 'valor': req.body.valor};

    // Fetch
    fetch('http://localhost:3000/produtos/'+req.body.id, {
        method:'put',
        body: JSON.stringify(obj),
        headers:{'Content-Type':'application/json'}
    })
    .then(res.redirect('/'));

});

app.get('/remover/:id', (req, res) => {

    fetch('http://localhost:3000/produtos/'+req.params.id, {
        method:'delete',
        headers:{'Content-Type':'application/json'}
    })
    .then(res.redirect('/'));

});

// Servidor
app.listen(8080);