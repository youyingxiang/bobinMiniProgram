// pages/houselist/index.js
import regeneratorRuntime from '../../utils/regenerator-runtime';
import * as userServices from '../../services/user';
import Logger from "../../utils/logger";
import { redirectTo, showSuccess, showError, formatTimeTwo } from '../../utils/util';
// pages/addhouse/index.js
const app = getApp();

// pages/income/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentDate: new Date().getTime(),
    minDate: new Date().getTime(),
    show: false,
    currentYearMonth: formatTimeTwo(new Date(), "Y-M"),
    income: null,
    minDate: new Date(2008,10,1).getTime(),
    maxDate: new Date(2050, 10, 1).getTime(),
   // activeName: '1',
  },
  onInput(event) {
    this.setData({
      currentDate: event.detail,
      currentYearMonth: formatTimeTwo(event.detail, "Y-M"),
    });
  },
  showPopup() {
    this.setData({ show: true });
  },
  onConfirm(event) {
    this.getIncome(formatTimeTwo(event.detail, "Y-M"))
    this.setData({ show: false });
  },
  onCancel() {
    this.setData({ show: false });
  },
  onChange(event) {
    this.setData({
      activeName: event.detail,
    });
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getIncome(this.data.currentYearMonth)
  },

  getIncome: async function (date) {
    const { code, data, message } = await userServices.fetchGetIncome({ date: date })
    if (code === 200) {
      this.setData({
        income: data
      })
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