const path = require('path');
const parseArgs = require('minimist');
const webpack = require('webpack');
const packageJson = require('./package.json');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');

const { mode, public, port = 9000 } = parseArgs(process.argv);

const outputFolder = 'dist';
const outputFullPath = path.resolve(__dirname, outputFolder);

const isProduction = mode === 'production';

const devPublicPath = `http://${public}/dist/`;

module.exports = ({ tagName }) => {
    const tagVersion = tagName ? tagName.replace(/v/g, '') : null;
    const prodPublicPath = `https://pkg.fe.indazn.com/${packageJson.name}/lib/${tagVersion}/dist/`;

    return {
        devtool: isProduction ? false : 'source-map',
        mode,
        entry: path.resolve(__dirname, 'src/index.tsx'),
        devServer: {
            hot: true,
            liveReload: true,
            contentBase: outputFolder,
            port,
            publicPath: `/${outputFolder}`,
            open: true,
            inline: true,
            historyApiFallback: true,
            watchOptions: {
                poll: true,
                ignored: /node_modules/,
            },
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
                'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
            },
        },
        output: {
            path: path.resolve(__dirname, outputFolder),
            publicPath: tagVersion ? prodPublicPath : devPublicPath,
            chunkFilename: '[name]_[hash:6].chunk.js',
            filename: 'index.js',
            libraryTarget: 'system',
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: [
                        'babel-loader',
                        {
                            loader: 'ts-loader',
                        },
                    ],
                },
                {
                    test: /\.css$/,
                    use: [
                        isProduction ? MiniCssExtractPlugin.loader : 'style-loader',

                        'css-loader',
                        'postcss-loader',
                    ],
                },
                {
                    test: /\.(jpe?g|png|gif|svg)$/i,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[contenthash].[ext]',
                                outputPath: 'static/assets/',
                            },
                        },
                        {
                            loader: ImageMinimizerPlugin.loader,
                            options: {
                                severityError: 'warning', // Ignore errors on corrupted images
                                minimizerOptions: {
                                    plugins: ['gifsicle'],
                                },
                            },
                        },
                    ],
                },
            ],
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx'],
            plugins: [new TsconfigPathsPlugin()],
        },
        optimization: {
            minimize: isProduction,
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        mangle: true,
                    },
                    extractComments: {
                        condition: /^\**!|@preserve|@license|@cc_on/i,
                        filename: (fileData) =>
                            // The "fileData" argument contains object with "filename", "basename", "query" and "hash"
                            `${fileData.filename}.LICENSE.txt${fileData.query}`,
                        banner: (licenseFile) =>
                            `License information can be found in ${licenseFile}`,
                    },
                }),
            ],
        },
        plugins: [
            new MiniCssExtractPlugin({ filename: '[name].css' }),
            new CleanWebpackPlugin({
                verbose: true,
                // eslint-disable-next-line id-length
                cleanOnceBeforeBuildPatterns: [path.join(outputFullPath, '**/*')],
            }),
            new HtmlWebpackPlugin({
                inject: true,
                hash: true,
                template: path.resolve('./index.html'),
                collapseWhitespace: true,
                version: `v${packageJson.version}`,
            }),
            new webpack.DefinePlugin({
                'process.env': {
                    version: JSON.stringify(packageJson.version),
                    isProduction: JSON.stringify(isProduction),
                },
            }),
        ].filter(Boolean),
    };
};