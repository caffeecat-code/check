import { tableHeader, tableHeader2, row }  from './config'
const app = getApp()
var that
Page({
    /**
     * 页面的初始数据
     */
    data: {
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
      hidden:false
    },
    //显示分页组件
    showPage(){
      this.setData({
        show:!this.data.show
      })
    },
    page(idx){
      // console.log(idx)
      // var that = this
      console.log("idx:" + idx)
      console.log("该分页执行了")
      wx.request({
        url: app.globalData.BASE_URL + '/order/orderSelectByCondiAndTypeAndTime',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8' // 默认值
        },
        data:{
          // token:app.globalData.token,
          // userType:app.globalData.userType,
          // pageNum:1
          token:app.globalData.token,
          userType:app.globalData.userType,
          condi:"未派单",
          pageNum:idx,
          type:"全部类别",
          startTime:0,
          endTime:0
        },
        success (res) {
          if(res.data == 444){
            wx.showToast({
              title: '登录失效',
              icon: 'success',
              duration: 1500
            })
            wx.navigateTo({
              url:   "/pages/login/index?flag=invalid",
            })
            return;
          }
          var max_page;
          if(res.data.total % 7 == 0) max_page = parseInt(res.data.total / 7);
          else  max_page = parseInt(res.data.total / 7)  +  1;
          that.setData({
            row:res.data.orders,
            total:res.data.total,
            loadT:true,
            max_page:max_page,
            hidden:true
          })
          // console.log(that.data.total)
        }
      })
    },
    //换页
    changePage(e){
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
    },
    onShow: function (options){
      this.page(1)
    },
    
    /** 
     * 派单
     */
    onDelivererClick: function(e){
      console.log(e.detail.currentTarget.dataset.name.id)
      let id = e.detail.currentTarget.dataset.name.id;
      let model = e.detail.currentTarget.dataset.name.id;
      wx.navigateTo({
        url:  "/pages/admin/workerDeliveer/index?model=" + model,
      })
    },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
      // 显示顶部刷新图标
      wx.showNavigationBarLoading();
      let self = this;
      self.showPage();
      console.log('jjjj');
      // 隐藏导航栏加载框
      wx.hideNavigationBarLoading();
      // 停止下拉动作
      wx.stopPullDownRefresh();
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
    }
  })
