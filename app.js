//app.js
App({
  onLaunch: function () {
    console.log('app：开始')
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({  // 所有的网络请求回调代码，都在onload之后执行
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          console.log('app：异步网络请求用户信息')
          wx.getUserInfo({ //【通过Api得到用户信息】（调用此Api必须先授权,此为新版本需授权）
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              console.log('app：异步请求中，给globalData赋值')
              this.globalData.userInfo = res.userInfo
              // console.log(res)

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) { // 这段代码会在onload之后执行
                console.log('app：异步请求中，执行回调函数处理网络请求的结果（该回调函数在onload中定义）')
                console.log('app：异步请求中，接上条→将请求结果，赋值给page中的data.userInfo')
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
  }
})