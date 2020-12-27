var app = getApp()
Page({
    data: {
        title:null,
        arr_res: {},
        message: null,
    },
    onLoad: function(options) {
        this.setData({
          title: options.title
        })
        var that = this;
        // 动态设置标题栏
      // 动态设置标题栏
      wx.setNavigationBarTitle({
        title: options.title
      })

        //get请求
        wx.request({
            url: app.globalData.globalUrl+'cpdetail',
            data: {
              name: options.title,
            },
            success: function(res) {
              res.data.msg.steps=JSON.parse(res.data.msg.steps)
                that.setData({
                  arr_res: res.data.msg
                });
            }
        })
    }
})
