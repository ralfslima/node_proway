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

app.post('/transformar', function(req, res){

    // Obter a palavra
    let palavra = req.body.palavra;

    // Variável contendo a palavra criptografada
    let palavraCriptografada = '';

    // Laço para inverter a palavra
    for(let i=0; i<palavra.length; i++){

        // Extrair caractere
        let caractere = palavra.charAt(i);

        // Verificar se a letra deverá ser alterada
        if(caractere == 'a'){
            caractere = 'v';
        }else if(caractere == 'A'){
            caractere = 'V';
        }else if(caractere == 'e'){
            caractere = 'w';
        }else if(caractere == 'E'){
            caractere = 'W';
        }else if(caractere == 'i'){
            caractere = 'x';
        }else if(caractere == 'I'){
            caractere = 'X';
        }else if(caractere == 'o'){
            caractere = 'y';
        }else if(caractere == 'O'){
            caractere = 'Y';
        }else if(caractere == 'u'){
            caractere = 'z';
        }else if(caractere == 'U'){
            caractere = 'Z';
        }

        // Adicionar o caractere na variável palavraCriptografada
        palavraCriptografada += caractere;

    }

    // Arrumar acentuação
    res.set({ 'content-type': 'application/json; charset=utf-8' });

    // Exibir a palavra criptografada
    res.write(palavraCriptografada);

    // Finalizar rota
    res.end();

});

// Servidor
app.listen(8080);