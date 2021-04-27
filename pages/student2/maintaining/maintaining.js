// pages/student2/classOrder/classOrder.js
import { tableHeader, tableHeader2, row }  from './config'
const app = getApp()
var that
Page({
  data: {
    id:0,
    month: '',
    user_name: '', 
    tableHeader,
    tableHeader2,
    stripe: true,
    border: true,
    outBorder: true,
    height: '150px',
    row,
    row2: [],
    msg: '没有记录哦～',
    curPage:1,
    total:1,
    loadT:0,
    orderId:0,
    checkUSerId:0,
    imgsFileIDs:null,
    imgsFileIDs2:null,
    hidden:false
  },
  submit(e){
    this.page(1)
    this.page(1)
  },
  page(idx){
    console.log(idx)
    console.log("换页执行了")
    wx.request({
      url: app.globalData.BASE_URL + '/order/selectBys_idAndCondiNo',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      data: {
        token: app.globalData.token,
        userType: app.globalData.userType,
        id: app.globalData.user.id,
        condi: "已完成",
        
      },
      success (res) {
        if(res.data == 444){
          wx.showToast({
            title: '登录失效',
            icon: 'success',
            duration: 1500,
            mask: true,
            success: function() {
              setTimeout(function() {
                //延时执行
                wx.navigateTo({
                  url:   "/pages/login/index",
                })
              }, 1500) //延迟时间
            },
          });//延迟时间
        };
        that.setData({
          row:res.data,
          total:res.data.total,
          loadT:true,
          hidden:true
        })
        if (that.data.row.length === 0) {
          wx.showToast({
            title: '暂无工单',
            icon: "none"
          })
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
  }, 
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    var nowDate = Date.parse(new Date())
    console.log(nowDate)
    that.setData({
      nowDate:nowDate
    })
    that.page(1)
  },
  onShow: function (options){
  },
  onPictureClick(e) {
    console.log(e)
    var arr = e.detail.currentTarget.dataset.name.imgsFileIDs
    var reg = new RegExp( '\\\\n' , "g" )
    arr = arr.replace(reg,'')
    var urls = JSON.parse(arr);
    for(var i = 0;i < urls.length;i++){//循环加上前缀
      urls[i] = app.globalData.IMG_URL +urls[i]
    }
    var imgUrl =  urls[0]//默认显示第一张图片
    wx.previewImage({
      current: imgUrl,//当前点击的图片链接
      urls: urls//展示的图片数组
     })
  },
  onPictureClick2(e) {
    console.log(e)
    var arr = e.detail.currentTarget.dataset.name.imgsFileIDs2
    var reg = new RegExp( '\\\\n' , "g" )
    arr = arr.replace(reg,'')
    var urls = JSON.parse(arr);
    for(var i = 0;i < urls.length;i++){//循环加上前缀
      urls[i] = app.globalData.IMG_URL +urls[i]
    }
    var imgUrl =  urls[0]//默认显示第一张图片
    wx.previewImage({
      current: imgUrl,//当前点击的图片链接
      urls: urls//展示的图片数组
     })
  },
  onConfirmClick: function(e) {
    var that = this
    console.log("确认完成")
    console.log(e.currentTarget)
    let id = e.detail.currentTarget.dataset.name.id;
    let w_id = e.detail.currentTarget.dataset.name.w_id;
    wx.showModal({
      title: '确认工人维修完成吗',
      success: function(res) {
        if (res.confirm) {
          console.log("点击确认")
          wx.request({
            url: app.globalData.BASE_URL + '/order/studentUpdateOrder',
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            data: {
              token: app.globalData.token,
              userType: app.globalData.userType,
              id: id,
              w_id: w_id
            },
            success(res) {
              console.log(res)
              if (res.data === 1) {
                wx.showToast({
                  title: '确认成功',
                })
                that.onLoad()
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
        } else {
          console.log("点击取消")
        }
      }
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

  }
})