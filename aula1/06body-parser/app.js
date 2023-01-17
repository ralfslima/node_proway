// Importar módulo Express
const express = require('express');

// App
const app = express();

// Configurar body-parser (responsável pelo formulário)
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// Rotas
app.get('/', function(req, res){
    res.sendFile(__dirname + '/formulario.html');
});

app.post('/receberNome', function(req, res){
    res.write(req.body.nome);
    res.end();
});

// Servidor
app.listen(8080);