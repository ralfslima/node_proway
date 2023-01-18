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

app.post('/conjugacao', function(req, res){

    // Obter a palavra
    let verbo = req.body.palavra.toLowerCase();

    // Extrair a palavra removendo os dois últimos caracteres
    let inicioVerbo = verbo.substring(0, verbo.length - 2);

    // Extrair o término do verbo
    let finalVerbo = verbo.substring(verbo.length - 2);

    // Arrumar acentuação
    res.set({ 'content-type': 'application/json; charset=utf-8' });

    // Verifica se é um verbo terminado em AR
    if(finalVerbo != 'ar'){
        res.write('Ops! Precisa ser informado um verbo terminado em AR, exemplo: andar, amar, criar...');
    }else{
        res.write('Eu '   + inicioVerbo + 'o'    + '\n');
        res.write('Tu '   + inicioVerbo + 'as'   + '\n');
        res.write('Ele '  + inicioVerbo + 'a'    + '\n');
        res.write('Nós '  + inicioVerbo + 'amos' + '\n');
        res.write('Vós '  + inicioVerbo + 'ais'  + '\n');
        res.write('Eles ' + inicioVerbo + 'am'   + '\n');
    }

    // Finalizar rota
    res.end();

});

// Servidor
app.listen(8080);