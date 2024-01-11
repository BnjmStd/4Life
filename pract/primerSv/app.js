const http = require('http');

const servidor = http.createServer((req, res) => {
    console.log(req.url);
    res.setHeader('content-type', 'application/json');

    console.log(res.getHeaders());
    res.end("asd");
});

servidor.listen(3000, () => {
    console.log('el sv esta ok');
});