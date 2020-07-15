Component({
	data: {
		active: 0,
		list: [
			{
				name: 'home',
				icon: 'home-o',
				text: '首页',
				url: '/pages/index/index'
			},
			{
				name: 'msg',
				icon: 'after-sale',
				text: '业主须知',
				url: '/pages/notice/index'
			}
		]
	},

	methods: {
		onChange(event) {
			this.setData({ active: event.detail });
			wx.switchTab({
				url: this.data.list[event.detail].url
			});
		},

		init() {
			const page = getCurrentPages().pop();
			this.setData({
				active: this.data.list.findIndex(item => item.url === `/${page.route}`)
			});
		}
	}
});
