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
    addTarger(){
      wx.navigateTo({
        url: "/pages/admin/addLifeMinister2/index",
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
        url: app.globalData.BASE_URL + '/student/lifeMinisterSelect2',
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
          var max_page;
          if(res.data.total % 7 == 0) max_page = parseInt(res.data.total / 7);
          else  max_page = parseInt(res.data.total / 7  +  1);
          that.setData({
            row:res.data.students,
            total:res.data.total,
            loadT:true,
            max_page:max_page,
            hidden:true
          })
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
     * 删除生活区队长人员
     */
    onDelClick(e) {
      wx.showModal({
        title: '删除用户',
        content: '确定要删除该人员？',
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
              let id = e.detail.currentTarget.dataset.name.id;
              console.log(id)
              // console.log('e: ', e.detail.currentTarget.dataset)
              //进行删除操作
             
              wx.request({
                url: app.globalData.BASE_URL + '/student/lifeMinisterDelete2',
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
                  id:id,
                },
                success: res => {
                  if(res.data == 1){
                    wx.showToast({
                      title: '删除成功!',
                      icon: 'none',
                      duration: 1000
                    });
                    that.page(1);
                  }else if(res.data == 2){
                    wx.showToast({
                      title: '删除失败！',
                      icon: 'none',
                      duration: 1000
                    });
                  }else if(res.data == 3){
                    wx.showToast({
                      title: '该工人已绑定工单，无法删除',
                      icon: 'none',
                      duration: 1000
                    });
                  }else if(res.data == 444){
                    wx.showToast({
                      title: '登录过期！',
                      icon: 'none',
                      duration: 1000
                    });
                    wx.navigateTo({
                      url:   "/pages/login/index?flag=invalid",
                    })
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
    },
    onShow: function (options){
      this.page(1)
    },
    
    /** 
     * 修改生活区队长人员
     */
    onChangeClick: function(e){
      console.log(e.detail.currentTarget.dataset.name.id)
      let id = e.detail.currentTarget.dataset.name.id;
      let model = JSON.stringify(e.detail.currentTarget.dataset);
      wx.navigateTo({
        url: "/pages/admin/modifiLifeMinister2/index?model=" + model,
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

  })
