// 目录页配置 文档
// https://xugaoyi.github.io/vuepress-theme-vdoing-doc/pages/54651a/


const WebNav = require("./WebNav");
const ToolNav = require("./ToolNav");
const MeshNav = require("./MeshNav");
const OtherNav = require("./OtherNav");

module.exports = [
  { text: '首页', link: '/' },
  WebNav, // 前端导航
  MeshNav, // 网络导航
  ToolNav,  // 工具导航
  OtherNav, // 其它
  {
    text: '索引',
    link: '/archives/',
    items: [
      { text: '分类', link: '/categories/' },
      { text: '标签', link: '/tags/' },
      { text: '归档', link: '/archives/' },
    ],
  }
]
