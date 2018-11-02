//index.js
import data from '../../data'
import product from '../../common/goods'

let {getProductById}=product
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

    getProductById(option.id).then((e)=>{
      console.log('goodByid',e.data.product_by_id)
      console.log("option",option)
      this.setData({
        good:e.data.product_by_id
      })
    })
    //option.id=2//测试用,记得删除
    
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
    let that=this
    //发送请求存储的购物车
    //发送的数据有
    wx.showToast({
      title: '加入购物车成功',
      icon: 'success',
      duration: 1000
    })
  },
  onClickToCar(){
    wx.switchTab({
      url: '/pages/shopCar/index?id='+this.data.good.id+"&count="+this.data.selecCount
    })
  }

})
