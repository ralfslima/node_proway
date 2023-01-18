// Importar módulo
const express = require('express');

// App
const app = express();

// Configurar envio e recebimento de dados via formulário
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// Rotas
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.post('/calcular', function(req, res){
    
    // Obter o número
    let numero = parseInt(req.body.numero);

    // Arrumar acentuação
    res.set({ 'content-type': 'application/json; charset=utf-8' });
    
    // Exibir contadores
    res.write("Antecessor: " + (numero - 1));
    res.write("\n");
    res.write("Sucessor: " + (numero + 1));

    // Finalizar rota
    res.end();

});

// Servidor
app.listen(8080);