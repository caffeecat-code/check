// pages/my/changePhone/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    password:0,
    surePassword:0,
    code:0
  },
  checkPass(){//检查密码是否一致
    //验证密码
    if(this.data.password == ""){
      return false;
    }
    if(this.data.password == this.surePassword){
      return false;
    }
    return true;
  },
  //获取用户输入的新号码
  userPassword:function(e)
  {
    this.setData({
      password: e.detail.value
    })
  },
  //获取用户输入的验证码
  loginBtnClick: function (e) {
    this.setData({
      code: e.detail.value
    })
  },
  //发送验证码
  sendCheck(){
    // var token = "b0aacc03-6f7d-4574-8e5b-a20a7e6607e2";
    //var oldPhone = 11012341001;
    //var userType = "admin";
    wx.request({
      url: app.globalData.BASE_URL + '/admin/adminUpdatePasswordCode',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data:{
        token:app.globalData.token,
        userType:app.globalData.userType,
        phone:app.globalData.user.phone
      },
      success (res) {
        console.log(res)
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
            url:   "/pages/login/index?flag=invalid",
          })
        }
      },
      fail (res){

      }
    })
  },
  submit(){
    if(!this.checkPass()){
      wx.showToast({
        title: '请检查密码',
        icon: 'none',
        duration: 1000
      });
      return false;
    }
    wx.request({
      url: app.globalData.BASE_URL + '/admin/adminUpdatePassword',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data:{
        token:app.globalData.token,
        userType:app.globalData.userType,
        phone:app.globalData.user.phone,
        password:this.data.password,
        code:this.data.code
      },
      success (res) {
        console.log(res)
        if(res.data == 1){
          wx.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 1500
          }),
          setTimeout(()=>{
            wx.navigateBack({
              delta: 1
            })
          },1500)
        }else if(res.data == 2){
          wx.showToast({
            title: '修改失败',
            icon: 'success',
            duration: 1500
          })
        }else if(res.data == 3){
          wx.showToast({
            title: '验证码错误',
            icon: 'success',
            duration: 1500
          })
        }else{
          wx.showToast({
            title: '登录失效',
            icon: 'success',
            duration: 1500
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
