//@ts-check
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonConfig = void 0;
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const logging = require('webpack/lib/logging/runtime');
const ThreadsPlugin = require('threads-plugin');
const PackageJSONpath = path.join(__dirname, 'package.json');
/**@type {import('webpack').Configuration}*/
exports.commonConfig = {
    target: 'node',
    mode: process.env?.NODE_ENV,
    devtool: process.env?.NODE_ENV == 'development' ? 'source-map' : 'hidden-source-map',
    entry: './extension.ts',
    output: {
        // the bundle is stored in the 'dist' folder (check package.json), 📖 -> https://webpack.js.org/configuration/output/
        path: path.resolve(__dirname, 'out'),
        filename: 'extension.js',
        libraryTarget: 'commonjs2',
        devtoolModuleFilenameTemplate: '../[resource-path]'
    },
    externals: {
        vscode: 'commonjs vscode', // the vscode-module is created on-the-fly and must be excluded. Add other modules that cannot be webpack'ed, 📖 -> https://webpack.js.org/configuration/externals/        
    },
    resolve: {
        // support reading TypeScript and JavaScript files, 📖 -> https://github.com/TypeStrong/ts-loader
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            compilerOptions: {
                                module: "esnext"
                            }
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
    // new BundleAnalyzerPlugin()
    ]
};
module.exports = (env) => {
    return [
        {
            ...exports.commonConfig,
            entry: {
                extension: './extension.ts',
            },
            externals: {
                vscode: 'commonjs vscode',
            },
            resolve: {
                modules: ['node_modules'],
                extensions: ['.ts', '.js', '.json'],
                mainFields: ["main", "module"]
            },
            name: 'extension',
            output: {
                devtoolModuleFilenameTemplate: '../[resource-path]',
                filename: '[name].js',
                libraryTarget: 'commonjs2',
                path: path.resolve(__dirname, 'out')
            },
            stats: 'errors-only',
            target: 'node',
            // Copy startpage html to output bundle
            plugins: [
                // These must also be defined in the jest section of package.json for tests to pass
                new webpack.DefinePlugin({
                    'process.env.NODE_ENV': JSON.stringify(process.env?.NODE_ENV || 'development'),
                    DEVTOOLS_BASE_URI: JSON.stringify(env && env?.devtoolsBaseUri || undefined)
                })
            ],
        },
    ];
};
//# sourceMappingURL=webpack.config.js.map