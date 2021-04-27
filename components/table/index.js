
Component({
  /**
   * 外部样式类
   */
  externalClasses: ['header-row-class-name', 'row-class-name', 'cell-class-name'],

  /**
   * 组件样式隔离
   */
  options: {
    styleIsolation: "isolated",
    multipleSlots: true // 支持多个slot
  },

  /**
   * 组件的属性列表
   */
  properties: {
    data: {
      type: Array,
      value: []
    },
    headers: {
      type: Array,
      value: []
    },
    // table的高度, 溢出可滚动
    height: {
      type: String,
      value: 'auto'
    },
    width: {
      type: Number || String,
      value: '100%'
    },
    // 单元格的宽度
    tdWidth: {
      type: Number,
      value: 35
    },
    // 固定表头 thead达到Header的位置时就应该被fixed了
    offsetTop: {
      type: Number,
      value: 150
    },
    // 是否带有纵向边框
    stripe: {
      type: Boolean,
      value: false
    },
    // 是否带有纵向边框
    border: {
      type: Boolean,
      value: false
    },
    msg: {
      type: String,
      value: '暂无数据~'
    },
    pageType:{
      type:Number,
      value:0
    },
    conType:{
      type:Number,
      value:0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    scrolWidth: '100%'
  },

  /**
   * 组件的监听属性
   */
  observers: {
    // 在 numberA 或者 numberB 被设置时，执行这个函数
    'headers': function headers(_headers) {
      var reducer = function reducer(accumulator, currentValue) {
        return accumulator + Number(currentValue.width);
      };
      var scrolWidth = _headers.reduce(reducer, 0);

      this.setData({
        scrolWidth: scrolWidth
      });
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onDelClick: function onDelClick(e) {
      //得到当前列的数据
      console.log(e.currentTarget.dataset)
      this.triggerEvent('delClick', e, e.currentTarget.dataset);
    },
    onChangeClick: function onChangeClick(e) {
      //得到当前列的数据
      console.log(e.currentTarget.dataset)
      this.triggerEvent('changeClick', e, e.currentTarget.dataset);
    },
    onDelivererClick: function onChangeClick(e) {
      //得到当前列的数据
      console.log(e.currentTarget.dataset)
      this.triggerEvent('delivererClick', e, e.currentTarget.dataset);
    },
    onPictureClick: function onChangeClick(e) {
      //得到当前列的数据
      console.log(e.currentTarget.dataset)
      this.triggerEvent('pictureClick', e, e.currentTarget.dataset);
    },
    onPictureClick2: function onChangeClick(e) {
      //得到当前列的数据
      console.log(e.currentTarget.dataset)
      this.triggerEvent('pictureClick2', e, e.currentTarget.dataset);
    },
    onConfirmClick: function onConfirmClick(e) {
      //得到当前列的数据
      console.log(e.currentTarget.dataset)
      this.triggerEvent('onConfirmClick', e, e.currentTarget.dataset);
    }
  }
});

