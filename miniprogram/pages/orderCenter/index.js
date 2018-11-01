//index.js
const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    orderList:[
      {id:54456,code:897977,status:1,goods:[{id:3,count:1020,name:"小学低年级版",goodintro:"适合小学生",sort:"magazine",picture:"http://www.snbl.com.cn/administer/eWebEditor/UploadFile/20188713445428.jpg",price:0.01}],amount:2},
      {id:54431256,code:892137977,status:0,goods:[{id:4,count:145,name:"高中版",goodintro:"适合高中生",sort:"magazine",picture:"http://qqacc.ioobot.com/20188713436270.jpg",price:0.01}],amount:2},
      {id:333,code:33213,status:1,goods:[{id:1,count:1000,name:"红富士苹果1",goodintro:"选自天然",sort:"fruit",picture:"http://www.snbl.com.cn/administer/eWebEditor/UploadFile/2018871341203.jpg",price:0.01}],amount:2}
    ]
  },

  onLoad: function() {
   
  },
  pay(){
    //去支付
    wx.navigateTo({
      url: '/pages/order/index?id=2&count=3'
    })
  },
  cancelOrder(){
    //取消订单
  }
})
