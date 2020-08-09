import regeneratorRuntime from '../../utils/regenerator-runtime';
import * as userServices from '../../services/user';
import Logger from '../../utils/logger';
// import cityList from '../../data/area';
import { redirectTo, showSuccess, showError } from '../../utils/util';
// pages/addhouse/index.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // citySelector: false,
    // cityList: cityList,
    // city: null,
    housename: null,
    number: null,
    address: null,
    phone: null,
    disabled: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      phone: app.globalData.phone,
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},
  /**
   * 生命周期函数--监听页面显示
   */

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
  /**
   * @see 提交表单
   * @param {*} e
   */
  addFormSubmit: async function(e) {
    let _this = this;
    let values = e.detail.value;

    if (!_this.validation(values)) {
      showError(_this.data.error);
      return false;
    }
    // 按钮禁用
    _this.setData({
      disabled: true,
    });
    const { code, data, message } = await userServices.fetchAddHouse({
      // // city: values.city,
      number: values.number,
      housename: values.housename,
      address: values.address,
      phone: values.phone,
    });
    if (code == 200) {
      wx.setStorageSync('addmsg', '添加成功！请等待3-5个工作日');
      redirectTo('/pages/houselist/index');
    } else {
      Logger.info('房产添加失败！');
      showError('房产添加失败！');
    }
  },
  // showCityPopup: function() {
  //   this.setData({ citySelector: true });
  // },
  // closeCityPopup: function() {
  //   this.setData({ citySelector: false });
  // },
  // changeCityPopup: function(val) {
  //   console.log(val);
  //   // this.setData({ city: false });
  // },
  validation: function(values) {
    // if (values.city.length < 1) {
    //   this.data.error = '请选择城市';
    //   return false;
    // }
    if (values.housename.length < 1) {
      this.data.error = '小区名称不能为空';
      return false;
    }
    if (values.number.length < 1) {
      this.data.error = '请填写房号';
      return false;
    }
    if (values.address.length < 1) {
      this.data.error = '地址不能为空！';
      return false;
    }
    const reg = /^1[345789]\d{9}$/;
    if (!reg.test(values.phone)) {
      this.data.error = '手机号不正确！';
      return false;
    }
    return true;
  },
});
