class Logger {
  constructor(){
    this.loggerManager = wx.getLogManager({level: 1});
  }

  info(params) {
    this.loggerManager.info('********* info', params);
  }

  log(params) {
    this.loggerManager.log('********* log', params);
  }
}

export default new Logger();
