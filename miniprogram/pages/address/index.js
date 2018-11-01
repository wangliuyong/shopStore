
//index.js
//获取应用实例
var app = getApp()

Page({
  data: {
    allAddress: [],//地址列表
  },
  onLoad: function () {
    
  },
  onShow:function(){
     
  },
  addrss(){
    wx.navigateTo({
        url: '/pages/address/addto/index'
      })
  }
})
