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
    
    // Obter o valor e o tipo de moeda
    let valor = req.body.valor;
    let tipo = req.body.tipo;

    // Variável contendo o cálculo
    let calculo = 0;

    // Condicional
    if(tipo == 1){
        calculo = valor / 5.10;
    }else if(tipo == 2){
        calculo = valor / 5.50;
    }else{
        calculo = valor / 6.20;
    }

    // Arrumar acentuação
    res.set({ 'content-type': 'application/json; charset=utf-8' });
    
    // Exibir cálculo
    res.write("O valor convertido é de: " + calculo.toFixed(2));

    // Finalizar rota
    res.end();

});

// Servidor
app.listen(8080);