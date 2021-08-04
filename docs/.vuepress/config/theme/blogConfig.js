
// 博客配置
module.exports = {
  sidebarDepth: 2, // 侧边栏显示深度，默认1，最大2（显示到h3标题）
  searchMaxSuggestions: 10, // 搜索结果显示最大数
  lastUpdated: '上次更新', // 开启更新时间，并配置前缀文字   string | boolean (取值为git提交时间)
  docsDir: 'docs', // 编辑的文件夹
  // editLinks: true, // 启用编辑
  editLinkText: '编辑',


  //*** 以下配置是Vdoing主题改动和新增的配置 ***//

  // category: false, // 是否打开分类功能，默认true。 如打开，会做的事情有：1. 自动生成的frontmatter包含分类字段 2.页面中显示与分类相关的信息和模块 3.自动生成分类页面（在@pages文件夹）。如关闭，则反之。

  // tag: false, // 是否打开标签功能，默认true。 如打开，会做的事情有：1. 自动生成的frontmatter包含标签字段 2.页面中显示与标签相关的信息和模块 3.自动生成标签页面（在@pages文件夹）。如关闭，则反之。

  // archive: false, // 是否打开归档功能，默认true。 如打开，会做的事情有：1.自动生成归档页面（在@pages文件夹）。如关闭，则反之。

  // (madfour: 本blog已经删除_posts文件夹)
  // categoryText: '随笔', // 碎片化文章（_posts文件夹的文章）预设生成的分类值，默认'随笔' 

  // bodyBgImg: [
  //   'https://cdn.jsdelivr.net/gh/xugaoyi/image_store/blog/20200507175828.jpeg',
  //   'https://cdn.jsdelivr.net/gh/xugaoyi/image_store/blog/20200507175845.jpeg',
  //   'https://cdn.jsdelivr.net/gh/xugaoyi/image_store/blog/20200507175846.jpeg'
  // ], // body背景大图，默认无。 单张图片 String || 多张图片 Array, 多张图片时每隔15秒换一张。
  // bodyBgImgOpacity: 0.5, // body背景图透明度，选值 0 ~ 1.0, 默认0.5

  // titleBadge: false, // 文章标题前的图标是否显示，默认true
  // titleBadgeIcons: [ // 文章标题前图标的地址，默认主题内置图标
  //   '图标地址1',
  //   '图标地址2'
  // ],
  // contentBgStyle: 1, // 文章内容块的背景风格，默认无. 1 => 方格 | 2 => 横线 | 3 => 竖线 | 4 => 左斜线 | 5 => 右斜线 | 6 => 点状

  updateBar: { // 最近更新栏
    showToArticle: true, // 显示到文章页底部，默认true
    moreArticle: '/archives' // “更多文章”跳转的页面，默认'/archives'
  }
  // rightMenuBar: false, // 是否显示右侧文章大纲栏，默认true (屏宽小于1300px下无论如何都不显示)
  // sidebarOpen: false, // 初始状态是否打开侧边栏，默认true
  // pageButton: false, // 是否显示快捷翻页按钮，默认true
}
