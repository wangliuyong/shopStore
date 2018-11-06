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
let {createOrder}=order

const app = getApp()

Page({
  data: {
    order:{
      good:{},
      selectCount:""
    },
    defaultAddress:{},
    //
    message:"",
    sumPrice:0
  },
  onLoad: function(option) {

    
    


    console.log(option,">option")
    getProductById(option.id).then((e)=>{
      console.log(e.data.product_by_id)
      this.setData({
        "order.good":e.data.product_by_id,
        "order.selectCount":option.count
      })
      console.log(this.data.order.good.price,this.data.order)
      this.setData({sumPrice:this.data.order.good.price*this.data.order.selectCount*100})
      
    })
    console.log(option)
  },
  onShow(){
    let that=this
    console.log('ordershow')

    getUserAddressByUser_id('asasa').then((e)=>{
      console.log("getUserAddressByUser_id",e)
      let address=e.data.userAddress_by_props
      address=address.filter((item)=>{
        return item.default==1
      })
      console.log(address)

      that.setData({
        defaultAddress:address[0]
      })
    })
    
  },
  change(e){
    this.setData({
      message:e.detail
    })
    console.log("e",e,"this data",this.data.message)
  },
  onSubmit(){
    let that =this
    console.log("this.data.order.good",this.data.order.good)
    let needPay=this.data.order.good.price*this.data.order.selectCount*100
    let openid=app.globalData.openid

    console.log('needPay',needPay,'openid',openid)
    payRuqest(needPay,openid,(data)=>{//假数据
      console.log('res',data)
      if(data==1){
        //支付成功
        //支付成功之后发送请求存入数据库
        console.log('存入数据库')
        

        let data={
          "count": that.data.order.selectCount,
          "createdAt": new Date().toLocaleDateString().split("/").join("-")+' '+new Date().toLocaleTimeString().slice(2),
          "id": new Date().getTime(),
          "orderPay_id": "finishPay",
          "orderStatus": "1",
          "orderTotalPay": needPay/100,
          "productTotalPay": needPay/100,
          "user_id": openid 
        }

        console.log("orderData",data)
        createOrder(data).then((e)=>{
          console.log(e)
        })
      }else{
        console.log('支付失败')
        let data={
          "count": that.data.order.selectCount,
          "createdAt": new Date().toLocaleDateString().split("/").join("-")+' '+new Date().toLocaleTimeString().slice(2),
          "id": new Date().getTime(),
          "orderPay_id": "waitPay",
          "orderStatus": "0",
          "orderTotalPay": 0,
          "productTotalPay": needPay/100,
          "user_id": openid 
        }

        console.log("orderData",data)
        createOrder(data).then((e)=>{
          console.log("createOrderRes",e)
        })


      }
    })
  },
  toAdd(){
    wx.navigateTo({
      url: '/pages/address/index'
    })
  }
})
