// pages/my/changePhone/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    name:0,
    dept:0,
    grade:0,
    classes:0,
    phone:0,
    options: [{
      role_id: 0,
      role_name: '侦察系'
    },{
      role_id: 1,
      role_name: '治安系'
    }, {
      role_id: 2,
      role_name: '刑事科学技术系'
    }, {
      role_id: 3,
      role_name: '交通管理系'
    }, {
      role_id: 4,
      role_name: '警务指挥与战术系'
    }, {
      role_id: 5,
      role_name: '信息技术系'
    }, {
      role_id: 6,
      role_name: '法律系'
    }, {
      role_id: 7,
      role_name: '管理系'
    }],
    options2: [{
      role_id: 0,
      role_name: 17
    },{
      role_id: 1,
      role_name: 18
    }, {
      role_id: 2,
      role_name: 19
    }, {
      role_id: 3,
      role_name: 20
    }]
  },
  //获取用户输入的学号
  inputId:function(e)
  {
    this.setData({
      id: e.detail.value
    })
  },
  //获取用户输入的姓名
  inputName:function(e)
  {
    this.setData({
      name: e.detail.value
    })
  },
  //获取用户输入的系部
  changeDept:function(e)
  {
    var dept = this.data.options[e.detail.id].role_name;
    this.setData({
      dept: dept
    })
  },
  //获取用户输入的年级
  changeGrade:function(e)
  {
    var grade = this.data.options2[e.detail.id].role_name;
    this.setData({
      grade: grade
    })
  },
  //获取用户输入的班级
  inputClass:function(e)
  {
    this.setData({
      classes: e.detail.value
    })
  },
  //获取用户输入的手机号
  inputPhone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  submit(){
    let id = this.data.id
    let name = this.data.name
    let dept = this.data.dept
    let grade = this.data.grade
    let classes = this.data.classes
    let phone = this.data.phone
    console.log(id)
    console.log(name)
    console.log(dept)
    console.log(grade)
    console.log(classes)
    console.log(phone)
    var phoneRepExp = /^1[0-9]{10}$/;
    if(!phoneRepExp.test(phone) || phone == ""){//有问题
        wx.showToast({
          title: '手机号码有误！',
          icon: 'none',
          duration: 1000
        });
        return false; 
    }
    wx.request({
      url: app.globalData.BASE_URL + '/student/lifeMinisterInsert2',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8;charset=utf-8' // 默认值
      },
      data:{
        token:app.globalData.token,
        userType:app.globalData.userType,
        id:id,
        name:name,
        dept:dept,
        grade:grade,
        classes:classes,
        phone:phone
      },
      success (res) {
        console.log(res)
        if(res.data == 1){
          wx.showToast({
            title: '添加成功！',
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
            title: '添加失败！',
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
      },
      fail(res){
        console.log(res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.model;
    console.log(options)
    if(id == undefined) return;
    this.setData({
      id:id
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
