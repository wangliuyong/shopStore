//index.js
import img from '../../common/slide'
//import data from '../../data'
import product from '../../common/goods'



let {getProductByStatus}=product
//let {goods}=data

let {getSlideImg}=img
const app = getApp()

Page({
  data: {
    slideShow:[],
    logged: false,
    search:"",
    //伪造数据
    goods:[],
    magazine:[],
    fruit:[],
    allGoods:[]
  },
  onLoad: function() {
    getProductByStatus("1").then((e)=>{
      this.categoricalData(e);
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
  },
  onSearch(){
    
  },
  //封装函数
  categoricalData(e){
    console.log('product',e.data.product_by_props)
    let category=[];
    e.data.product_by_props.map((item)=>{
      category.push(item.category)
    })
    category=Array.from(new Set(category))
    console.log("category",category)
    let allGoods=[];

    allGoods.push({
      category:"所有果品",
      goods:e.data.product_by_props
    })
    category.map((it)=>{
      let hash={}
      hash["category"]=it;
      hash.goods=e.data.product_by_props.filter((item)=>{
        return item.category==it
      })
      allGoods.push(hash)
    })

    console.log('allGoods',allGoods)
    this.setData({
      allGoods:allGoods
    })
  }
})
