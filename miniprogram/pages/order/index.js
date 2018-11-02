//index.js
import data from '../../data'
import pay from '../../common/pay'

let {goods}=data
let {payRuqest}=pay
const app = getApp()

Page({
  data: {
    order:{
      good:{},
      selectCount:""
    },
    message:"",
    contacts:{},
    address:"",
    sumPrice:0,
    leaveMessage:""
  },
  onLoad: function(option) {
    //option={id:1,count:2}//假数据,调试完就删
    //console.log('-------111-----------------')
    console.log(option)
    console.log(goods)
    let good=goods.filter((item)=>{
      return item.id==option.id
    })

    console.log("good",good)

    this.setData({
     "order.good":good[0],
     "order.selectCount":option.count
    })
    //console.log('-------2------------------')
    //console.log('sumPrice',this.data.order.good.price*this.data.order.selectCount)
    this.setData({sumPrice:this.data.order.good.price*this.data.order.selectCount*100})


  },
  onShow(){
    let that=this
    console.log('ordershow')
    wx.getStorage({
      key: 'contacts',
      success (res) {
        console.log('res',res.data)
        that.setData({
          contacts:res.data,
          address:res.data.contact+res.data.telephone+res.data.area
        })
      } 
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
      let createdAt=new Date().toLocaleDateString().split("/").join("-")+' '+new Date().toLocaleTimeString().slice(2),
                id=new Date().getTime()
      wx.setStorage({
        key:"orderSuccess",
        data:{
          id,
          user_id,
          product_id,
          productName,
          productImg,
          productPrice,
          unit,
          count,
          productPay,
          orderPay,
          remark,
          createdAt,
          updatedAt
        }
      })
      }else{
        console.log('支付失败')
        let createAt=new Date().toLocaleDateString().split("/").join("-")+' '+new Date().toLocaleTimeString().slice(2),
                id=new Date().getTime()
        wx.setStorage({
          key:"orderFail",
          data:{
            openid:app.globalData.openid,
            good_id:that.data.order.good.id,
            orderStatus:"waitPay",
            havePay:that.data.sumPrice,
            subCount:that.data.order.selectCount,
            leaveMessage:this.data.message,
            contact:this.data.contacts,
            createAt,
            id
          }
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
