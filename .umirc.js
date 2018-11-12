import { resolve } from 'path';

export default {
  "plugins": [
    ['umi-plugin-react', {
      dva: true,
      antd: true,  // antd 默认不开启，如有使用需自行配置
    }]
  ],
  //"hashHistory": true,
  "history": 'hash',
  "alias": {
    src: resolve(__dirname, 'src'),
    // assets: resolve(__dirname, 'src/assets'),
    common: resolve(__dirname, 'src/common'),
    components: resolve(__dirname, 'src/components'),
    layouts: resolve(__dirname, 'src/layouts'),
    models: resolve(__dirname, 'src/models'),
    pages: resolve(__dirname, 'src/pages'),
    plugins: resolve(__dirname, 'src/plugins'),
    services: resolve(__dirname, 'src/services'),
    utils: resolve(__dirname, 'src/utils'),
  },
  //  devtool: false,
  "devtool": 'inline-source-map',

  "proxy": {
    "/api": {
      // "target": "http://39.108.74.193:8700/v1/",
      "target": "http://localhost:8700/v1/",
      "changeOrigin": true,
      "pathRewrite": { "^/api": "" }
    }
  }
};
