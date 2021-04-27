// pages/my/changePhone/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    name:0,
    newPhone:0,
    workType:0,
    curType:{

    },
    roleId:0,
    options: [{
      role_id: 0,
      role_name: '水电'
    },{
      role_id: 1,
      role_name: '木工'
    }, {
      role_id: 2,
      role_name: '疏通'
    }, {
      role_id: 3,
      role_name: '空调'
    }, {
      role_id: 4,
      role_name: '校园网'
    }, {
      role_id: 5,
      role_name: '其他'
    }]
  },

  //获取用户输入的新号码
  userNewPhone:function(e)
  {
    this.setData({
      newPhone: e.detail.value
    })
  },
  //获取用户输入的新姓名
  userName: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  //获取用户选择的角色
  change: function(e){
    var role = e.detail.id;
    this.setData({
      roleId: role,
    });
     console.log(role);
  },
  submit(){
    console.log(this.data.newPhone)
    let name = this.data.name
    let workType = this.data.options[this.data.roleId].role_name;
    let newPhone = this.data.newPhone;
    let id = this.data.id;
    console.log(name)
    console.log(workType)
    console.log(newPhone)
    console.log(this.data)
    var phoneRepExp = /^1[0-9]{10}$/;
    if(!phoneRepExp.test(this.data.newPhone) || this.data.newPhone == ""){//有问题
        wx.showToast({
          title: '手机号码有误！',
          icon: 'none',
          duration: 1000
        });
        return false; 
    }
     //验证密码
     if(this.data.name == ""){
      wx.showToast({
        title: '请输入姓名！',
        icon: 'none',
        duration: 1000
      });
      return false;
    }
   
    wx.request({
      url: app.globalData.BASE_URL + '/worker/workerUpdate',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8' // 默认值
      },
      data:{
        token:app.globalData.token,
        userType:app.globalData.userType,
        id:id,
        name:name,
        phone:newPhone,
        workType:workType
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
        }else{
          wx.showToast({
            title: '登录失效',
            icon: 'success',
            duration: 1500
          })
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
    let model = JSON.parse(options.model);
    // console.log(options.model)
    if(model == undefined) return;
    let idx = 0;
    console.log(this.data.options)
    for(var i = 0;i < this.data.options.length;i++){
      if(this.data.options[i].role_name == model.name.workType){
        idx = i;
        break;
      }
    }
    console.log(model)
    this.setData({
      id:model.name.id,
      name:model.name.name,
      workType:model.name.workType,
      newPhone:model.name.phone,
      roleId:idx,
      curType:{
        id:this.data.options[idx].role_id,
        name:this.data.options[idx].role_name,
      }
    })
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
