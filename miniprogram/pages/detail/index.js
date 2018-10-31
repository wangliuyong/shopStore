//index.js
import data from '../../data'
let {goods}=data

const app = getApp()

Page({
  data: {
    logged: false,
    good:{},
    show:false,
    selecCount:1
  },

  onLoad: function(option) {
    option.id=2//测试用,记得删除
    console.log("option",option)
   let good=goods.filter((item)=>{
     return item.id==option.id
   })
   console.log("good",good)
   this.setData({
    good:good[0]
   })
  },
  onShow(){
    console.log('detail')
  },
  countChange(e){
    this.setData({
      selecCount:e.detail
    })
    console.log(this.data.selecCount)
  },
  onShowPay(){
    console.log("去支付")
    this.setData({
      show:true
    })
  },
  onClose() {
    this.setData({ show: false });
  },
  toPay(){
    wx.navigateTo({
      url: '/pages/order/index?id='+this.data.good.id+"&count="+this.data.selecCount
    })
  },
  addCar(){
    wx.switchTab({
      url: '/pages/shopCar/index?id='+this.data.good.id+"&count="+this.data.selecCount
    })
  }
})
