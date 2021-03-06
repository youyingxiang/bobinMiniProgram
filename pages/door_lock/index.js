import regeneratorRuntime from '../../utils/regenerator-runtime';
import * as userServices from '../../services/user';
import Logger from '../../utils/logger';
import {
  redirectTo,
  showSuccess,
  showError,
  formatTimeTwo,
} from '../../utils/util';
const app = getApp();
// pages/door_lock/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    houseId: null,
    currentDate: new Date().getTime(),
    show: false,
    currentYearMonth: formatTimeTwo(new Date(), 'Y-M'),
    minDate: new Date(2008, 10, 1).getTime(),
    maxDate: new Date(2050, 10, 1).getTime(),
    doorLockList: {}
  },
  showPopup() {
    this.setData({ show: true });
  },
  onConfirm(event) {
    this.setData({ show: false });
    this.getDoorLockList(formatTimeTwo(event.detail, 'Y-M'));
  },
  onCancel() {
    this.setData({ show: false });
  },
  onChange(event) {
    this.setData({
      activeName: event.detail,
    });
  },
  onInput(event) {
    this.setData({
      currentDate: event.detail,
      currentYearMonth: formatTimeTwo(event.detail, 'Y-M'),
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.houseId = options.house_id
    this.getDoorLockList(this.data.currentYearMonth, options.house_id)
  },
  /**
   * 
   * @param {*} date 
   * @param {*} houseid 
   */
  getDoorLockList: async function (date, houseid) {
    houseid = houseid ? houseid : this.data.houseId;
    const { code, data, message } = await userServices.fetchGetDoorLockList({
      date: date,
      houseid: houseid,
    });
    if (code === 200) {
      this.setData({
        doorLockList: data,
      });
    }
    //console.log(data)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})