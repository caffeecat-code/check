var adultNum = 0;
var childNum = 0;
var threeNum = 0;
var app = getApp()
Page({
  data: {
    adultNum: adultNum,
    childNum: childNum,
    threeNum: threeNum,
    hidden:true
  },
  plusAdultNum: function () {//增加天数
    adultNum = this.data.adultNum;
    childNum = this.data.childNum;
    
    if(adultNum >= childNum) {
      wx.showToast({
        title: '需小于黄色预警！',
        duration:1000,
        image:"/images/fail.png"
      })
      return
    };
    adultNum++;
    this.setData({
      adultNum: adultNum
    })
  },
  minusAdultNum: function () {//减少天数
    adultNum = this.data.adultNum;
    childNum = this.data.childNum;
    if(adultNum <= 0) {
      wx.showToast({
        title: '大于等于0！',
        duration:1000,
        image:"/images/fail.png"
      })
      return
    };
    adultNum--;
    this.setData({
      adultNum: adultNum
    })
  },
  plusChildNum: function () {////增加天数
    adultNum = this.data.adultNum;
    childNum = this.data.childNum;
    threeNum = this.data.threeNum;
    if(childNum >= threeNum){
      wx.showToast({
        title: '需小于红色预警！',
        duration:1000,
        image:"/images/fail.png"
      })
      return
    }
    childNum++;
    this.setData({
      childNum: childNum
    })
  },

  minusChildNum: function () {//减少天数
    adultNum = this.data.adultNum;
    childNum = this.data.childNum;
    threeNum = this.data.threeNum;
    if(childNum <= adultNum){
      wx.showToast({
        title: '需大于黄色预警！',
        duration:1000,
        image:"/images/fail.png"
      })
      return
    }
    childNum--;
    this.setData({
      childNum: childNum
    })
  },
  plusThreeNum: function () {////增加天数
    threeNum = this.data.threeNum;
    threeNum++;
    this.setData({
      threeNum: threeNum
    })
  },
  minusThreeNum: function () {//减少天数
    adultNum = this.data.adultNum;
    childNum = this.data.childNum;
    threeNum = this.data.threeNum;
    if(threeNum <= childNum){
      wx.showToast({
        title: '不小于黄色预警',
        duration:1000,
        image:"/images/fail.png"
      })
      return
    }
    threeNum--;
    this.setData({
      threeNum: threeNum
    })
  },
  submit:function(){
      this.setData({
        hidden:false
      })
      var that = this
      let blueNum1 = this.data.adultNum;
      let yellowNum1 = this.data.childNum;
      let redNum1 = this.data.threeNum
      var that = this
      wx.request({
        url: app.globalData.BASE_URL + '/admin/adminSetWarn',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8' // 默认值
        },
        data:{
          token:app.globalData.token,
          userType:app.globalData.userType,
          id:app.globalData.user.id,
          blueNum1:blueNum1,
          yellowNum1:yellowNum1,
          redNum1:redNum1
        },
        success (res) {
          console.log(res)
          if(res.data == 444){
            wx.showToast({
              title: '登录过期！',
              icon: 'none',
              duration: 1000
            });
            wx.navigateTo({
              url:   "/pages/login/index?flag=invalid",
            })
          }
          if(res.data.status == 1){
            wx.showToast({
              title: '设置成功！',
              icon: 'none',
              duration: 2000
            });
            app.globalData.user = res.data.user
            that.setData({
              hidden:true
            })
          }
          // console.log(that.data.total)
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



  onLoad: function () {
    this.setData({
      adultNum: app.globalData.user.blueNum1,
      childNum: app.globalData.user.yellowNum1,
      threeNum: app.globalData.user.redNum1,
    })
  },


})

