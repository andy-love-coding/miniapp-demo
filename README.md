# 微信小程序demo
### 下载须知
+ 下载后，请在project.config.json中配置appid

## 页面功能说明
### 对app.js的做了备注
  + app.js中主要包括：
    - 启动时写日志（写进缓存setStorageSync）
    - 启动时异步网络获取用户信息
### 对index.js做了备注
  + index.js主要包括：
    - 获取用户信息（先从全局变量中取数据、如果没有再用回调接收异步网络请求到的数据、或者自己用api直接请求）
    - button授权获取用户信息（open-type="getUserInof"）
### 对/utils/util.js做了备注
  + util.js主要包括：
    - 导出【时间格式化】模块

## 逻辑说明
### 关于app.js中`onLaunch()`与index.js中`onLoad()`的执行顺序
  + 整体上按同步顺序：先执行app.js中`onLaunch()`中的代码，再执行index.js中`onLoad()`
  + 若`onLaunch()`中有异步网络请求，则异步网络请求中的代码（请求需要时间，特指对请求结果处理的代码），会在index.js中`onLoad()`之后执行
  + 以本demo获取用户信息代码执行顺序为例，打开index页面，控制台输出如下：
  ```
    app：开始
    page：onlaod开始了
    page：onload中定义app中的回调函数
    app：异步网络请求用户信息
    app：异步请求中，给globalData赋值
    app：异步请求中，执行回调函数处理网络请求的结果（该回调函数在onload中定义）
    app：异步请求中，接上条→将请求结果，赋值给page中的data.userInfo
  ```
  ### 关于获取用户信息（昵称、头像等，不包括openid）
    + 新版本小程序：假设wx.canIUse('button.open-type.getUserInfo')为真，视为新版
      - 方法一：用<button open-type="getUserInfo">引导用户授权（点击button即授权)，来获取用户信息
      - 方法二：在用户授权后，就可以直接用Api（wx.getUserInfo)来获取用户信息了
        + 判断用户是否授权了
        ```javaScript
          wx.getSetting({
            success: res => {
              if (res.authSetting['scope.userInfo']){
                // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
              }
            }
        ``` 
    + 旧版小程序：直接用Api（wx.getUserInfo)来获取用户信息
