Component({
  data: {
    active: 0,
    list: [
      {
        name: 'home',
        icon: 'wap-home-o',
        text: '首页',
        url: '/pages/home/index',
      },
      {
        name: 'msg',
        icon: 'user-circle-o',
        text: '我的',
        url: '/pages/index/index',
      },
    ],
  },

  methods: {
    onChange(event) {
      this.setData({ active: event.detail });
      wx.switchTab({
        url: this.data.list[event.detail].url,
      });
    },

    init() {
      const page = getCurrentPages().pop();
      this.setData({
        active: this.data.list.findIndex(
          (item) => item.url === `/${page.route}`
        ),
      });
    },
  },
});
