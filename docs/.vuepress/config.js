const head = require('./config/head/');
const plugins = require('./config/plugins/');
const themeConfig = require('./config/theme/');

module.exports = {
  head,
  plugins,
  themeConfig,

  // theme: 'vdoing', // 使用npm包主题
  theme: require.resolve('../../theme-vdoing'), // 使用本地主题

  title: "MadFour blog",
  description: '未成定局的事，就不要搞得人尽皆知了',
  base: '/', // 格式：'/<仓库名>/'， 默认'/'
  markdown: {
    lineNumbers: true, // 代码行号
  },

}
