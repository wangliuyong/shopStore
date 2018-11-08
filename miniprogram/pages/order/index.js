//index.js
//import data from '../../data'
import pay from '../../common/pay'
import product from '../../common/goods'
import address from '../../common/address'
import order from '../../common/order'


//let {goods}=data
let {payRuqest}=pay
let {getProductById}=product
let {getUserAddressByUser_id}=address
let {createProductOrder,createOrder}=order

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
    sumPrice:0
  },
  onLoad: function(option){
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
    this.getAddressUserId(app.globalData.openid)
    
  },
  change(e){
    this.setData({
      message:e.detail
    })
    console.log("e",e,"this data",this.data.message)
  },
  onSubmit(){
    this.createAllOrder()
  },
  toAdd(){
    wx.navigateTo({
      url: '/pages/address/index'
    })
  },
  //封装的函数
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
  getAddressUserId(id){
    let that=this
    getUserAddressByUser_id(id).then((e)=>{
      console.log("getUserAddressByUser_id",e)
      let address=e.data.userAddress_by_props

      console.log("address",address)
      address=address.filter((item)=>{
        return item.default==1
      })
      that.setData({
        defaultAddress:address[0]
      }) 
    })
  },
  createAllOrder(){
    let that =this
    console.log("this.data.order.good",this.data.order.good)
    let needPay=this.data.order.good.price*this.data.order.selectCount*100,
        openid=app.globalData.openid,
        orderID=new Date().getTime(),
        count=that.data.order.selectCount,
        creaatAt=new Date().toLocaleDateString().split("/").join("-")+' '+new Date().toLocaleTimeString().slice(2),
        productPay=that.data.order.good.price *that.data.order.selectCount,
        id=new Date().getTime()

    console.log('needPay',needPay,'openid',openid)
    console.log("this.data",that.data)
    payRuqest(needPay,openid,(data)=>{
      console.log('res',data)
      if(data==1){
        //支付成功
        //支付成功之后发送请求存入数据库
        console.log('存入数据库')
        //订单产品信息
        let ProductOrdedata={
          "count": count,
          "createdAt":creaatAt ,
          "id": id,
          "orderPay": needPay/100,
          "order_id": orderID,
          "orderPay_id": "finishPay",
          "productImg": that.data.order.good.img,
          "productName": that.data.order.good.name,
          "productPay": productPay,
          "productPrice": that.data.order.good.price,
          "product_id": that.data.order.good.id,
          "remark": that.data.message,
          "unit": "200",
          "user_id": openid
        }

        console.log("orderData",ProductOrdedata)
        createProductOrder(ProductOrdedata).then((e)=>{
          console.log("createProductOrder",e)
        })


        let orderData = {
          "count": count,
          "createdAt": creaatAt,
          "id": id,
          "orderPay_id": "finishPay",
          "orderStatus": "1",
          "orderTotalPay": needPay/100,
          "productTotalPay": productPay,
          "user_id": openid
        }

        createOrder(orderData).then((e)=>{
          console.log("createOrder",e)
        })
          
      }else{
        //订单产品信息
        let ProductOrdedata={
          "count": count,
          "createdAt":creaatAt ,
          "id": id,
          "orderPay": needPay/100,
          "order_id": orderID,
          "orderPay_id": "waitPay",
          "productImg": that.data.order.good.img,
          "productName": that.data.order.good.name,
          "productPay": productPay,
          "productPrice": that.data.order.good.price,
          "product_id": that.data.order.good.id,
          "remark": that.data.message,
          "unit": "200",
          "user_id": openid
        }

        console.log("orderData",ProductOrdedata)
        createProductOrder(ProductOrdedata).then((e)=>{
          console.log("createProductOrder",e)
        })


        
        let orderData = {
          "count": count,
          "createdAt": creaatAt,
          "id": id,
          "orderPay_id": "waitPay",
          "orderStatus": "0",
          "orderTotalPay": needPay/100,
          "productTotalPay": productPay,
          "user_id": openid
        }


        createOrder(orderData).then((e)=>{
          console.log("createOrder",e)
        })


      }
    })
  }
  
})
