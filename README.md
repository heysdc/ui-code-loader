# UI CODE LOADER

[[中文](./mds/chinese.md)]

## Install

```
npm install ui-code-loader --save-dev
```

## Getting started

1. Add `ui-code-loader` to your webpack development config

```js
// webpack.dev.config.js
module: {
    rules: [
        {
            test: /\.(vue|html)$/,
            use: [
                {
                    loader: 'ui-code-loader'
                }
            ],
            enforce: 'pre',
            exclude: [path.resolve(__dirname, '../../node_modules')] // better exlude node_modules
        }
    ]
}
```
> Note: 
> You can choose either .vue or .html on demand.
> You'd better use this loader for development config.
> If eslint-loader with enforce:'pre' is also used, this loader should be put ahead of it.

2. Run your project loacally. `Alt + click` any ui component resolved by ui-code-loader on your browser, the magic just happen.

## Config

- `idePaths` <Array>: the `absolute IDE path` order you want. The order is \[...idePaths, '/Applications/Visual\ Studio\ Code.app/Contents/Resources/app/bin/code', '/Applications/Sublime\ Text.app/Contents/SharedSupport/bin/subl'\].

- `isSendReqest`<Boolean>: send request to open IDE or not. Default is `True`.

- `cb`<Function>: callback in case you want to do sth else. The param is `the absolute path` of choiced component file.

