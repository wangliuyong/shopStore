//index.js
import img from '../../common/slide'
import data from '../../data'
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
    console.log(goods)
    this.setData({
      goods:goods
    })

    /* getSlideImg().then((e)=>{
      console.log("slideImg",e)
    }); */

    let magazine=this.data.goods.filter((item)=>{
      return item.sort=="magazine"
    })
    console.log(magazine)
    this.setData({
      magazine:magazine
    })
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
