var path = require("path")
var webpackConfig = {
    devtool: 'source-map',
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'moment/min/moment.min': 'moment',
        'moment': 'moment'
    },
    resolve: {
        alias: {
            'fast-timer': './'
        }
    },
    module: {
        postLoaders: [
            // 如果不需要兼容IE8请去掉 es3ify
            {
                test: /\.js$/,
                loaders: ['es3ify']
            }
        ],
        loaders: [
            {
                // 将 md 增加到 babel 编译是为了支持 ````js console.log() ```` 语法
                test: /\.(js|md)$/,
                loader: 'babel-loader',
                  exclude: /node_modules/,
                query: {
                    presets: [
                         "es2015"
                    ],
                    plugins: [
                       ["transform-react-jsx", {pragma: 'require("react").createElement'}],
                       "transform-flow-strip-types",
                       "syntax-flow",
                       "syntax-jsx",
                       "transform-react-display-name",
                       "transform-decorators-legacy",
                       "transform-class-properties"
                    ]
                }
            },
            {
             test: /\.xtpl$/,
             loader: 'xtpl',
            },
            {
                test: /\.css$/,
                loader: "style!css"
            },
            {
                test: /\.less$/,
                loader: "style!css!less"
            }
        ]
    }
}
// less
var LessPluginFunctions = require('less-plugin-functions')
fis.match('*.less', {
    rExt: '.css',
    preprocessor : fis.plugin("autoprefixer",{
        "browsers": ["Android >= 2.1", "iOS >= 4", "ie >= 8", "firefox >= 15"],
        "cascade": true
    }),
    parser: fis.plugin('less-2.x', {
        plugins: [
            new LessPluginFunctions()
        ]
    })
})


// webpack
// 如何编译 markdown 里面的代码片段
// https://github.com/fex-team/fis3/issues/852
fis.match('*.md:js', {
    parser: [
        function (content, file) {

            return content
            // return content.replace(/["']fast-timer["']/, '"./index"')
            //               .replace(/["']fast-timer\/btn["']/, '"./btn"')
        },
        fis.plugin('webpack', webpackConfig),
        fis.plugin('inlinecss')
    ]
})

// markrun
var markrun = require('markrun')
fis.match('*.md', {
    rExt: '.html',
    parser: function (content, file) {
        var html = markrun(content, {
            lang: {
                js: function (source) {
                    result = fis.compile.partial(source, file, {
                       ext: 'js'
                    });
                    return {
                        type: 'js',
                        code: result
                    }
                }
            },
            template: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="renderer" content="webkit">
<meta http-equiv="X-UA-Compatible" content="IE=edge" ></meta>
<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no" />
<style>
pre {
background: rgb(33,37,46);
border-radius: 5px;
padding: .5em 1em;
color:rgb(155,162,178);
}
</style>
<title> <%- title %></title>
</head>
<body>
<%- content %>
</body>
</html>`
        })
        html = html.replace(/href="([^"]+)\.md"/g, 'href="$1.html"')
        return html
    }
})




// 过滤文件
fis.match('{package.json,mobe.js,fis-conf.js,/node_modules/**,npm-debug.log,view/pc/mock/**}', {
    release: false
})

// 压缩文件
fis.media('qa').match('**/README.html', {
  release: false
});

fis.media('qa').match('*.js', {
  optimizer: fis.plugin('uglify-js')
});

fis.media('qa').match('*.css', {
  optimizer: fis.plugin('clean-css')
});

fis.media('qa').match('*.png', {
  optimizer: fis.plugin('png-compressor')
});
// 发布时非 html 资源都进行 hash 处理
fis.media('qa').match('*', {
  useHash: true
});
fis.media('qa').match('*.html', {
  useHash: false
});
