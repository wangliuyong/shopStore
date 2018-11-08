//index.js
import user from '../../common/user'

let {
  createUser,
  getUserByOpenid
} = user

const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: ''
  },

  onLoad: function () {
    console.log('----------1---------')
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log('----------1-2---------',res)
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          console.log('----------1-3---------',res)
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
              getUserByOpenid(app.globalData.openid).then((e) => {
                console.log('用户')
                console.log('useropenid', e.data.user_by_props)
                if (e.data.user_by_props.length!=0) {
                  console.log('用户已经存在')
                } else {
                  let createdAt = new Date().toLocaleDateString().split("/").join("-") + ' ' + new Date().toLocaleTimeString().slice(2),
                    openid = app.globalData.openid,
                    username = res.userInfo.nickName
                  let user = {
                    createdAt,
                    email: '1355498705@qq.com',
                    openid:openid,
                    password: '135549',
                    telephone: '13222637947',
                    updatedAt: '2019-12-11',
                    user_id: openid,
                    username
                  }

                  console.log('user',user)
                  createUser(user).then((e) => {
                    console.log('创建用户', e)
                  })
                } 
              })
              console.log(this.data)//

            }
          })
        }
      }
    })
  },
  onShow(){
    console.log("userInfo---------------------")
    console.log('userInfo',this.data.userInfo)
  },
  address() {
    wx.navigateTo({
      url: '/pages/address/index'
    })
  },
  order() {
    wx.navigateTo({
      url: '/pages/orderCenter/index'
    })
  },
  /* getuser(e){
    console.log('user',e)
  } */
})