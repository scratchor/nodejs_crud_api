import path from 'path'
import { dirname } from 'path';
import { fileURLToPath } from 'url'
import NodePolyfillPlugin from "node-polyfill-webpack-plugin"
import ResolveTypeScriptPlugin from "resolve-typescript-plugin";
import Dotenv from 'dotenv-webpack'

const __dirname = dirname(fileURLToPath(import.meta.url));

export default {
    mode: 'production',
    target: 'node',
    entry: './src/index.ts',
    devtool: 'source-map',
    plugins: [
        new Dotenv(),
        new NodePolyfillPlugin(),
    ],
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
        plugins: [new ResolveTypeScriptPlugin()]
    },
    output: {
        filename: 'bundle.cjs',
        path: path.resolve(__dirname, 'dist'),
    },
};
