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
      id:0,
      curPage:1,
      total:1,
      loadT:0,
      max_page:0,//可以分多少页
      show:false //组件是否展示
    },
    addTarger(){
      wx.navigateTo({
        url:   "/pages/admin/addCheckUser/index",
      })
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
      var that = this
      wx.request({
        url: app.globalData.BASE_URL + '/worker/workerSelectAll',
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
          pageNum:idx
        },
        success (res) {
          if(res.data == 444){
            console.log("???")
            wx.navigateTo({
              url:'/pages/login/index?flag=invalid',
            })
          }
          var max_page;
          if(res.data.total % 7 == 0) max_page = parseInt(res.data.total / 7);
          else  max_page = parseInt(res.data.total / 7  +  1);
          that.setData({
            row:res.data.workers,
            total:res.data.total,
            max_page:max_page,
            loadT:true
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
     * 派单
     */
    onDelivererClick(e) {
      wx.showModal({
        title: '派单',
        content: '确定要向其派单？',
        showCancel: true,//是否显示取消按钮
        cancelText:"否",//默认是“取消”
        cancelColor:'skyblue',//取消文字的颜色
        confirmText:"是",//默认是“确定”
        confirmColor: 'skyblue',//确定文字的颜色
        success: res =>  {
           if (res.cancel) {
              //点击取消,默认隐藏弹框
             return;
           } else {
              //点击确定
              // console.log('e: ', e.detail.currentTarget.dataset)
              //进行删除操作
              var w_id = e.detail.currentTarget.dataset.name.id;
              console.log(this.data.id)
              console.log(w_id)
              wx.request({
                url: app.globalData.BASE_URL + '/order/adminUpdateOrder',
                method: 'POST',
                header: {
                  'content-type': 'application/x-www-form-urlencoded' // 默认值
                },
                data:{
                  // token:app.globalData.token,
                  // userType:app.globalData.userType,
                  // pageNum:1
                  token:app.globalData.token,
                  userType:app.globalData.userType,
                  id:this.data.id,
                  w_id:w_id
                },
                success: res => {
                  if(res.data == 1){
                    wx.showToast({
                      title: '指派成功!',
                      icon: 'none',
                      duration: 1000
                    });
                    that.page(1);
                  }else if(res.data == 2){
                    wx.showToast({
                      title: '指派失败！',
                      icon: 'none',
                      duration: 1000
                    });
                  }else if(res.data == 4){
                    wx.showToast({
                      title: '登录过期！',
                      icon: 'none',
                      duration: 1000
                    });
                  }
                }
              })
           }
        },
        fail: function (res) { },//接口调用失败的回调函数
        complete: function (res) { },//接口调用结束的回调函数（调用成功、失败都会执行）
     })
      
      // wx.showToast({
      //   title: '您点击了这一行：',
      //   icon: 'none'
      // })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      that = this
      let id = options.model;
      console.log(options)
      if(id == undefined) return;
      this.setData({
        id:id
      })
    },
    onShow: function (options){
     this.page(1)
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

  })
