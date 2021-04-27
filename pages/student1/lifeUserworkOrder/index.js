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
    msg: '没有打卡记录哦～',
    curPage:1,
    total:1,
    loadT:0,
    max_page:0,//可以分多少页
    show:false, //组件是否展示
    nowDate:0,
    hidden:false,

    orderId:0,
    checkUSerId:0,
  },
  //显示分页组件
  showPage(){
    this.setData({
      show:!this.data.show
    })
  },
  page(idx){
    console.log(idx)
    console.log("换页执行了")
    var pageNum = idx;
    wx.request({
      url: app.globalData.BASE_URL + '/order/orderSelectByDept',
      method: 'POST',
      data: {//将表单数据传输过去
        token:app.globalData.token,
        userType:app.globalData.userType,
        dept:app.globalData.user.dept,
        pageNum:pageNum
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
        }
        var max_page;
        if(res.data.total % 7 == 0) max_page = parseInt(res.data.total) / 7;
        else  max_page = parseInt(res.data.total / 7)  +  1;
        that.setData({
          row:res.data.orders,
          
          total:res.data.total,
          max_page:max_page,
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
  //换页
  changePage(e){
    this.setData({
      hidden:false
    })
    // console.log(e)
    this.setData({
      curPage:e.detail
    })
    this.page(e.detail)
    this.showPage()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
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
      urls[i] = "https://wx.hngayjy.com/maintainSystem/upload/" +urls[i]
    }
    var imgUrl =  urls[0]//默认显示第一张图片
    wx.previewImage({
      current: imgUrl,//当前点击的图片链接
      urls: urls//展示的图片数组
     })
  },
  onPictureClick2(e) {
    console.log(e)
    var arr = e.detail.currentTarget.dataset.name.imgsFileIDs
    var reg = new RegExp( '\\\\n' , "g" )
    arr = arr.replace(reg,'')
    var urls = JSON.parse(arr);
    for(var i = 0;i < urls.length;i++){//循环加上前缀
      urls[i] = "https://wx.hngayjy.com/maintainSystem/upload/" +urls[i]
    }
    var imgUrl =  urls[0]//默认显示第一张图片
    wx.previewImage({
      current: imgUrl,//当前点击的图片链接
      urls: urls//展示的图片数组
     })
  }
})