var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
    // polyfills - the polyfills needed to run Angular applications in most modern browsers.
    // vendor - the third-party dependencies such as Angular, lodash, and bootstrap.css.
    // app - the application code.
    //---
    entry: {
    'polyfills': './config/polyfills.ts',
    'vendor': './config/vendor.ts',
    'app': './app/main.ts'
    },

    // most import statements don't mention the extension at all.
    // Tell Webpack to resolve extension-less file requests by looking for matching files with .ts extension or .js extension
    // (for regular JavaScript files and pre-compiled TypeScript files).
    //---
    resolve: {
        extensions: ['.ts', '.js']
    },

    // awesome-typescript-loader - a loader to transpile the Typescript code to ES5, guided by the tsconfig.json file
    // angular2-template-loader - loads angular components' template and styles
    // html - for component templates
    // images/fonts - Images and fonts are bundled as well.
    // css - The pattern matches application-wide styles; the second handles component-scoped styles (the ones specified in a component's styleUrls metadata property)
    // ExtractTextPlugin (described below) applies the style and css loaders to these files.
    //---
    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: [{
                    loader: 'awesome-typescript-loader',
                    options: { configFileName: helpers.root('tsconfig.json') }
                } , 'angular2-template-loader']
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            // {
            //     test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
            //     loader: 'file-loader?name=assets/[name].[hash].[ext]'
            // },
            {
                test: /\.css$/,
                exclude: helpers.root('app'),
                loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader?sourceMap' })
            },
            {
                test: /\.scss$/,
                exclude: helpers.root('app'),
                loaders: ['style-loader', 'css-loader', 'sass-loader']
            },
            // filters for component-scoped styles and loads them as strings
            // via the raw loader — which is what Angular expects to do with styles specified in a styleUrls metadata property.
            //---
            {
                test: /\.css$/,
                include: helpers.root('app'),
                loader: 'raw-loader'
            },
            {
                test: /\.scss$/,
                include: helpers.root('app'),
                loader: ['raw-loader', 'sass-loader']
            }
        ]
    },

    plugins: [
        // Workaround for angular/angular#11580
        new webpack.ContextReplacementPlugin(
           // The (\\|\/) piece accounts for path separators in *nix and Windows
           /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
           helpers.root('./'), // location of your src
           {} // a map of your routes
        ),

        // the application code imports vendor code. Webpack itself is not smart enough to keep the vendor code out of the app.js bundle.
        // The CommonsChunkPlugin does that job.
        //---
        new webpack.optimize.CommonsChunkPlugin({
          name: ['app', 'vendor', 'polyfills']
        }),

        // Webpack generates a number of js and css files. You could insert them into the index.html manually.
        // That would be tedious and error-prone. Webpack can inject those scripts and links for you with the HtmlWebpackPlugin.
        //---
        new HtmlWebpackPlugin({
          template: 'index.html'
        })
    ]
};
