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
    
    // Obter os números
    let numero1 = req.body.numero1;
    let numero2 = req.body.numero2;

    // Contador de pares e ímpares
    let par = 0, impar = 0;

    // Laço de repetição
    while(numero1 <= numero2){
        
        // Condicional
        if(numero1 % 2 == 0){
            par++;
        }else{
            impar++;
        }

        // Incrementa o numero1, até que seja maior que o numero2
        numero1++;
    }

    // Arrumar acentuação
    res.set({ 'content-type': 'application/json; charset=utf-8' });
    
    // Exibir contadores
    res.write("Pares: " + par);
    res.write("\n");
    res.write("Ímpares: " + impar);

    // Finalizar rota
    res.end();

});

// Servidor
app.listen(8080);