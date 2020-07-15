import * as userServices from "../services/user"
import Logger from "../utils/logger"

const app = getApp();
let isCheck = false;

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatTimeTwo(number, format) {

  var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  var returnArr = [];

  var date = new Date(number);
  returnArr.push(date.getFullYear());
  returnArr.push(formatNumber(date.getMonth() + 1));
  returnArr.push(formatNumber(date.getDate()));

  returnArr.push(formatNumber(date.getHours()));
  returnArr.push(formatNumber(date.getMinutes()));
  returnArr.push(formatNumber(date.getSeconds()));

  for (var i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
}


const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const loginCode = async () => {
  // checksession ...
  return new Promise((resolve, reject) => {
    wx.login({
      success(data) {
        resolve(data.code)
      }
    })
  });
}

/**
 * 检测session_key是否过期
 */
const checkSessionKey = async () => {
  return new Promise((resolve, reject) => {
    wx.checkSession({
      success(data) {
        if (data.errMsg === "checkSession:ok") {
          resolve(true);
        } else {
          resolve(false);
        }
      },
      fail() {
        resolve(false);
      }
    })
  });
}
const redirectTo = (url) => {
  if (!app.globalData.token) {
    url = '/pages/login/index';
  }
  wx.redirectTo({
    url: url,
  })
}
/**
 * 权限
 */
const Permission = (fn) => {
  return async function () {
    const openId = wx.getStorageSync('openid');
    try {
      let hasSessionKey = true;
      if (!isCheck) {
        isCheck = true;
        hasSessionKey = await checkSessionKey();
      }
      if (!openId || !hasSessionKey) {
        const wechatCode = await loginCode()
        const { code, data, message } = await userServices.fetchOpenId(wechatCode);
        if (code == 200) {
          const { openid, session_key } = data;
          Logger.info(`换取openid ${openid}   session_key：${session_key}`);
          wx.setStorageSync('openid', openid);
        } else {
          Logger.info(`换取openid异常`, message);
          throw `获取用户openid 接口错误，error message: ${message} file to permission.js line 35`;
        }
      }
      const params = Object.assign({}, ...arguments);
      Logger.info(`用户进入小程序参数`, params);
    } catch (error) {
      Logger.info(`permission.js 换取用户openid异常`, error);
    }
    fn.apply(this, arguments);
  };
}

const showSuccess = (msg) => {
  wx.showToast({
    title: msg,
    icon: 'success',
    duration: 2000
  })
}
const showError = (msg) => {
  wx.showToast({
    title: msg,
    icon:"none",
    duration: 2000
  })
}

module.exports = {
  formatTime: formatTime,
  formatTimeTwo: formatTimeTwo,
  Permission: Permission,
  redirectTo: redirectTo,
  showSuccess:showSuccess,
  showError:showError
}
