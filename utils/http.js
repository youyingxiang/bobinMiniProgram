import { BASE_URL } from '../config';
import Logger from './logger';
/**
 * http 请求
 */
const request = (url, params, method, header) => {
  const token = wx.getStorageSync('token');
  const openid = wx.getStorageSync('openid');
  const httpUrl = url.indexOf('http') >= 0 ? url : `${BASE_URL}${url}`;
  Logger.info(`requestUrl: ${httpUrl}， params：${JSON.stringify(params)}，token：${token}`);
  return new Promise((resolve, reject) => {
    wx.request({
      url: httpUrl,
      method: method,
      header: Object.assign(
        {
          Openid:openid,
          Token: token,
        },
        header || {}
      ),
      data: params || {},
      success: ({ data = {} }) => {
        
        if (data.errcode == 0 || data.code == 200) {
          Logger.info(`request:success ${httpUrl}，result：${JSON.stringify(data)}`);
          resolve({
            code: 200,
            data: data.data,
            message: ''
          });
        } else {
          Logger.info(`request:fail ${httpUrl}，result：${JSON.stringify(data)}`);
          reject({
            code: 500,
            data: {},
            message: data.errmsg
          });
        }
      },
      fail: error => {
        Logger.info(`request:error ${httpUrl}，error：${JSON.stringify(error)}`);
        reject({
          code: 500,
          data: {},
          message: '请求异常'
        });
      }
    });
  });
};

const post = (url, params) => {
  return request(url, params, 'POST', {
    'Content-Type': 'application/x-www-form-urlencoded'
  });
};

const get = (url, params) => {
  return request(url, params, 'GET', {});
};

export default {
  post,
  get
};
