export default class request {
  static success(data) {
    return {
      code: 200,
      data: data,
      message: '成功'
    };
  }

  static error(error) {
    return {
      code: error.code,
      data: {},
      message: error.message
    };
  }

  static fail(message) {
    return {
      code: 500,
      data: {},
      message: message
    };
  }
}
