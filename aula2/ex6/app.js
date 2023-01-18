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

    // Vetor de caracteres válidos
    let caracteresValidos = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '@', '.', '-', '_'];
    
    // Obter o e-mail
    let email = req.body.email.toLowerCase();

    // Contadores
    let arroba = 0, ponto = 0, caracteresEspeciais = 0;

    // Laço para percorrer cada caractere
    for(let i=0; i<email.length; i++){

        // Extrair caractere
        let caractere = email.charAt(i);

        // Contar arrobas
        if(caractere == '@'){
            arroba++;
        }

        // Contar pontos
        if(caractere == '.'){
            ponto++;
        }

        // Contar caracteres diferentes de números, letras, arrobas, pontos, underlines e hífens
        if(!caracteresValidos.includes(caractere)){
            caracteresEspeciais++;
        }

    }

    // Arrumar acentuação
    res.set({ 'content-type': 'application/json; charset=utf-8' });

    // Situação
    if(email.length < 6){
        res.write('O e-mail deve possuir pelo menos 6 carateres.');
    }else if(arroba == 0 || arroba > 1){
        res.write('O e-mail deve possuir apenas um @.');
    }else if(ponto == 0){
        res.write('O e-mail deve possuir pelo menos um ponto.');
    }else if(caracteresEspeciais != 0){
        res.write('O e-mail não deve possuir caracteres especiais.')
    }else{
        res.write('E-mail válido, parabéns!');
    }

    // Finalizar rota
    res.end();

});

// Servidor
app.listen(8080);