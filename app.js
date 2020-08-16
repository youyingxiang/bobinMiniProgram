//app.js
import * as userServices from './services/user';
import Logger from './utils/logger';
App({
  data: {
    webviewIsShowed: false,
  },
  onHide() {
    this.data.webviewIsShowed = false;
  },
  onLaunch: function() {
    this.globalData.token = wx.getStorageSync('token');
    this.globalData.phone = wx.getStorageSync('phone');
    Logger.info('进入小程序开始写日志');
  },
  globalData: {
    userInfo: null,
    token: null,
    phone: null,
  },
});
