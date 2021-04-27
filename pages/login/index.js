// pages/login/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    options: [{
        role_id: 1,
        role_name: '管理员'
      },{
        role_id: 2,
        role_name: '维修人员'
      }, {
        role_id: 3,
        role_name: '生活区队长'
      }, {
        role_id: 4,
        role_name: '生活部部长'
      }],
      roleId : 0
  },
  change: function(e){
    var role = e.detail.id;
    this.setData({
      roleId: role,
    });
    // console.log(role);
  },
  //用户提交表单
  formSubmit: function(e){
    wx.showToast({
      title: '正在登录！',
      icon: 'none',
      duration: 5000
    });
    //获取提交表单得到的数据
    //1、获取用户信息
    //获取应用实例
    // const app = getApp()
    var username = e.detail.value.username;
    var password = e.detail.value.password;
    var roleId = this.data.roleId;
    console.log(e)
    // console.log(roleId)
    //验证是否填写角色
    if(roleId == 0){
      wx.showToast({
        title: '请选择角色！',
        icon: 'none',
        duration: 1000
      });
      return false; 
    }else{
      if (roleId === 1) {
        var url = app.globalData.BASE_URL + '/admin/adminLoginTwo'
      } else if (roleId === 2) {
        var url = app.globalData.BASE_URL + '/worker/workerLogin'
      } else if (roleId === 4) {
        var url = app.globalData.BASE_URL + '/student/student1Login'
      } else if (roleId === 3) {
        var url = app.globalData.BASE_URL + '/student/student2Login'
      }
      console.log(url);
    }
    //2、验证数据的格式
    //var phoneRepExp = /^1[3|4|5|7|8][0-9]{9}$/;
    var phoneRepExp = /^1[0-9]{10}$/;
    if(!phoneRepExp.test(username) || username == ""){//有问题
        wx.showToast({
          title: '手机号码有误！',
          icon: 'none',
          duration: 1000
        });
        return false; 
    }
    //验证密码
    if(password == ""){
      wx.showToast({
        title: '请输入密码！',
        icon: 'none',
        duration: 1000
      });
      return false;
    }
    //3、将信息封装发送服务器验证，对用户身份进行验证
    wx.request({
      url: url, //仅为示例，并非真实的接口地址
      method: 'POST',
      data: {//将表单数据传输过去
        phone: username,
        password: password
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success (res) {
        console.log(res.data)
        if(res.data.status == 1){//验证成功
          //登录成功,保存全局变量
          app.globalData.status = 1
          app.globalData.token = res.data.token
          app.globalData.user = res.data.user
          app.globalData.userType = res.data.userType
          console.log(app.globalData)
          wx.setStorage({
            data: roleId,
            key: 'roleId',
          })
          wx.showToast({
            title: '登陆成功，正在跳转...',
            icon: 'none',
            duration: 2000
          });
          setTimeout(function(){
            wx.reLaunch({
            url: '/pages/index/index?userType=' + roleId,
            success: (result) => {
              
            },
            fail: () => {},
            complete: () => {}
          })
        },2000); 
        }else{//验证失败
          wx.showToast({
            title: '账号密码错误',
            icon: 'none',
            duration: 1000
          });
        }
      },
      fail (res) {
        wx.showToast({
          title: '请检查网络！',
          icon: 'none',
          duration: 1000
        });
      }
    })
    //4、接受验证结果
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var flag = options.flag
    console.log(options)
    if (flag == 'invalid') {
      console.log("登录已过期")
      wx.showToast({
        title: '身份信息过期，请重写登录',
        icon: 'none',
        duration: 4000
      })
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

  }
})