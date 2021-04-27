// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //当前用户角色
    roleId: 0,
    //功能块
    func:[{
      id: 0,
      funName: "人员管理",
      iconName: "icon-drxx91",
      funChild:[{
        funChildName: "维修工人",
        iconName: "icon-weixiu",//icon
        url:"/pages/admin/workerSelectAll/index" //跳转url
      },{
        funChildName: "生活部部长",
        iconName: "icon-tuya_huabanfuben",
        url:"/pages/admin/lifeMinisterSelect/index", 
      },{
        funChildName: "生活区队长",
        iconName: "icon-renyuanbianzhi",
        url:"/pages/admin/lifeMinisterSelect2/index"
      }],
      url:""
    },{
      id: 1,
      funName: "工单管理",
      iconName: "icon-gongdan",
      funChild:[{
        funChildName: "工单查询",
        iconName: "icon-chaxun",//icon
        url:"/pages/admin/order/selectOrder/index" //跳转url
      },{
        funChildName: "工单指派",
        iconName: "icon-chaobiaozhipai",
        url:"/pages/admin/delivererAll/index"
      },{
        funChildName: "工单预警",
        iconName: "icon-yujing",
        url:"/pages/admin/order/warnOrderSelect/index" 
      }],
      url:""
    },{
      id: 2,
      funName: "统计",
      funChild:[{
        funChildName: "工单完成率",
        iconName: "icon-wancheng",//icon
        url:"/pages/admin/order/OrderSelectFinish/index" //跳转url
      },{
        funChildName: "工人完成率",
        iconName: "icon-wancheng",
        url:"/pages/admin/workerSelectAllNoPage/index" 
      }],
      iconName: "icon-kaikeqingkuang",
      url:""
    },{
      id: 3,
      funName: "设置",
      funChild:[{
        funChildName: "修改手机号",
        iconName: "icon-shouji_huaban1",//icon
        url:"/pages/my/changePhone/index" //跳转url
      },{
        funChildName: "修改密码",
        iconName: "icon-mima1",
        url:"/pages/my/changePassword/index" 
      },{
        funChildName: "预警设置",
        iconName: "icon-shebeiyunweiyujingshezhi",
        url:"/pages/admin/warnTimeSet/index" 
      }],
      iconName: "icon-guzhang-",
      url:""
    },{
      id: 4,
      funName: "历史工单",
      iconName: "icon-lishibaogao",
      url:""
    },{
      id: 5,
      funName: "正在进行",
      iconName: "icon-zhengzaijinhang",
      url:""
    },{
      id: 6,
      funName: "设置",
      iconName: "icon-shezhix",
      url:""
    },{
      id: 7,
      funName: "工单管理",//维修工人工单管理
      iconName: "icon-shezhix",
      funChild:[{
        funChildName: "历史工单",
        iconName: "icon-lishi",//icon
        url: "/pages/worker/historyOrder/historyOrder", //跳转url
      },{
        funChildName: "正在维修",
        iconName: "icon-zhengzaizhizuo",
        url: "/pages/worker/maintaining/maintaining"
      }],
      url:""
    },{
      id: 8,
      funName: "工单管理",//系部工单管理
      iconName: "icon-shezhix",
      funChild:[{
        funChildName: "系部工单",
        iconName: "icon-gongdan",//icon
        url:"" //跳转url
      }],
      url:""
    },{
      id: 9,
      funName: "工单管理",//生活区队长工单管理
      iconName: "icon-shezhix",
      funChild:[{
        funChildName: "工单上报",
        iconName: "icon-kucunshangbao",//icon
        url:"/pages/student2/addOrder/addOrder" //跳转url
      },{
        funChildName: "区队工单",
        iconName: "icon-gongdan",//icon
          url:"/pages/student2/classOrder/classOrder" //跳转url
      },{
        funChildName: "正在维修",
        iconName: "icon-zhengzaizhizuo",//icon
          url:"/pages/student2/maintaining/maintaining" //跳转url
      }],
      url:""
    },{
      id: 10,
      funName: "功能",//生活部部长工单管理
      iconName: "icon-shezhix",
      funChild:[{
        funChildName: "人员管理",
        iconName: "icon-renyuanbianzhi",//icon
        url: "/pages/student1/lifeUser/index" //跳转url
      },{
        funChildName: "系部工单",
        iconName: "icon-gongdan",//icon
          url:"/pages/student1/lifeUserworkOrder/index", //跳转url
      }],
      url:""
    }],
    userFun:[{
      roleId: 1,
      num:[0,1,2,3]
    },{
      roleId: 2,
      num:[7]
    },{
      roleId: 3,
      num:[9]
    },{
      roleId: 4,
      num:[10]
    }],
    //当前功能
    curFun:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取用户类型
    var that = this;
    wx.getStorage({
      key: 'roleId',
      success:function(r){
        console.log(r.data)
        that.setData({
          roleId:r.data,
        })
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
        //渲染功能
        var that = this
        let roleId = that.data.roleId
        that.data.userFun.forEach(item=>{
          if(item.roleId == roleId){
            var po = []
            item.num.forEach(item1 =>{
              po.push(that.data.func[item1]);
            })
            console.log(po)
            that.setData({
              curFun:po,
            })
          }
        })
        // console.log(roleId)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})