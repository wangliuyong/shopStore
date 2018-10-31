import configs from '../configs'
let {config}=configs

var payRuqest=function(needPay,openid) {
    let tradeNo = new Date().getTime();
      //向后端请求数据
     return wx.request({
        url: config.HTTP_PAY_URL,
        data: {
          needPay,
          openid,
          tradeNo
        },
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          if (res.data) {
            let {
              nonceStr,
              paySign,
              timeStamp,
              signType
            } = res.data;
            let package1 = res.data.package;
            //package是严格模式下的保留字
            return wx.requestPayment({
              'timeStamp': timeStamp,
              'nonceStr': nonceStr,
              'package': package1,
              'signType': signType,
              'paySign': paySign,
              'success': function (res) {
                
                return 1
              },
              'fail': function (res) {
               
                return 0
              },
              'complete': function (res) {}
            })
  
          }
        },
        fail(res) {
          
          return 1
        }
      })
  }
  
  
  
  export default {
    payRuqest
  }

