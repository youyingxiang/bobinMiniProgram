import regeneratorRuntime from '../utils/regenerator-runtime';
import http from '../utils/http';
import request from '../utils/request';
import {
  AUTHORIZATIONCODE,
  GETUSERINFOBYECODE,
  GETUSERINFO,
  ADDHOUSE,
  HOUSELIST,
  INCOME,
  USERRESERVE,
  USERRESERVELIST
} from '../path';

/**
 * @see 获取opnid
 * @param {*} code 
 */
const fetchOpenId = (code) => {
  return http
    .post(AUTHORIZATIONCODE, {
      code: code,
    })
    .then(({ data }) => {
      return request.success(data)
    })
    .catch(error => request.error(error));
};


/**
 * @see 解密用户信息
 * @param {*} param0 
 */
const fetchUserInfoByEcode = ({ encryptedData, iv }) => {
  return http
    .post(GETUSERINFOBYECODE, {
      encryptedData,
      iv,
    })
    .then(({ data }) => {
      return request.success(data);
    })
    .catch(error => request.error(error));
};
/**
 * @see 获取用户信息
 */
const fetchUserInfo = () => {
  return http
    .get(GETUSERINFO)
    .then(({ data }) => {
      return request.success(data);
    })
    .catch(error => request.error(error));
};

const fetchAddHouse = ({ housename, address, phone }) => {
  return http
    .post(ADDHOUSE, {
      housename,
      address,
      phone
    })
    .then(({ data }) => {
      return request.success(data);
    })
    .catch(error => request.error(error));
};

const fetchGetHouseList = () => {
  return http
    .get(HOUSELIST)
    .then(({ data }) => {
      return request.success(data);
    })
    .catch(error => request.error(error));
};

const fetchGetIncome = ({ date }) => {
  return http
    .get(INCOME, {
      date
    })
    .then(({ data }) => {
      return request.success(data);
    })
    .catch(error => request.error(error));
};
/**
 * 
 * @param 
 */
const fetchGetUserReserve = ({ city, start_time, end_time, num, other }) => {
  return http
    .post(USERRESERVE
      , {
        city,
        start_time,
        end_time,
        num,
        other
      })
    .then(({ data }) => {
      return request.success(data);
    })
    .catch(error => request.error(error));
}

const fetchGetUserReserveList = () => {
  return http
    .get(USERRESERVELIST)
    .then(({ data }) => {
      return request.success(data);
    })
    .catch(error => request.error(error));
};

export {
  fetchOpenId,
  fetchUserInfoByEcode,
  fetchUserInfo,
  fetchAddHouse,
  fetchGetHouseList,
  fetchGetIncome,
  fetchGetUserReserve,
  fetchGetUserReserveList,
}