//index.js
import regeneratorRuntime from '../../utils/regenerator-runtime';
import * as userServices from '../../services/user';
import Logger from "../../utils/logger";
import { redirectTo } from '../../utils/util';
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: null,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },



  onLoad: function () {

  },

  onShow: function () {
    this.fetchUserInfo();
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    }
  },

  addHouse: function (e) {
    redirectTo('/pages/addhouse/index')
  },
  houseList: function (e) {
    redirectTo('/pages/houselist/index')
  },
  queryIncome: function (e) {
    redirectTo('/pages/income/index')
  },
  houseReserve: function (e) {
    redirectTo('/pages/reservelist/index')
  },

  fetchUserInfo: async function () {
    const { code, data, message } = await userServices.fetchUserInfo()
    if (code === 200) {
      app.globalData.userInfo = data
      app.globalData.phone = data.phone
      console.log(app.globalData.userInfo)
      this.setData({
        userInfo: data,
        hasUserInfo: true
      })
    } else {
      Logger.info(`fetchUserInfo 获取用户信息失败`);
    }
  },

  call: function () {
    wx.makePhoneCall({
      phoneNumber: '1340000' //仅为示例，并非真实的电话号码
    })
  },

})
