// Importar o módulo http
const http = require('http');

// Criar servidor
http.createServer(function(req, res){
    res.write('Utilizando o Nodemon');
    res.end();
}).listen(8080);