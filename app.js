//app.js
import * as userServices from './services/user';
import Logger from "./utils/logger"
App({
  onLaunch: function () {
    this.globalData.token = wx.getStorageSync('token');
  },
  globalData: {
    userInfo: null,
    token: null
  }
})