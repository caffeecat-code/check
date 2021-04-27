// pages/my/changePhone/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oldPhone:0,
    newPhone:0,
    code:0
  },
  //获取用户输入的新号码
  userNewPhone:function(e)
  {
    this.setData({
      newPhone: e.detail.value
    })
  },
  //获取用户输入的验证码
  loginBtnClick: function (e) {
    console.log(e.detail)
    this.setData({
      code: e.detail.value
    })
  },
  //发送验证码
  sendCheck(){
    // var token = "b0aacc03-6f7d-4574-8e5b-a20a7e6607e2";
    let token = app.globalData.token;
    let newPhone = this.data.newPhone;
    let oldPhone = app.globalData.user.phone;
    //var oldPhone = 11012341001;
    let userType = app.globalData.userType;
    //var userType = "admin";
    console.log(oldPhone)
    wx.request({
      url: app.globalData.BASE_URL + '/admin/adminUpdatePhoneCode',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data:{
        token:token,
        userType:userType,
        newPhone:newPhone,
        phone:oldPhone
      },
      success (res) {
        if(res.data == 1){
          wx.showToast({
            title: '发送成功',
            icon: 'none',
            duration: 1000
          });
        }else if(res.data == 2){
          wx.showToast({
            title: '发送失败！',
            icon: 'none',
            duration: 1000
          });
        }else if(res.data == 444){
          wx.showToast({
            title: '登录过期！',
            icon: 'none',
            duration: 1000
          });
          wx.navigateTo({
            url:   "/pages/login/index",
          })
        }else{
          wx.showToast({
            title: '未知错误',
            icon: 'none',
            duration: 1000
          });
        }
      },
      fail (res){

      }
    })
  },
  submit(){
    console.log(this.data.code)
    wx.request({
      url: app.globalData.BASE_URL + '/admin/adminUpdatePhoneCode',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data:{
        token:app.globalData.token,
        userType:app.globalData.userType,
        id:app.globalData.user.id,
        phone:app.globalData.user.phone,
        newPhone:this.data.newPhone,
        code:this.data.code
      },
      success (res) {
        console.log(res)
        if(res.data == 1){
          wx.showToast({
            title: '修改成功',
            icon: 'none',
            duration: 1000
          });
        }else if(res.data == 2){
          wx.showToast({
            title: '修改失败！',
            icon: 'none',
            duration: 1000
          });
        }else if(res.data == 3){
          wx.showToast({
            title: '验证码错误！',
            icon: 'none',
            duration: 1000
          });
        }else if(res.data == 444){
          wx.showToast({
            title: '登录过期！',
            icon: 'none',
            duration: 1000
          });
          wx.navigateTo({
            url:   "/pages/login/index?flag=invalid",
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
