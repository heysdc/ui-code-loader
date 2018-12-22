# UI CODE LOADER

\[[English](../README.md)\]

## 安装

```
npm install ui-code-loader --save-dev
```

## 用法

1. 在本地webpack开发配置中引入`ui-code-loader`

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
> 注意: 
> 目前支持html文件和vue文件，可按需配置
> 出于安全考虑，最好在本地开发环境下才引入本loader
> 与eslint-loader共用: 插入代码格式可能与本地eslint配置不符，配置需要保证本loader放置于eslintloader之前

2. 启动项目，在浏览器中，按住alt单击vue组建或者html模块，控制台会打印出模块的绝对路径，vscode或者sublime自动打开相应文件

## 配置

- `idePaths` <Array>: 编辑器绝对路径。 默认顺序： \[...idePaths, '/Applications/Visual\ Studio\ Code.app/Contents/Resources/app/bin/code', '/Applications/Sublime\ Text.app/Contents/SharedSupport/bin/subl'\]

- `isSendReqest`<Boolean>: 是否发送请求打开编辑器，默认true

- `cb`<Function>: 回调函数，参数为选中模块的绝对路径
