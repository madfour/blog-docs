const nav = require('../nav/');
const blogConfig = require('./blogConfig');
// const htmlModules = require('../htmlModules');

// 主题配置
module.exports = Object.assign({}, blogConfig, {
  nav,
  // htmlModules, // 插入hmtl(广告)模块

  logo: '/Rubick.png', // 导航栏logo
  repo: 'https://github.com/madfour/blog-docs', // 导航栏右侧生成Github链接

  blogger: {
    // 博主信息，显示在首页侧边栏
    avatar: '/Rubick.png',
    name: 'MadFour',
    slogan: '认真学习 砥砺前行',
  },

  // 侧边栏  'structuring' | { mode: 'structuring', collapsable: Boolean} | 'auto' | 自定义   
  // 提示：目录页数据依赖于结构化的侧边栏数据，如果你不设置为'structuring',将无法使用目录页
  sidebar: 'structuring',

  author: {
    // 文章默认的作者信息，可在md文件中单独配置此信息 String | {name: String, link: String}
    name: 'madfour', // 必需
    link: 'https://github.com/madfour', // 可选的
  },

  footer: { // 页脚信息
    createYear: 2020, // 博客创建年份
    copyrightInfo: '<a href="https://github.com/madfour" target="_blank">MadFour</a>', // 博客版权信息，支持a标签
  },

  social: {
    // 社交图标，显示于博主信息栏和页脚栏
    // iconfontCssFile: '//at.alicdn.com/t/font_1678482_u4nrnp8xp6g.css', // 可选，阿里图标库在线css文件地址，对于主题没有的图标可自由添加
    icons: [
      {
        iconClass: 'icon-youjian',
        title: '发邮件',
        link: 'mailto:873912205@qq.com',
      },
      {
        iconClass: 'icon-github',
        title: 'GitHub',
        link: 'https://github.com/madfour',
      },
      {
        iconClass: 'icon-erji',
        title: '听音乐',
        link: 'https://music.163.com/#/discover',
      },
    ],
  }

})