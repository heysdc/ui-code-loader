const {createServer} = require('net');

const DEFAULT_PORT = 21895;
module.exports = {}

module.exports.getPort = function (port = DEFAULT_PORT) {
    try {
        require('child_process').execSync(`lsof -i:${port}`, {encoding: 'utf-8'});
        return getPortSync(++port);
    } catch (e){
        return port;
    }
}

module.exports.defaultAppLoc = ['/Applications/Visual\ Studio\ Code.app/Contents/Resources/app/bin/code', '/Applications/Sublime\ Text.app/Contents/SharedSupport/bin/subl'];

module.exports.getInjectScript = function (options, resourcePath, port = DEFAULT_PORT) {
    return `
        var targetEl = document.getElementsByClassName('${resourcePath}')[0];
        targetEl && targetEl.addEventListener('click', function (e) {
            if (!e.altKey) return;
            e.stopPropagation();
            console.log('当前点击的模块路径为：\\n${resourcePath}');
            ${!options.notSendReqest && `fetch('http://localhost:${port}?path=${encodeURIComponent(resourcePath)}');` || ''}
        });
    `.replace(/\n/g, '');
}