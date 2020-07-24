// pages/housereserve/index.js
import regeneratorRuntime from '../../utils/regenerator-runtime';
import * as userServices from '../../services/user';
import Logger from "../../utils/logger";
import { redirectTo, showSuccess, showError, formatTimeTwo } from '../../utils/util';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    minDate: new Date(2008, 10, 1).getTime(),
    maxDate: new Date(2050, 10, 1).getTime(),
    currentDate: new Date().getTime(),
    startTime: formatTimeTwo(new Date().getTime(), "Y-M-D"),
    endTime: formatTimeTwo(new Date().getTime(), "Y-M-D"),
    clickName: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  showPopup(event) {
    this.data.clickName = event.currentTarget.dataset['name']
    this.setData({ show: true });
  },

  onConfirm(event) {
    //this.getIncome(formatTimeTwo(event.detail, "Y-M-D"))
    this.setData({ show: false });
  },
  onCancel() {
    this.setData({ show: false });
  },

  onInput(event) {
    if (this.data.clickName == 'start_time') {
      this.setData({
        currentDate: event.detail,
        startTime: formatTimeTwo(event.detail, "Y-M-D"),
      });
    } else {
      this.setData({
        currentDate: event.detail,
        endTime: formatTimeTwo(event.detail, "Y-M-D"),
      });
    }

  },
  addFormSubmit: async function (e) {
    let _this = this;
    let values = e.detail.value;
    console.log(values);
    if (!_this.validation(values)) {
      showError(_this.data.error);
      return false;
    }
    // 按钮禁用
    _this.setData({
      disabled: true
    });
    const { code, data, message } = await userServices.fetchGetUserReserve({
      city:values.city,
      start_time:values.start_time,
      end_time:values.end_time,
      num:values.num,
      other:values.other
    })
    if (code == 200) {
      redirectTo('/pages/reservelist/index')
    } else {
      Logger.info("房源添加失败！")
      showError("房源添加失败！")
    }
  },

  validation: function (values) {
    if (values.city.length < 1) {
      this.data.error = '城市名称不能为空';
      return false;
    }
    if (values.start_time.length < 1) {
      this.data.error = '入住时间不能为空！';
      return false;
    }
    if (values.end_time.length < 1) {
      this.data.error = '离店时间不能为空！';
      return false;
    }
    if (values.num.length < 1) {
      this.data.error = '预定房间数量不能为空！';
      return false;
    }
    if (values.other.length < 1) {
      this.data.error = '备注不能为空！';
      return false;
    }

    return true;
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