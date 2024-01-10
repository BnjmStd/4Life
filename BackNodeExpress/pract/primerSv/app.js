const http = require('http');

const servidor = http.createServer((req, res) => {
    console.log(req.url);
    res.end("asd");
});

servidor.listen(3000, () => {
    console.log('el sv esta ok');
});