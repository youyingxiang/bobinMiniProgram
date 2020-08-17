// pages/reservelist/index.js
// pages/houselist/index.js
import regeneratorRuntime from '../../utils/regenerator-runtime';
import * as userServices from '../../services/user';
import Logger from '../../utils/logger';
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
import {
  redirectTo,
  showSuccess,
  showError,
  getStorageFlash,
} from '../../utils/util';
// pages/addhouse/index.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    freeDayList: [],
    userInfo: null,
    userReverseList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getUserReverseList(this.data.active);
    this.getFreeDayList();
    let reservemsg = getStorageFlash('reservemsg');
    if (reservemsg) {
      Toast.success(reservemsg);
    }
  },

  getUserReverseList: async function(index) {
    const { code, data, message } = await userServices.fetchGetUserReserveList(
      index === 1 ? [1, 2] : [0]
    );
    if (code == 200) {
      this.setData({
        userReverseList: data,
      });
    }
  },

  getFreeDayList: function() {
    userServices.fetchGetFreeDayList().then(({ code, data, message }) => {
      if (code == 200) {
        this.setData({
          freeDayList: data,
        });
      }
    });
  },

  userReverse: function() {
    redirectTo('/pages/housereserve/index');
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
      });
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {},

  onTabChange(event) {
    this.setData({ active: event.detail.index });
    this.getUserReverseList(event.detail.index);
  },
});
