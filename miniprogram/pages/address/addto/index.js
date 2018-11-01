//index.js
import pay from '../../../common/pay'

let {payRuqest}=pay

const app = getApp()

Page({
  data: {
    region: ['安徽省', '合肥市', ''],
    //
    user:{
      contact:"",
      telephone:"",
      area:"",
      area_detail:"",
      postcode:""
    },
    contacts:{}
  },
  onLoad: function(option) {
    console.log(option)    
  },
  onShow(){
    let that=this
    console.log('addrshow')
   
    wx.getStorage({
      key: 'contacts',
      success (res) {
        console.log('res',res.data)
        that.setData({
          contacts:res.data,
        }) 
        console.log('-----------------------')
        console.log('contacts',that.data.contacts)
      } 
    })

    
  },
  clickLocation(){
    console.log("click location")
  },
  changeInput(e){
    let index=e.currentTarget.id
    if(index=='1'){this.setData({"user.contact":e.detail})}
    if(index=='2'){this.setData({"user.telephone":e.detail})}
    if(index=='4'){this.setData({"user.area_detail":e.detail})}
    if(index=='5'){this.setData({"user.postcode":e.detail})}
    console.log(this.data)
  },
  clickArea(){

  },
  bindRegionChange(e){
    console.log(e.detail.value)
    this.setData({"user.area":e.detail.value[0]+e.detail.value[1]+e.detail.value[2]})
  },
  save(){
    let save=true
    let user=this.data.user;
    for(let key in user){
      if(user[key]==''){
        save=false
      }
    }
    if(save){
      //提交数据,要修改
      wx.setStorage({
        key:"contacts",
        data:this.data.user,
        success(){
          wx.navigateBack({
            delta: 1
        })
        }
      })
    }else{
      wx.showToast({
        title: '内容不能为空',
        icon: 'none',
        duration: 1000
      })
    }
  }
})
