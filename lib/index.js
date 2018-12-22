const util = require('loader-utils');
const htmlTranser = require('./html-transer.js');
const vueTranser = require('./vue-transer.js');
const {getPort} = require('./common');

const port = getPort();

module.exports = function (source) {
    const options = util.getOptions(this) || {};
    
    const {
        minimize,
        rootContext,
        resourcePath
    } = this;
    const isProduction = options.productionMode || minimize || process.env.NODE_ENV === 'production';
    if (isProduction) return source;

    const transParam = {
        resourcePath,
        rootContext,
        source,
        options
    };
    
    require('./add-ui-code-api.js')(options, port);

    switch (true) {
        case resourcePath.includes('.vue'):
            return vueTranser(transParam, port);
        case resourcePath.includes('.html'):
            return htmlTranser(transParam, port);
            // TODO
        case resourcePath.includes('.jsx'):
        default:
            return source;
    }
};
