//index.js
import order from '../../common/order'

let {getOrder,updateOrder,deleteOrder,deleteOrderProduct,getOrderProduct}=order

const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    orderList:"",
    product:[]
  },

  onLoad: function() {
    
  },
  onShow(){
    //获取所有订单
    this.getOrderByUserId({user_id:app.globalData.openid})
  },
  toPay(e){
    
    //去支付
    wx.navigateTo({
      url: '/pages/order/index?orderId='+e.target.id
    })

  },
  cancelOrder(){
    //取消订单
  },
  //删除订单
  deleteOrder(e){
    let that=this
    console.log(e.target.id)

    deleteOrder({id:e.target.id}).then((e)=>{
      that.getOrderByUserId({user_id:app.globalData.openid})
    })
    deleteOrderProduct({order_id:e.target.id}).then((e)=>{
      that.getOrderByUserId({user_id:app.globalData.openid})
    })
    
  },
  //封装的函数
  getOrderByUserId(data){
    let that =this,
        orderArr=[]
    console.log(data)
    getOrder(data).then((e)=>{
      console.log('getOrderByUserId',e.data.orderbyprops)
      orderArr=e.data.orderbyprops
      for(let i=0;i<orderArr.length;i++){
        getOrderProduct({order_id:orderArr[i].id}).then((e)=>{
          console.log('getOrderProduct',e.data.orderProductbyprops)
          orderArr[i].product=e.data.orderProductbyprops
        })
      }

      that.setData({
        orderList:orderArr
      })
      console.log('orderList',that.data.product,"orderArr",orderArr)

    })
  }
})

