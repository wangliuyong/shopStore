//index.js
import img from '../../common/slide'
import data from '../../data'
import product from '../../common/goods'



let {getProductByStatus}=product
let {goods}=data

let {getSlideImg}=img
const app = getApp()

Page({
  data: {
    slideShow:[],
    logged: false,
    search:"",
    //伪造数据
    goods:[],
    magazine:[]
  },
  onLoad: function() {
    getProductByStatus("1").then((e)=>{
      console.log('product',e.data.product_by_props)
      this.setData({
        goods:e.data.product_by_props
      })
      let magazine=this.data.goods.filter((item)=>{
        //01水果 02杂志
        return item.category=="02"
      })
      console.log(magazine)
      this.setData({
        magazine:magazine
      })
    })
    
  },
  onShow(){
    
  },
  onSearch(e){
    console.log(e)
    console.log(this.data)
  },
  clickTab(e){
    console.log(e)
    
  },
  clickGood(e){
    console.log(e.currentTarget.id)
    wx.navigateTo({
      url: '/pages/detail/index?id='+e.currentTarget.id
    }) 
  }
})
