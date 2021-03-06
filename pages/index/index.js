//index.js
import regeneratorRuntime from '../../utils/regenerator-runtime';
import * as userServices from '../../services/user';
import Logger from '../../utils/logger';
import { redirectTo } from '../../utils/util';
//获取应用实例
const app = getApp();

Page({
  data: {
    userInfo: null,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    appId: 'wx8abaf00ee8c3202e',
    extraData: {
      id: '191841',
    },
  },

  onLoad: function() {},

  onShow: function() {
    this.getTabBar().init();
    this.fetchUserInfo();
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
      });
    }
  },

  addHouse: function(e) {
    redirectTo('/pages/addhouse/index');
  },
  houseList: function(e) {
    redirectTo('/pages/houselist/index');
  },
  queryIncome: function(e) {
    redirectTo('/pages/income/index');
  },
  houseReserve: function(e) {
    redirectTo('/pages/reservelist/index');
  },

  fetchUserInfo: async function() {
    const { code, data, message } = await userServices.fetchUserInfo();
    if (code === 200) {
      app.globalData.userInfo = data;
      app.globalData.phone = data.phone;
      console.log(app.globalData.userInfo);
      this.setData({
        userInfo: data,
        hasUserInfo: true,
      });
    } else {
      Logger.info(`fetchUserInfo 获取用户信息失败`);
    }
  },

  call: function() {
    wx.makePhoneCall({
      phoneNumber: '1340000', //仅为示例，并非真实的电话号码
    });
  },
  goToHelpCenter: function() {
    const Tucao = requirePlugin('tucao').default;
    const userInfo = {
      productId: 191841,
      avatar: app.globalData.avatar,
      nickname: app.globalData.nickname,
      phone: app.globalData.phone,
      openid: wx.getStorageSync('openid'),
    };

    var url = Tucao.getUrl(userInfo);
    console.log(url);
    wx.navigateTo({
      url: url,
    });
  },
});
