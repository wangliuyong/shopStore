//index.js
import data from '../../data'
import shopCar from '../../common/shopCar' 
import pay from '../../common/pay'

let {getAllShopCar,deleteShopCar}=shopCar
let {payRuqest}=pay

const app = getApp()

Page({
  data: {
    sumPrice:0,
    allGood:{},
    good_id:"",
    allGoods:[],
    sumPrice:""
  },
  onLoad: function(option) {
   console.log('option',option)
  },
  onShow(){
    this.getShopCar()
  },
  delete(e){
    console.log(e.currentTarget.id)
    deleteShopCar({id:e.currentTarget.id}).then((e)=>{
      console.log(e)
    })
    this.getShopCar()
  },
  onSubmit(){
    let that =this;
    let needPay=this.data.sumPrice,openid=app.globalData.openid
    console.log(needPay,openid)
    payRuqest(needPay,openid,(data)=>{
      if(data==1){
        //支付成功之后创建订单
        deleteShopCar({user_id:app.globalData.openid}).then((e)=>{
          that.getShopCar()
        })
      }else{
        //提示支付不成功

      }
      
    })

  },

  //封装的函数
  getShopCar(){
    getAllShopCar({"user_id":app.globalData.openid}).then((e)=>{
      console.log("getAllShopCar",e.data.userCartbyprops)
      this.setData({
        allGoods:e.data.userCartbyprops
      })
      let sum=0;
      e.data.userCartbyprops.map((item)=>{
        sum+=item.count*item.product.price
      })

      console.log(sum)
      this.setData({
        sumPrice:sum*100
      })
    })

  }

})
