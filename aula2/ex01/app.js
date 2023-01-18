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
    
    // Obter a temperatura e o tipo de cálculo
    let temperatura = req.body.temperatura;
    let tipo = req.body.tipo;

    // Variável contendo o cálculo
    let calculo = 0;

    // Condicional
    if(tipo == 1){
        calculo = (temperatura - 32) * 5/9;
    }else{
        calculo = (temperatura * 9/5) + 32;
    }

    // Arrumar acentuação
    res.set({ 'content-type': 'application/json; charset=utf-8' });
    
    // Exibir cálculo
    res.write("A temperatura é: " + calculo);

    // Finalizar rota
    res.end();

});

// Servidor
app.listen(8080);