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
    houseList: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHouseList();
  },
  /**
   * @see 预览图片
   * @param {*} event 
   */
  previewImage: function (event) {
    console.log(event.currentTarget.dataset.img);
    const fileName = event.currentTarget.dataset.img;
    const suffixIndex = fileName.lastIndexOf(".");
    const suffix = fileName.substring(suffixIndex + 1).toUpperCase();
    if (suffix == "BMP" || suffix == "JPG" || suffix == "JPEG" || suffix == "PNG" || suffix == "GIF") {
      wx.previewImage({
        urls: [fileName]
      })
    } else {
      wx.showLoading({
        title: '加载中',
      })
      wx.downloadFile({
        // 示例 url，并非真实存在
        url: event.currentTarget.dataset.img,
        success: function (res) {
          const filePath = res.tempFilePath
          wx.openDocument({
            filePath: filePath,
            success: function (res) {
              console.log('打开文档成功')
            },
            complete: () => {
              wx.hideLoading();
            }
          })
        }
      })
    }
  },
  getHouseList: async function () {
    const { code, data, message } = await userServices.fetchGetHouseList()
    if (code == 200) {
      this.setData({
        houseList: data
      });
    }
  },

  addHouse: function () {
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