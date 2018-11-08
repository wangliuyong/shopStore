//index.js
import order from '../../common/order'

let {getOrderProduct}=order

const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    orderList:[]
  },

  onLoad: function() {
    console.log("app.globalData.openid",app.globalData.openid)
    this.getOrder({"user_id":"ovtkn4zONC3IzhpykQ7cSLZ85YFg"})
  },
  onShow(){

  },
  pay(){
    //去支付
    wx.navigateTo({
      url: '/pages/order/index?id=2&count=3'
    })
  },
  cancelOrder(){
    //取消订单
  },
  //封装的函数
  getOrder(data){
    console.log(data)
    getOrderProduct(data).then((e)=>{
      console.log('---------',e.data)
      this.setData({
        orderList:e.data.orderProductByProps
      })
    })
  }
})
