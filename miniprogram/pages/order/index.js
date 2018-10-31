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

  }
})
