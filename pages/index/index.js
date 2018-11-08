//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo') // 如果此接口可用，为新版本（调用Api需授权）；否则反之
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('page：onlaod开始了')
    // 获取用户信息，给page.userInfo赋值
    if (app.globalData.userInfo) { // 【通过全局变量得到用户信息】
      console.log('page: app.globalData.userInfo存在')
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) { //【通过Api得到用户信息】（调用此Api必须先授权,此为新版本需授权）
      console.log('page：onload中定义app中的回调函数')
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({ //【通过Api得到用户信息】（调用此Api必须先授权,此为老版本不用授权）
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  // 用户主动授权（点击button）后，获取用户信息【通过button绑定的事件得到用户信息】
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
