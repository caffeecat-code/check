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
    options1: []
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
        console.log(res.data)
        that.setData({
          row:res.data,
          max_page:1,
          loadT:true
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
    //Date.parse(new Date(startTime)) 转换成时间戳
    // console.log(this.data.date)
    // console.log(this.data.date2)
    var startTime = Date.parse(new Date(this.data.date));
    var endTime = Date.parse(new Date(this.data.date2));
    var pageNum = idx;
    wx.request({
      url: app.globalData.BASE_URL + '/order/selectOrderByTimeAndType',
      method: 'POST',
      data: {//将表单数据传输过去
        token:app.globalData.token,
        userType:app.globalData.userType,
        startTime:startTime,
        endTime:endTime
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
        console.log(res.data)
        var row = [];
        var list = {
          type:"水电",
          subNum:res.data.shuiDian1,
          finishNum:res.data.shuiDian2,
          finishB:(res.data.shuiDian2 * 1.0 / res.data.shuiDian1 * 100).toFixed(2) + "%"
        }
        row.push(list)
        list = {
          type:"木工",
          subNum:res.data.muGong1,
          finishNum:res.data.muGong2,
          finishB:(res.data.muGong2 * 1.0 / res.data.muGong1 * 100).toFixed(2) + "%"
        }
        row.push(list)
        list = {
          type:"空调",
          subNum:res.data.kongTiao1,
          finishNum:res.data.kongTiao2,
          finishB:(res.data.kongTiao2 * 1.0 / res.data.kongTiao1 * 100).toFixed(2) + "%"
        }
        row.push(list)
        list = {
          type:"校园网",
          subNum:res.data.xiaoYuanWang1,
          finishNum:res.data.xiaoYuanWang2,
          finishB:(res.data.xiaoYuanWang2 * 1.0 / res.data.xiaoYuanWang1 * 100).toFixed(2) + "%"
        }
        row.push(list)
        list = {
          type:"其他",
          subNum:res.data.qiTa1,
          finishNum:res.data.qiTa1,
          finishB:(res.data.qiTa2 * 1.0 / res.data.qiTa1 * 100).toFixed(2) + "%"
        }
        row.push(list)
        list = {
          type:"总计",
          subNum:res.data.sum1,
          finishNum:res.data.sum2,
          finishB:(res.data.sum2 * 1.0 / res.data.sum1 * 100).toFixed(2) + "%"
        }
        row.push(list)
        that.setData({
          row:row,
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
  },
  onShow: function (options){
  }
})