
const path = require('path');


const App={
    
    mode: "development",

    // メインとなるJavaScriptファイル（エントリーポイント）
    entry: `./src/App.js`,
  
    // ファイルの出力設定
    output: {
      //  出力ファイルのディレクトリ名
      path: `${__dirname}/calcos/public/javascripts`,
      // 出力ファイル名
      filename: "App.js"
    },

    

    module: {
        rules: [
            {
                test:/\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react'
                        ],
                        plugins: ['@babel/plugin-transform-runtime']
                    }
                }
            },

            {
                test:/\.css$/,
                use: [{ loader: 'style-loader' },
                    {loader:'css-loader'}]
            }
        ]
    }
};

const register={
    
    mode: "development",

    // メインとなるJavaScriptファイル（エントリーポイント）
    entry: `./src/register.js`,
  
    // ファイルの出力設定
    output: {
      //  出力ファイルのディレクトリ名
      path: `${__dirname}/calcos/public/javascripts`,
      // 出力ファイル名
      filename: "register.js"
    },

    

    module: {
        rules: [
            {
                test:/\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react'
                        ],
                        plugins: ['@babel/plugin-transform-runtime']
                    }
                }
            },

            {
                test:/\.css$/,
                use: [{ loader: 'style-loader' },
                    {loader:'css-loader'}]
            }
        ]
    }
};

module.exports =[
    App,register
];