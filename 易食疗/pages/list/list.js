//list.js
var app = getApp()
var number = 1
var isLoading = false
Page({
    data: {
        arr_res: [],
        titleName:'',
        windowHeight: "500px",
        loadingHidden: true,
        lodingInfo: "加载更多",
        url:"../../pages/content/content"
    },
    onLoad: function(options) {
        //使number重置为1
        number = 0;
        var that = this;
      that.data.titleName = options.listName;
      that.data.id = options.id;
        wx.getSystemInfo({
            success: function(res) {
                that.setData({
                    windowHeight: res.windowHeight + "px"
                })
            },
            fail: function(e) {
                console.log("获取设备信息失败" + e);
            }
        });

        // 动态设置标题栏
        wx.setNavigationBarTitle({
          title: options.listName
        })
        wx.request({
            url: app.globalData.globalUrl+'cplist',
            data: {
                id: options.id,
                page: ++number,
                pagesize: 10
            },
            success: function(res) {
                that.setData({
                    arr_res: res.data.msg.data
                });
            }
        })
    },
    //滑到底部监听事件
    lower: function(e) {
        var that = this;
        if (number < 10 && !isLoading) {
            isLoading = true;
            that.setData({
                loadingHidden: false
            })
            wx.request({
                url: app.globalData.globalUrl+'cplist',
                data: {
                  id: this.data.id,
                  page: ++number,
                  pagesize: 10
                },
                success: function(res) {
                  const data = res.data.msg.data;
                  if(data.length === 0){
                    that.setData({
                      lodingInfo:"已全部加载完",
                      loadingHidden:false
                    })
                  }
                  else{
                    that.setData({
                      arr_res: that.data.arr_res.concat(data),
                      lodingInfo: "加载更多",
                      loadingHidden:false
                    });
                  }
                },
                fail: function(error) {
                    number--;
                    that.setData({
                        lodingInfo: "加载失败",
                    })
                },
                complete: function() {
                    isLoading = false;
                    that.setData({
                        loadingHidden: true,
                    })
                }
            })
        }
    },

})
