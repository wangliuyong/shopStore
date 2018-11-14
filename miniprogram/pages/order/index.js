//index.js
//import data from '../../data'
import pay from '../../common/pay'
import product from '../../common/goods'
import address from '../../common/address'
import order from '../../common/order'

//let {goods}=data
let {payRuqest}=pay
let {getProductById}=product
let {userAddressByProps}=address
let {createProductOrder,createOrder,getOrderProduct,getOrder,getOrderById,updateOrder}=order

const app = getApp()

Page({
  data: {
    order:{
      good:{},
      selectCount:""
    },
    defaultAddress:{},
    shopCar:true,
    //
    message:"",
    sumPrice:0,
    option:{},
    orderArr:[]
  },
  onLoad: function(option){
    this.setData({
      option:option
    })
    console.log("option",option)
    if(option.orderId){
      this.getOrderByIds({order_id:option.orderId})
    }

    if(option.user_id){

    }
    if (option.id) {
      this.setData({
        shopCar:false
      })
      this.getGoodById(option)
    }
    
  },
  onShow(){
    this.getAddressUserId({"user_id":app.globalData.openid})
  },
  change(e){
    this.setData({
      message:e.detail
    })
    console.log("e",e,"this data",this.data.message)
  },
  onSubmit(){
    let option=this.data.option
    if(option.id){
      this.createAllOrder()
    }else{
      this.updateOrderById(option)
    }
    
  },
  toAdd(){
    wx.navigateTo({
      url: '/pages/address/index'
    })
  },
  //封装的函数
  updateOrderById(option){
    let that=this,
        needPay=that.data.sumPrice,
        openid=app.globalData.openid;
    //支付
    payRuqest(needPay,openid,(data)=>{
      console.log('res',data)
      if(data==1){
        //支付成功
        let payTime=new Date().toLocaleDateString().split("/").join("-")+' '+new Date().toLocaleTimeString().slice(2)
        updateOrder({id:option.orderId,orderStatus:"1",payTime}).then((e)=>{
          console.log('更新成功',e)
          //跳转
        })
      }
    })
  },
  getGoodById(option){
    getProductById(option.id).then((e) => {
      console.log(e.data.product_by_id)
      this.setData({
        "order.good": e.data.product_by_id,
        "order.selectCount": option.count
      })
      console.log(this.data.order.good.price, this.data.order)
      this.setData({
        sumPrice: this.data.order.good.price * this.data.order.selectCount * 100
      })

    }) 
  },
  getAddressUserId(data){
    let that=this
    userAddressByProps(data).then((e)=>{
      console.log("userAddressByProps",e)
      let address=e.data.userAddressbyprops

      console.log("address",address)
      address=address.filter((item)=>{
        return item.default==1
      })


      that.setData({
        defaultAddress:address[0]||''
      }) 

    })
  },
  createAllOrder(){
    let that=this,
        needPay=that.data.sumPrice,
        openid=app.globalData.openid;
    //支付
    payRuqest(needPay,openid,(data)=>{
      console.log('res',data)
      if(data==1){
        //支付成功
        let payTime=new Date().toLocaleDateString().split("/").join("-")+' '+new Date().toLocaleTimeString().slice(2)
        that.createOrder({orderStatus:"1",payTime})
      }else{
        //支付不成功
        //创建一个订单
        let payTime=new Date().toLocaleDateString().split("/").join("-")+' '+new Date().toLocaleTimeString().slice(2)
        that.createOrder({orderStatus:"0",payTime})
      }
    })
  },
  getOrderByIds(data){
    getOrderProduct(data).then((e)=>{
      console.log("getOrderProduct",e.data.orderProductbyprops)
      this.setData({
        orderArr:e.data.orderProductbyprops
      })
      this.setData({
        sumPrice: e.data.orderProductbyprops[0].order_id.orderTotalPay
      })
      console.log("e.data.orderProductbyprops.order_id[0]",e.data.orderProductbyprops[0].order_id.orderTotalPay)
      console.log("data",this.data)
    })
  },
  createOrder(data){
    let that =this,
    {orderStatus,payTime}=data
    console.log("this.data.order.good",this.data.order.good)
    
    let id=new Date().getTime()+parseInt(Math.random(),10),
           openid=app.globalData.openid
    let orderData = {
      "count": that.data.order.selectCount,
      "createdAt": new Date().toLocaleDateString().split("/").join("-")+' '+new Date().toLocaleTimeString().slice(2),
      "deliveryTime": "",
      "id": id,
      "orderLogistics_id": "",
      "orderPay_id": "546455464456",
      "orderShipFee": 0,
      "orderStatus": orderStatus,
      "orderTotalPay": that.data.sumPrice/100,
      "payTime": payTime,
      "productTotalPay": that.data.order.good.price *that.data.order.selectCount,
      "updatedAt": "",
      "userAddress_id": that.data.defaultAddress.id,
      "user_id": openid
    }
    createOrder(orderData).then((e) => {
      console.log('创建订单成功', e)
    })


    let productData = {
      "count": that.data.order.selectCount,
      "createdAt": new Date().toLocaleDateString().split("/").join("-")+' '+new Date().toLocaleTimeString().slice(2),
      "id": id+"product",
      "orderPay": 10,
      "order_id": id,
      "productPay": that.data.order.good.price *that.data.order.selectCount,
      "product_id": that.data.order.good.id,
      "remark": that.data.message,
      "unit": "100",
      "updatedAt": "",
      "user_id": openid
    }

    console.log("productData",productData)
    
    createProductOrder(productData).then((e)=>{
      console.log("创建订单产品信息成功",e)
    })





  }
})
