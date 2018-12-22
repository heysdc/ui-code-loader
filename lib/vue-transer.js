const {getInjectScript} = require('./common');

module.exports = function ({resourcePath, rootContext, source, options}, port) {
    const matchedTemplate = /<template>([\s\S]*)<\/template>/i.exec(source);
    const matchedScript = /<script.*?>([\s\S]*)<\/script>/i.exec(source);
    let templateInnerInfo = matchedTemplate && matchedTemplate[1];
    let scriptInnerInfo = matchedScript && matchedScript[1];

    const insertedScript = getInjectScript(options, resourcePath, port);

    function addClassToTag (tag) {
        if (tag.match(/\sclass ?=/i)) {
            return tag.replace(/\sclass ?=['"](.*?)['"]/i, (match, info) => ` class="${info} ${resourcePath}"`);
        }
        return tag.replace(/(<[a-zA-Z]+)(\s|>)/i, (match, tagStart, empty) => `${tagStart} class="${resourcePath}"${empty}`);
    }

    if (templateInnerInfo && scriptInnerInfo && !templateInnerInfo.includes(resourcePath)) {
        templateInnerInfo = templateInnerInfo.replace(/(<.*?>)([\s\S]*)(<\/.*?>)/gi, (match, startEle, content, endEle) => {
            return `${addClassToTag(startEle)}${content}${endEle}`;
        });

        const mountedReg = /[^a-zA-Z\.]mounted *\(.*?\) *{/i;
        const dataReg = /[^a-zA-Z\.]data *\(.*?\) *{/i;

        let matchMounted;
        /* eslint-disable */
        if (matchMounted = scriptInnerInfo.match(mountedReg)) {
            scriptInnerInfo = scriptInnerInfo.replace(mountedReg, `${matchMounted[0]}${insertedScript}`);
        } else if (matchMounted = scriptInnerInfo.match(dataReg)) {
            scriptInnerInfo = scriptInnerInfo.replace(dataReg, `mounted () {${insertedScript}},${matchMounted[0]}`);
        } else {
            scriptInnerInfo = `setTimeout(function(){${insertedScript}}, 1000);${scriptInnerInfo}`;
        }
        /* eslint-enable */

        return source.replace(/<template>([\s\S]*)<\/template>/i, (match, info) => {
            return `<template>${templateInnerInfo}</template>`;
        }).replace(/(<script.*?>)([\s\S]*)<\/script>/i, (match, startTag, info) => {
            return `${startTag}${scriptInnerInfo}</script>`;
        });
    }
    return source;
};
