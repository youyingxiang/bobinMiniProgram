import regeneratorRuntime from '../utils/regenerator-runtime';
import http from '../utils/http';
import request from '../utils/request';
import {
  AUTHORIZATIONCODE,
  GETUSERINFOBYECODE,
  GETUSERINFO,
  ADDHOUSE,
  HOUSELIST,
  HOUSE,
  INCOME,
  USERRESERVE,
  USERRESERVELIST,
  FREEDAYLIST,
  GETPHONE,
  GETRESERVEDETAIL,
  GETDOORLOCKLIST,
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
      return request.success(data);
    })
    .catch((error) => request.error(error));
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
    .catch((error) => request.error(error));
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
    .catch((error) => request.error(error));
};

const fetchAddHouse = ({ housename, address, phone }) => {
  return http
    .post(ADDHOUSE, {
      housename,
      address,
      phone,
    })
    .then(({ data }) => {
      return request.success(data);
    })
    .catch((error) => request.error(error));
};

const fetchGetHouseList = () => {
  return http
    .get(HOUSELIST)
    .then(({ data }) => {
      return request.success(data);
    })
    .catch((error) => request.error(error));
};

const fetchGetIncome = ({ date, houseid }) => {
  return http
    .get(INCOME, {
      date,
      houseid,
    })
    .then(({ data }) => {
      return request.success(data);
    })
    .catch((error) => request.error(error));
};

const fetchGetHouse = ({ houseid }) => {
  return http
    .get(HOUSE, {
      houseid,
    })
    .then(({ data }) => {
      return request.success(data);
    })
    .catch((error) => request.error(error));
};
/**
 *
 * @param
 */
const fetchGetUserReserve = ({ city, start_time, end_time, num, memo }) => {
  return http
    .post(USERRESERVE, {
      city,
      start_time,
      end_time,
      num,
      memo,
    })
    .then(({ data }) => {
      return request.success(data);
    })
    .catch((error) => request.error(error));
};

const fetchGetUserReserveList = (status) => {
  return http
    .get(USERRESERVELIST, { status: status.join(',') })
    .then(({ data }) => {
      return request.success(data);
    })
    .catch((error) => request.error(error));
};

const fetchGetFreeDayList = () => {
  return http
    .get(FREEDAYLIST)
    .then(({ data }) => {
      return request.success(data);
    })
    .catch((error) => request.error(error));
};

const fetchGetPhone = ({ encryptedData, iv }) => {
  return http
    .post(GETPHONE, {
      encryptedData,
      iv,
    })
    .then(({ data }) => {
      return request.success(data);
    })
    .catch((error) => request.error(error));
};

const fetchGetReserveDetail = ({ date, houseid }) => {
  return http
    .get(GETRESERVEDETAIL, {
      date,
      houseid,
    })
    .then(({ data }) => {
      return request.success(data);
    })
    .catch((error) => request.error(error));
};

const fetchGetDoorLockList = ({ date, houseid }) => {
  return http
    .get(GETDOORLOCKLIST, {
      date,
      houseid,
    })
    .then(({ data }) => {
      return request.success(data);
    })
    .catch((error) => request.error(error));
};

export {
  fetchOpenId,
  fetchUserInfoByEcode,
  fetchUserInfo,
  fetchAddHouse,
  fetchGetHouse,
  fetchGetHouseList,
  fetchGetIncome,
  fetchGetUserReserve,
  fetchGetUserReserveList,
  fetchGetFreeDayList,
  fetchGetPhone,
  fetchGetReserveDetail,
  fetchGetDoorLockList,
};
