const {getInjectScript} = require('./common');

module.exports = function ({resourcePath, rootContext, source, options}, port) {
    const insertedScript = getInjectScript(options, resourcePath, port);
    const insertedScriptInline = getInjectScript(options, resourcePath, port, true);

    if (source.match(/(<html|<meta|<link|<head)/)) {
        if (source.match(/<body>[\s\S]*<\/body>/)) {
            return source.replace(/<body>([\s\S]*)<\/body>/, function (match, info) {
                return `<body><span class="${resourcePath}">${info}<script>${insertedScript}</script></span></body>`;
            });
        }
        return source;
    }

    return `<span onclick="${insertedScriptInline}" class="${resourcePath}">${source}</span>`;
};
