const http = require('http');
const url = require('url');
const { PORT, defaultAppLoc } = require('./common');

function getServerCreator () {
    let server;
    return function serverCreator (opts={}, port) {
        if (server) return server;
        const {idePaths = [], isOpenEditor=true, cb} = opts;
         // 顺序：自定义，vscode，sublime
        const editors = [...idePaths, ...defaultAppLoc];

        server = http.createServer((req, res) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            const path = url.parse(req.url, true).query && url.parse(req.url, true).query.path;
            path && isOpenEditor && require('child_process').exec(editors.map(editor => `"${editor}" ${path}`).join('||'));
            path && cb && cb(path);
            res.end('ok');
        });
        server.on('clientError', (err, socket) => {
          socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
        });
        
        server.listen(port);
        
        return server;
    }
}

module.exports = getServerCreator();
