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
    hidden:true,
    nowDate:0,


    date: '2021-01-01',//默认起始时间  
    date2: '2021-04-20',//默认结束时间 
    orderId:0,
    checkUSerId:0,
    imgsFileIDs:null,
    imgsFileIDs2:null,
    options1: [{
      role_id: 0,
      role_name: '未派单'
    },{
      role_id: 1,
      role_name: '已派单'
    }, {
      role_id: 2,
      role_name: '工人确认完成'
    }, {
      role_id: 3,
      role_name: '已完成'
    }, {
      role_id: 4,
      role_name: '全部状态'
    }],
    options2: [{
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
  changeId: function(e){
    // console.log(e)
    var id = e.detail.value;
    this.setData({
      id: id,
    });
    // console.log(role);
  },
  change1: function(e){
    var orderId = e.detail.id;
    this.setData({
      orderId: orderId,
    });
    // console.log(role);
  },
  change2: function(e){
    var checkUSerId = e.detail.id;
    this.setData({
      checkUSerId: checkUSerId,
    });
    // console.log(role);
  },
  // 时间段选择  起始时间
  bindDateChange(e) {
    let that = this;
    console.log(e.detail.value)
    that.setData({
      date: e.detail.value,
    })
  },
  //结束时间
  bindDateChange2(e) {
    let that = this;
    that.setData({
      date2: e.detail.value,
    })
  },
  submit(e){
    this.setData({
      hidden:false
    })
    this.page(1)
    this.page(1)
  },
  submit2(e){
    this.setData({
      hidden:false
    })
    var id = this.data.id
    wx.request({
      url: app.globalData.BASE_URL + '/order/selectOrderById',
      method: 'POST',
      data: {//将表单数据传输过去
        token:app.globalData.token,
        userType:app.globalData.userType,
        id:id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8' // 默认值
      },
      success (res) {
        console.log("???")
        console.log(res.data)
        for(let i = 0;i < res.data.length;i++){//图片格式处理
          var reg = new RegExp( '\\\\n' , "g" )
          var arr1 = res.data[i].imgsFileIDs;
          if(arr1 != null)
            arr1 = arr1.replace(reg,'')
          var arr2 = res.data[i].imgsFileIDs2;
          if(arr2 != null)
          arr2 = arr2.replace(reg,'')
          res.data[i].imgsFileIDs = JSON.parse(arr1)
          res.data[i].imgsFileIDs2 = JSON.parse(arr2)
        }
        that.setData({
          row:res.data,
          max_page:1,
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
  //显示分页组件
  showPage(){
    this.setData({
      show:!this.data.show
    })
  },
  page(idx){
    console.log(idx)
    console.log("换页执行了")
    var condi = this.data.options1[this.data.orderId].role_name;
    var type = this.data.options2[this.data.checkUSerId].role_name;
    //Date.parse(new Date(startTime)) 转换成时间戳
    // console.log(this.data.date)
    // console.log(this.data.date2)
    var startTime = Date.parse(new Date(this.data.date));
    var endTime = Date.parse(new Date(this.data.date2))   + 24 * 60 * 60 * 1000;
    console.log(endTime)
    var pageNum = idx;
    wx.request({
      url: app.globalData.BASE_URL + '/order/orderSelectByCondiAndTypeAndTime',
      method: 'POST',
      data: {//将表单数据传输过去
        token:app.globalData.token,
        userType:app.globalData.userType,
        condi: condi,
        type: type,
        startTime:startTime,
        endTime:endTime,
        pageNum:pageNum
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8' // 默认值
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
                  url:   "/pages/login/index?flag=invalid",
                })
              }, 1500) //延迟时间
            },
          });//延迟时间
        }
        var max_page;
        if(res.data.total % 7 == 0) max_page = parseInt(res.data.total / 7 );
        else  max_page = parseInt(res.data.total / 7)  +  1;
        for(let i = 0;i < res.data.orders.length;i++){//图片格式处理
          var reg = new RegExp( '\\\\n' , "g" )
          var arr1 = res.data.orders[i].imgsFileIDs;
          if(arr1 != null)
            arr1 = arr1.replace(reg,'')
          var arr2 = res.data.orders[i].imgsFileIDs2;
          if(arr2 != null)
          arr2 = arr2.replace(reg,'')
          res.data.orders[i].imgsFileIDs = JSON.parse(arr1)
          res.data.orders[i].imgsFileIDs2 = JSON.parse(arr2)
        }
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
    var nowDate = Date.parse(new Date())
    console.log(nowDate)
    that.setData({
      nowDate:nowDate
    })
  },
  onShow: function (options){
  },
  onPictureClick(e) {
    console.log(e)
    var arr = e.detail.currentTarget.dataset.name.imgsFileIDs
    // var reg = new RegExp( '\\\\n' , "g" )
    // arr = arr.replace(reg,'')
    var urls = arr;
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
    var arr = e.detail.currentTarget.dataset.name.imgsFileIDs2
    // var reg = new RegExp( '\\\\n' , "g" )
    // arr = arr.replace(reg,'')
    var urls = arr;
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