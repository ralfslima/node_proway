// Importar módulo Express
const express = require('express');

// Criar constante app
const app = express();

// Referência arquivos estáticos (CSS, Imagem, JS...)
app.use(express.static(__dirname + '/publico'));

// Rota
app.get('/', function(req, res){
    res.sendFile(__dirname + '/pagina.html');
});

// Servidor
app.listen(8080);