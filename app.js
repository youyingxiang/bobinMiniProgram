//app.js
import * as userServices from './services/user';
import Logger from "./utils/logger"
App({
  onLaunch: function () {
    this.globalData.token = wx.getStorageSync('token');
    Logger.info("进入小程序开始写日志");
  },
  globalData: {
    userInfo: null,
    token: null
  }
})