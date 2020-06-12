var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.config.common.js');
var ngw = require('@ngtools/webpack');

const path = require('path');

/*
To call a deployed API, clients submit requests to the URL for the API Gateway component service for API execution, 
known as execute-api.
The base URL for REST APIs is in the following format:

https://{restapi_id}.execute-api.{region}.amazonaws.com/{stage_name}/

where {restapi_id} is the API identifier, {region} is the Region, and {stage_name} 
is the stage name of the API deployment.
*/
const API_ROOT = 'https://49r8vqv0y9.execute-api.us-east-1.amazonaws.com'; // CHANGE THIS TO MATCH THE URL OF YOUR API GATEWAY API OR YOUR CUSTOM DOMAIN FOR API
const STAGE = '/prod'; // CHANGE THIS TO MATCH THE STAGE OF YOUR API OR BASEPATH OF YOUR CUSTOM DOMAIN FOR API e.g. /prod OR /v1
const METADATA = webpackMerge(commonConfig.metadata, {
    API_ROOT: API_ROOT,
    STAGE: STAGE
});

module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    'app': './src/app/main.aot.ts'
  },
  output: {
    path: path.resolve(__dirname, './public/scripts/app'),
    publicPath: '/scripts/app',
    filename: 'bundle.js',
    chunkFilename: '[id].[hash].chunk.js'
  },
  module: {
    rules: [
      {
        test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
        loader: '@ngtools/webpack'
      },
      {
        test: /\.ts$/,
        use: [
          { loader: 'awesome-typescript-loader' },
          { loader: 'angular2-template-loader' },
          // {loader: 'angular-router-loader?aot=true'}
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'API_ROOT': JSON.stringify(METADATA.API_ROOT),
      'STAGE': JSON.stringify(METADATA.STAGE)
    }),
    new ngw.AngularCompilerPlugin({
      tsConfigPath: './tsconfig.aot.json',
      entryModule: './src/app/app.module#AppModule'
    })
  ]
});
