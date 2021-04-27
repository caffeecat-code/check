// pages/student2/addOrder/addOrder.js

var app = getApp()
var that;
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
    array: ['水电', '木工', '疏通', '空调', '校园网', '其他'],
    index: 0,
    workType: "水电",
    reason: null,
    address: null,
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
    }, {
      role_id: 6,
      role_name: '全部类别'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this;
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

  //维修类别选择
  bindPickerChange: function(e) {
    console.log(e)
    this.setData({
      workType: e.detail.name,
      index: e.detail.id
    })
  },

  bindReason: function(e) {
    this.setData({
      reason: e.detail.value
    })
  },

  bindAddress: function(e) {
    this.setData({
      address: e.detail.value
    })
  },




  //图片选择
  selectImg: function() {
    var that = this
    //that.data.imgs = [] //显示在上传页的图片||临时图片路径
    //that.data.imgsFileIDs = [] //最终需保存在数据库的图片路径
    wx.chooseImage({
      success:function (res) {
        // 将图片保存 显示在界面
        var tempFilePaths = res.tempFilePaths;  
        console.log(that.data.imgs.concat(tempFilePaths))
        that.setData({
          imgs: that.data.imgs.concat(tempFilePaths),
          imgBtn: "重新选择图片"
        })
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

  //提交
  submit: function(e) {
    if (this.data.reason === null) {
      wx.showToast({
        title: '请输入维修原因',
        icon: "none"
      })
    } else if (this.data.address === null) {
      wx.showToast({
        title: '请输入维修地址',
        icon: "none"
      })
    } else {
      this.uploadImg(this.data.imgs, 0)
    }
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

  //提交工单
  addOrder: function() {
    var that = this
    var workType = this.data.workType
    var reason = this.data.reason
    var address = this.data.address
    var id = app.globalData.user.id
    var token = app.globalData.token
    var userType = app.globalData.userType

    console.log(this.data.imgsFileIDs)
    var imgsFileIDs = ""
    imgsFileIDs = JSON.stringify(this.data.imgsFileIDs)
    console.log(imgsFileIDs)
    this.setData({
      loadingHidden: false,
      hint: "正在提交工单",
    })

    wx.request({
      url: app.globalData.BASE_URL + '/order/studentInsertOrder',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      data: {
        token: token,
        userType: userType,
        id: id,
        workType: workType,
        reason: reason,
        address: address,
        imgsFileIDs: imgsFileIDs
      },
      success(res) {
        if(res.data == 444){
          wx.navigateTo({
            url: '/pages/login/login?flag=invalid',
          })
        }
        console.log(res)
        that.setData({
          loadingHidden: true,
          imgs: [],
          imgsFileIDs: [],
          index: 0,
          workType: "水电",
          reason: null,
          address: null
        })
        wx.showToast({
          title: '提交成功',
        })
      }
    })


  },



  // uploadImg: function() {
  //   var that = this
  //   this.setData({
  //     loadingHidden: false,
  //     hint: "图片上传中..."
  //   })
  //   //发起后端请求签名
  //   wx.request({
  //     url: app.globalData.BASE_URL + '/aliyunOss',
  //     method: 'POST',
  //     header: {
  //       'content-type': 'application/x-www-form-urlencoded'
  //     },
  //     success: function(res) {
  //       console.log(res)
  //       for (var i = 0; i < that.data.imgs.length; i++) {
  //         var imgName = new Date().getTime() + "_" + (Math.random() * 1000).toFixed(0) + '.png'
  //         //发起putObject请求，直传OSS
  //         wx.uploadFile({
  //           url: 'https://hnmaintain.oss-cn-hangzhou.aliyuncs.com',
  //           filePath: that.data.imgs[i],
  //           name: 'file',
  //           header: {
  //             "Content-Type": "multipart/form-data"
  //           },
  //           formData: {
  //             name: imgName,
  //             key: 'maintainImg/' + imgName,
  //             policy: res.data.policy,
  //             OSSAccessKeyId: res.data.accessKeyId,
  //             success_action_status: '200',
  //             signature: res.data.signature
  //           },
  //           success: function(res) {
  //             console.log(res)
  //             that.data.imgsFileIDs.push('https://hnmaintain.oss-cn-hangzhou.aliyuncs.com/maintainImg/' + imgName)
  //             wx.showToast({
  //               title: '图片上传成功',
  //             })
  //             that.setData({
  //               loadingHidden: true,
  //               hint:"",
  //             })
  //           }
  //         })
  //       }
  //     }
  //   })
  // }
})