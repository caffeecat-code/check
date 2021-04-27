// pages/worker/confirm/confirm.js

var app = getApp()
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hint: "",
    imgBtn: "选择图片(可选)",
    imgs: [],
    imgsFileIDs: [],
    loadingHidden: true,
    consumable: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this
    this.setData({
      id: options.id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },


  bindConsumable: function(e) {
    this.setData({
      consumable: e.detail.value
    })
  },

//删除图片
delete: function (e) { 
  console.log("???")      
  var index = e.currentTarget.dataset.index;        
  var images = that.data.imgs;
    images.splice(index, 1);
    that.setData({            
      imgs: images
    });
},
// 预览图集
previewImage: function () {      
  wx.previewImage({            
    urls: that.data.imgs
  });
},

  //图片选择
  selectImg: function() {
    var that = this
    that.data.imgs = [] //显示在上传页的图片||临时图片路径
    that.data.imgsFileIDs = [] //最终需保存在数据库的图片路径
    wx.chooseImage({
      success: chooseResult => {
        // 将图片保存 显示在界面
        that.data.imgs = chooseResult.tempFilePaths
        that.setData({
          imgs: that.data.imgs,
          imgBtn: "重新选择图片"
        })
        console.log(that.data.imgs)
      },
    })

  },
//图片上传
uploadImg: function(imgs, i) {
  var that = this
  // that.data.imgsFileIDs = []
  var str = "第" + (i + 1) + "张图片上传中"
  this.setData({
    loadingHidden: false,
    hint: str,
  })
  console.log("图片上传")
  wx.uploadFile({
    url: app.globalData.BASE_URL + '/uploadImg',
    method: 'POST',
    header: {
      "Content-Type": "multipart/form-data"
    },
    filePath: that.data.imgs[i],
    name: "photo",
    formData: {
      token: app.globalData.token,
      userType: app.globalData.userType,
    },
    success(res) {
      console.log(res)
      if (res.data != 444) {
        that.data.imgsFileIDs.push(res.data)
        console.log("第" + (i + 1) + "张图片上传成功")
        that.setData({
          hint: ""
        })
        if (++i < imgs.length) {
          that.uploadImg(imgs, i)
        } else {
          that.addOrder()
        }
      }
    }
  })
},
  confirm: function() {
    if (this.data.consumable === null) {
      wx.showToast({
        title: '请输入维修耗材',
        icon: "none"
      })
    } else {
      this.uploadImg(this.data.imgs, 0)
    }
  },



  //提交确认
  submit: function() {
    var that = this
    var id = this.data.id
    var token = app.globalData.token
    var userType = app.globalData.userType
    var consumable = this.data.consumable
    console.log(id)
    console.log(userType)
    console.log(consumable)
    console.log(id)
    console.log(id)
    that.setData({
      loadingHidden: false,
      hint: "正在确认"
    })
    console.log(this.data.imgsFileIDs)
    var imgsFileIDs = ""
    imgsFileIDs = JSON.stringify(this.data.imgsFileIDs)
    console.log(imgsFileIDs)

    wx.request({
      url: app.globalData.BASE_URL + '/order/workerUpdateOrder2',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      data: {
        token: token,
        userType: userType,
        id: id,
        consumable: consumable,
        imgsFileIDs: imgsFileIDs
      },
      success(res) {
        console.log(res)
        that.setData({
          loadingHidden: true
        })
        if (res.data === 1) {
          wx.showToast({
            title: '确认成功',
          })
          wx.redirectTo({
            url: '/pages/worker/maintaining/maintaining',
          })
        } else if (res.data === 2) {
          wx.showToast({
            title: '确认失败',
            icon: "none",
          })
        } else if (res.data === 444) {
          app.globalData.status = null
          app.globalData.token = null
          app.globalData.user = null
          app.globalData.userType = null
          wx.navigateTo({
            url: '/pages/login/login?flag=invalid',
          })
        }
      }
    })
  },

})