import { defineConfig } from "umi";
import routes from './config/router';

export default defineConfig({
  routes,
  outputPath: "big-model",
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/', //   ./允许通过file协议打开(配合hash: true,,history:hash)
  hash: true,
  history: {
    type: 'hash'
  },
  reactQuery: {},
  npmClient: 'pnpm',
  esbuildMinifyIIFE: true,
  plugins: [
    '@umijs/plugins/dist/initial-state',
    '@umijs/plugins/dist/model',
    '@umijs/plugins/dist/react-query',
    '@umijs/plugins/dist/request'
  ],
  initialState: {},
  model: {},
  title: '灵眸大模型一体推理平台',
  favicons: ['./favicon.svg'],
  headScripts: [
    { src: './config.js' },
  ],
  proxy: {
    '/api': {
      'target': 'http://172.16.10.220:30844',
      'changeOrigin': true,
      'pathRewrite': { '^/api' : '' },
    },
    // '/bigIntelligence': {
    //   //target: 'http://168.170.80.64', // 后端接口的域名
    //   target: 'http://192.168.2.20/api7', // 后端接口的域名
    //   changeOrigin: true,
    //   //pathRewrite rewrite: path => path.replace(/^\/api/, ''),
    // },
  },
});
