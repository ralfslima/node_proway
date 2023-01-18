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

    // Contador de vogais
    let vogais = 0;

    // Laço para percorrer cada caractere
    for(let i=0; i<palavra.length; i++){

        // Extrair caractere
        let caractere = palavra.charAt(i);

        // Contabilizar caso seja uma vogal
        if(caractere == 'a' || caractere == 'e' || caractere == 'i' || caractere == 'o' || caractere == 'u'){
            vogais++;
        }

    }

    // Arrumar acentuação
    res.set({ 'content-type': 'application/json; charset=utf-8' });

    // Retorno
    res.write('Foram encontradas: ' + vogais + ' vogais.')

    // Finalizar rota
    res.end();

});

// Servidor
app.listen(8080);