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
    show:false, //组件是否展示hi
    hidden:true,
    nowDate:0,


    date: '2021-01-01',//默认起始时间  
    date2: '2021-04-20',//默认结束时间 
    orderId:0,
    checkUSerId:0,
    options1: [{
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
    }],
    options2: [{
      role_id: 0,
      role_name: '蓝色'
    },{
      role_id: 1,
      role_name: '黄色'
    }, {
      role_id: 2,
      role_name: '红色'
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
  submit(e){
    this.setData({
      hidden:false
    })
    this.page(1)
    that.page(1);
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
    // console.log(app.globalData)
    var oredrType = this.data.options1[this.data.orderId].role_name;
    var warnType = this.data.options2[this.data.checkUSerId].role_name;
    //Date.parse(new Date(startTime)) 转换成时间戳
    // console.log(this.data.date)
    // console.log(this.data.date2)
    var startTime = Date.parse(new Date(this.data.date));
    var endTime = Date.parse(new Date());
    var pageNum = idx;
    var num1 = 0,num2 = 0;
    console.log(startTime)
    console.log(endTime)
    console.log(oredrType)
    if(warnType == "黄色"){
      num1 = app.globalData.user.yellowNum1;
      num2 = app.globalData.user.redNum1;
    }else if(warnType == "蓝色"){
      num1 = app.globalData.user.blueNum1;
      num2 = app.globalData.user.yellowNum1;
    }else if(warnType == "红色"){
      num1 = app.globalData.user.redNum1;
      num2 = 0;
    }
    wx.request({
      url: app.globalData.BASE_URL + '/order/warnOrderSelectByTimeAndType',
      method: 'POST',
      data: {//将表单数据传输过去
        token:app.globalData.token,
        userType:app.globalData.userType,
        num1: num1,
        num2: num2,
        startTime:startTime,
        endTime:endTime,
        pageNum:pageNum,
        type:oredrType
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8' // 默认值
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
        else  max_page = parseInt(res.data.total / 7  +  1);
        that.setData({
          row:res.data.orders,
          total:res.data.total,
          max_page:max_page,
          loadT:true,
          curPage:idx,
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
  }
})