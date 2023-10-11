const http = require('http')
const fs = require('fs');

// // Explicitly creating function
// function rqListener(req, res) {}
// http.createServer(rqListener);

//---------- ***** ---------- ***** ----------
// We don't have to create a function explicitly we can also create a function anonymously 

const server = http.createServer(function (req, res) {

    // ----- REQUEST -----
    // TODO console.log(req);
    //----- ***** -----
    //TODO Important fields are as follows:

    // console.log(req.url, req.headers, req.method);

    // FOR POST Request
    const url = req.url;
    const method = req.method;
    //Stream and Buffers
    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Enter a message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type = "text" name="message"><button type = "submit">Send</button></form></body>');
        res.write('</header>');
        return res.end();
    }
    //FOR Redirection
    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFile('message.txt', message, err => {
                res.statusCode = 302;   // alternate of this is res.writeHead(302,{});
                res.setHeader('Location', '/');
                return res.end();
            });
            // console.log(parsedBody);
        });
    }
    // ----- RESPONSE -----
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First page</title></head>');
    res.write('<body><h1>Hello! from NodeJS server</h1></body>');
    res.write('</header>');
    res.end();
    // process.exit();
});

server.listen(3000);
// // Using Arrow functions
// http.createServer((req, res) => {

// });