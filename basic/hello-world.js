// https://goo.gl/7a9Tsz
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    console.log(req.url);
    if(req.url === '/'){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Hello World!\n');
    } else if (req.url === '/users'){
        const users = [
            {name: 'Woo'},
            {name: 'Beck'},
        ]
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(users));

    }
    
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});