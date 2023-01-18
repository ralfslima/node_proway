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

app.post('/validar', function(req, res){

    // Obter a palavra
    let palavra = req.body.palavra.toLowerCase();

    // Variável contendo a palavra invertida
    let palavraInvertida = '';

    // Laço para inverter a palavra
    for(let i=palavra.length-1; i>=0; i--){

        // Extrair caractere
        let caractere = palavra.charAt(i);

        // Concatenar na variável palavraInvertida
        palavraInvertida += caractere;

    }

    // Arrumar acentuação
    res.set({ 'content-type': 'application/json; charset=utf-8' });

    // Condicional e retorno
    if(palavra == palavraInvertida){
        res.write('É um palíndromo.');
    }else{
        res.write('Não é um palíndromo.');
    }

    // Finalizar rota
    res.end();

});

// Servidor
app.listen(8080);