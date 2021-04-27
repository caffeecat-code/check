var adultNum = 0;
var childNum = 0;
var threeNum = 0
Page({
  data: {
    adultNum: adultNum,
    childNum: childNum,
    threeNum: threeNum
  },
  plusAdultNum: function () {//增加天数
    adultNum = this.data.adultNum;
    childNum = this.data.childNum;
    
    if(adultNum >= childNum) {
      wx.showToast({
        title: '需小于黄色预警！',
        duration:1000
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
        duration:1000
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
        duration:1000
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
        icon:"loading"
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
        duration:1000
      })
      return
    }
    threeNum--;
    this.setData({
      threeNum: threeNum
    })
  },
  submit:function(){
    wx.request({
      url: url, //仅为示例，并非真实的接口地址
      method: 'POST',
      data: {//将表单数据传输过去
        phone: username,
        password: password
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success (res) {
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
            // token:app.globalData.token,
            // userType:app.globalData.userType,
            // pageNum:1
            token:app.globalData.token,
            userType:app.globalData.userType,
            id:app.globalData.user.id,
            blueNum1:blueNum1,
            yellowNum1:yellowNum1,
            redNum1:redNum1
          },
          success (res) {
            that.setData({
              row:res.data.workers,
              total:res.data.total,
              curPage:idx,
              hidden:true
            })
            // console.log(that.data.total)
          }
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



  onLoad: function () {

  },


})

