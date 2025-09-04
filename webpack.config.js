import path from 'path';
import { fileURLToPath } from 'url';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export default [{
    mode: 'development',
    entry: './src/index.ts',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        fallback: {
            assert: require.resolve('assert'),
            process: require.resolve('process/browser.js'),
        }
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
        }),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
    ],
    devServer: {
        static: './dist',
        port: 8084,
        open: true,
        hot: true,
        watchFiles: ['./public/index.html', './src/**/*.ts']
    },
},
    {
        name: 'cli',
        mode: 'production',
        entry: './src/cli.ts',
        output: {
            filename: 'cli.js',
            path: path.resolve('dist_cli'),
            library: { type: 'module' },
        },
        resolve: { extensions: ['.ts', '.js'] },
        module: {
            rules: [{ test: /\.ts$/, use: 'ts-loader' }],
        },
        target: 'node',
        experiments: {
            outputModule: true
        }
    }];
