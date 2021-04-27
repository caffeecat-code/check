// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null,
    status: null,
    token: "9e77655",
    user:null,
    userType: "admin",
    IMG_URL: 'https://wx.hngayjy.com/maintainSystem/upload/',  //图片地址前缀
    BASE_URL: 'https://wx.hngayjy.com/maintainSystem', // 设置全局 URL   真实环境设ip
  }
})
