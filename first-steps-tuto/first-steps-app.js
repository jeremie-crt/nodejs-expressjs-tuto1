//Modules
//Os archi
const os = require('os')
console.log(os.arch());
console.log(os.homedir());

//Fs file crud
const fs = require('fs')
/*
fs.readFile('test.txt', 'utf-8', (err, data) => {
    if(err) {
        console.log(err);
    } else {
        console.log(data);

        fs.writeFile('test.txt', 'Wow that move !', 'utf-8', (err) => {
            fs.readFile('test.txt', 'utf-8', (err, data) => {
                console.log(data);
            })

        })
    }
})

 */

//SiteWeb server backend
const http = require('http')

//Each request goes here
http.createServer((req, res) => {
    if(req.url === '/') {
        res.writeHead(200, { 'Content-type': 'text/html' })
        res.write('Welcome on this awesome Homepage\n')
        res.end()

    } else if(req.url === '/test') {

        fs.readFile('test.txt', 'utf-8', (err, data) => {
            if(err) {
                send404(res)
            } else {
                res.writeHead(200, {'Content-type': 'text/html'})
                res.write(data)
                res.end()
            }
        })

    } else {
        send404(res)
    }

}).listen(8080)

function send404(res) {
    res.writeHead(400, { 'Content-type': 'text/html' })
    res.write('<span style="color: #ff0000">404 ERROR !</span> \\(-_-)/')
    res.end()
}