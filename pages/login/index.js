import regeneratorRuntime from '../../utils/regenerator-runtime';
import * as userServices from '../../services/user';
import Logger from "../../utils/logger"
import { Permission } from '../../utils/util';
const app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        code: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: Permission(function (options) {

    }),

    // _getuserinfo: async function() {
    //     return "123";
    // },

    getuserinfo: async function (res) {
        if (res.detail.userInfo) {
            //用户按了允许授权按钮
            const { code, data, message } = await userServices.fetchUserInfoByEcode({ encryptedData: res.detail.encryptedData, iv: res.detail.iv })
            if (code == 200) {
                const { token } = data;
                app.globalData.token = token;
                wx.setStorageSync('token', token)
                wx.redirectTo({
                    url: '/pages/index/index',
                })
            } else {
                Logger.info(`getuserinfo 解密用户信息失败`);
            }

        } else {
            //用户按了拒绝按钮

            wx.showModal({

                title: '警告',

                content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',

                showCancel: false,

                confirmText: '返回授权',

                success: function (res) {

                    // 用户没有授权成功，不需要改变 isHide 的值

                    if (res.confirm) {

                        console.log('用户点击了“返回授权”');

                    }

                }

            });

        }



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