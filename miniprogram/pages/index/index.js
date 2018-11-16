//index.js
import img from '../../common/slide'
//import data from '../../data'
import product from '../../common/goods'



let {getProductByProps}=product
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
    this.getProduct({status:'1'})
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
  onSearch(e){
    console.log(e.detail)
    let value =e.detail
    //得到所有产品的名字，进行模糊搜索
    let product=[],name='';
    this.data.allGoods.map((item)=>{
      if(item.category=="所有果品"){
        product=item.goods
      }
    })

    console.log(product)
    product.map((item)=>{
     
      if(item.name.indexOf(value)!=-1){
        console.log(item.name)
        name=item.name
      }
    })


  },
  //封装函数
  getProduct(data){
    getProductByProps(data).then((e)=>{
      this.categoricalData(e);
    })
  },
  //分类
  categoricalData(e){

    console.log('product',e.data.productbyprops)
    let category=[];
    e.productbyprops.map((item)=>{
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
