// pages/houselist/index.js
import regeneratorRuntime from '../../utils/regenerator-runtime';
import * as userServices from '../../services/user';
import Logger from "../../utils/logger";
import { redirectTo, showSuccess, showError } from '../../utils/util';
// pages/addhouse/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      houseList:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.getHouseList();
  },

  getHouseList: async function () {
      const {code,data,message} = await userServices.fetchGetHouseList()
      if (code == 200) {
          this.setData({
            houseList:data
          });
      }
  },

  addHouse:function() {
    redirectTo("/pages/addhouse/index")
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