// 工具导航栏
module.exports = {
  text: '工具', link: '/tool/',
  items: [
    {
      text: '命令',
      items: [
        { text: 'Git', link: '/git/' },
        { text: 'NPM', link: '/npm/' },
        { text: 'Mac', link: '/mac/' }
      ]
    },
    // {
    //   text: '部署',
    //   items: [
    //     { text: 'Linux', link: '/linux/' },
    //     { text: 'Docker', link: '/docker/' },
    //   ]
    // },
  ]
}