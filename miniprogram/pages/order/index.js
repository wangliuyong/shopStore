//index.js
import data from '../../data'
import pay from '../../common/pay'

let {goods}=data
let {payRuqest}=pay
const app = getApp()

Page({
  data: {
    //
    order:{
      good:{},
      selectCount:""
    },
    message:""
  },
  onLoad: function(option) {
    option={id:1,count:2}//假数据,调试完就删
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

  },
  onShow(){
    console.log('order')
  },
  change(e){
    console.log("e",e,"this data",this.data.message)
    this.setData({
      message:e.detail
    })
  },
  onSubmit(){
    this.payRuqest(100)
  },
  toAdd(){
    wx.navigateTo({
      url: '/pages/address/index'
    })
  },
  //支付
  payRuqest(needPay) {
    var _this=this;
    let tradeNo = new Date().getTime();
    let openid = ''
    //调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {}
    }).then((res) => {
      openid = res.result.openid
      sendPay();
    })

    //发送支付请求
    function sendPay() {
      //向后端请求数据
      wx.request({
        url: 'https://xcx.ioobot.com/payinfo',
        data: {
          needPay,
          openid,
          tradeNo
        },
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          if (res.data) {
            requestPayment(res)
          }
        },
        fail(res) {
          wx.showToast({
            title: '支付失败'
          })
        }
      })
    }
    //调起支付
    function requestPayment(res) {
      let {
        nonceStr,
        paySign,
        timeStamp,
        signType
      } = res.data;
      let package1 = res.data.package;
      //package是严格模式下的保留字
      wx.requestPayment({
        'timeStamp': timeStamp,
        'nonceStr': nonceStr,
        'package': package1,
        'signType': signType,
        'paySign': paySign,
        'success': function (res) {
          wx.showToast({
            title: '支付成功'
          })
          //支付成功之将预定成功的杂志数据发送到后端      
          _this.setData({
            "order.orderStatus":"finishPay"
          })
          _this.createOrder(_this.data.order)

          console.log(_this.data.order)

          setTimeout(()=>{
            wx.switchTab({
              url: '/pages/my/my'
            })
            app.globalData.pay=true
          },1000)
        },
        'fail': function (res) {
          wx.showToast({
            title: '支付失败'
          })

          _this.createOrder(_this.data.order)
          console.log(_this.data.order)
          setTimeout(()=>{
            wx.switchTab({
              url: '/pages/my/my?pay=false'
            })
            app.globalData.pay=false
          },1000)
        },
        'complete': function (res) {}
      })
    }
  }
})
