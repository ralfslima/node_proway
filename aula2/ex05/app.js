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
    
    // Obter as notas e as faltas
    let nota1 = parseFloat(req.body.nota1);
    let nota2 = parseFloat(req.body.nota2);
    let nota3 = parseFloat(req.body.nota3);
    let nota4 = parseFloat(req.body.nota4);
    let faltas = req.body.faltas;

    // Cálculo de média
    let media = (nota1+nota2+nota3+nota4)/4;

    // Arrumar acentuação
    res.set({ 'content-type': 'application/json; charset=utf-8' });
    
    // Situação
    if(faltas > 15){
        res.write('Reprovado por faltas.');
    }else if(media >= 7){
        res.write('Aprovado!');
    }else{
        res.write('Reprovado por média.');
    }

    // Finalizar rota
    res.end();

});

// Servidor
app.listen(8080);