// component/qz-lists/index.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    max_page:{
      type: Number,
      value: 0
    },
    page: {
      type: Number,
      value: 0
    },
    show: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    page_select: 0,
    page_lists: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //生成数组
    newList: function (star, end) {
      var rows = [], row = [];
      for(; star <= end; star++) {
        row.push(star);
        if(star % 5 == 0 || star == end){
          rows.push(row);
          row = [];
        }
      }
      return rows;
    },

    setPageSelect: function(e){
      var ind = e.currentTarget.dataset.in;
      this.setData({
        page_select: ind
      });
    },

    selectPage: function(e){
      console.log(e)
      var id = e.currentTarget.dataset.id;
      this.triggerEvent("selectPage", id, {});
      console.log(this.data.max_page + "??")
      this.newA()
    },
    newA: function(){
      var t = this;
      var max_page = t.data.max_page;
      console.log(max_page + "---")
      var max = Math.ceil(max_page/20);
      var cha = 20 * max - max_page;
      var lists = [];
      for(var i = 0; i < max; i++){
        var star = 20 * i + 1, end = 20 * (i + 1);
        if(i == max - 1){
          end = 20 * (i + 1) - cha;
        }
        var row = {
          text: star + '-' + end,
          star: star,
          end: end,
          data: t.newList(star, end)
        };
        lists.push(row);
      }
      t.setData({
        page_lists: lists
      });
      // console.log(lists);
    }
  },
  lifetimes: {
    created: function () {
      // 组件实例化，但节点树还未导入，因此这时不能用setData
     
    },
    attached: function () {
      // 在组件实例进入页面节点树时执行 
      // 节点树完成，可以用setData渲染节点，但无法操作节点

      this.newA()
    },
  }
})
