
//index.js
//获取应用实例
import address from '../../common/address'

let {userAddressByProps}=address
var app = getApp()

Page({
  data: {
    allAddress: [],//地址列表
  },
  onLoad: function () {
    this.getAddress({"user_id":app.globalData.openid})
    
  },
  onShow:function(){
     //发送请求,获取用户联系人地址列表

  },
  addrss(){
    wx.navigateTo({
        url: '/pages/address/addto/index'
      })
  },
  //封装函数
  getAddress(data){
    userAddressByProps(data).then((e)=>{
      console.log(e.data.userAddressbyprops)
      this.setData({
        allAddress:e.data.userAddressbyprops
      })
    })
  }
})
