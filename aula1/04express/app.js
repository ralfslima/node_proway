// Importar o módulo Express
const express = require('express');

// Extrair um módulo do Express
const app = express();

// Rota
app.get('/', function(req, res){
    res.write('Aprendendo Express');
    res.end();
});

// Servidor
app.listen(8080);