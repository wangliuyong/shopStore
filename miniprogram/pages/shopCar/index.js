//index.js
import data from '../../data'
let {goods}=data
const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    sumPrice:11,
    allGood:{},
    good_id:"",
    allGoods:[
      {buycount:2,id:1,count:1000,name:"红富士苹果1",goodintro:"选自天然",sort:"fruit",img:"http://www.snbl.com.cn/administer/eWebEditor/UploadFile/2018871341203.jpg",price:0.01},
    {buycount:2,id:2,count:102,name:"红富士苹果2",goodintro:"选自天然",sort:"fruit",img:"http://www.snbl.com.cn/administer/eWebEditor/UploadFile/20188713426734.jpg",price:0.01},
    {buycount:2,id:3,count:1020,name:"小学低年级版",goodintro:"适合小学生",sort:"magazine",img:"http://www.snbl.com.cn/administer/eWebEditor/UploadFile/20188713445428.jpg",price:0.01},
    {buycount:2,id:4,count:145,name:"高中版",goodintro:"适合高中生",sort:"magazine",img:"http://qqacc.ioobot.com/20188713436270.jpg",price:0.01}
    ]
  },
  onLoad: function(option) {
   console.log('option',option)
  },
  onShow(){
    let that=this
    console.log('----3-----')
    console.log('shopCarshow')

    wx.getStorage({
      key: 'orderFail',
      success (res) {
        console.log('orderFail',res.data)
      } 
    })
    
    //console.log('res.data.good_id',res.data.good_id,'goods',goods)
    let good=goods.filter((item)=>{
      return item.id==this.data.good_id
    })
    console.log("good",good)
    this.setData({
     good:good
    })

    console.log('----0-----')
  },
  jia:function (e){
    this.jiaj(e,true);
  },
  jian:function (e){
    this.jiaj(e,false);
  },
  jiaj:function (e,boo){
    var id = e.currentTarget.dataset.id;
    var s = 0;
    var allGoods = this.data.allGoods;
    for(var i=0;i<allGoods.length;i++){
        if(allGoods[i].id==id){
            if(boo){
                s = allGoods[i].buycount+1;
            }else{
                s = allGoods[i].buycount-1;
            }
            //最低值不得低于1
            if(1>s){
                allGoods.splice(i, 1);
            }else{
                allGoods[i].buycount = s;
            }
            break;
          }
    }
    wx.setStorageSync('shoppingcar', allGoods);
    this.setData({
      allGoods:allGoods
    });
    //this.showAllGoods();
  }
})
