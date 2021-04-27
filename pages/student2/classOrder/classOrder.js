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
      url: app.globalData.BASE_URL + '/order/selectOrderBys_id',
      method: 'POST',
      data: {//将表单数据传输过去
        token:app.globalData.token,
        userType:app.globalData.userType,
        id:app.globalData.user.id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8' // 默认值
      },
      success (res) {
        console.log(res)
        if(res.data == 444){
          wx.navigateTo({
            url:   "/pages/login/index?flag=invalid",
          })
          return
        }
        that.setData({
          row:res.data,
          total:res.data.total,
          loadT:true,
          hidden:true
        })
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