var app = getApp()
Page({
    data: {
        input_value: null,
        loadingHidden: true,
        nullHidden: true,
        lodingInfo: "正在搜索",
    },
    bindSearchInput: function(e) {
        this.setData({
            input_value: e.detail.value
        })
    },
    tapSearch: function(event) {
        console.log(event)
        if (this.data.input_value == null || this.data.input_value.length == 0) {
            return;
        }
        var that = this;
        this.setData({
            loadingHidden: false,
            nullHidden: true,
            lodingInfo: "正在搜索"
        })
        wx.request({
            url: app.globalData.globalUrl+'cpsearch',
            data: {
                name: that.data.input_value,
            },
            success: function(res) {
              if (res.data.msg == null) {
                    that.setData({
                        nullHidden: false,
                    })
                } else {
                    app.globalData.result = res.data.msg
                    wx.navigateTo({
                        url: "../../pages/result/result"
                    });
                }
            },
            complete: function() {
                that.setData({
                    loadingHidden: true
                })
            }
        })
    },
    onHide: function() {
        this.setData({
            loadingHidden: true
        })
    }
})
