import configs from '../configs'
let {config}=configs


var gql = require('../graphql/wxgql.js');
var GraphQL = gql.GraphQL;
var gql = GraphQL({
  url: config.HTTP_DATA_URL
},true);

let createOrder=function(data){
    return gql.mutate({
        mutation:`mutation createOrder($count: Int!,$createdAt: String!,$deliveryTime: String,$id: ID!,$orderLogistics_id: String,$orderPay_id: String!,
            $orderShipFee: Float,$orderStatus: String!,$orderTotalPay: Float!,$payTime: String,$productTotalPay: Float!,$updatedAt: String,$user_id: String!){
              create_order(count:$count,createdAt:$createdAt,deliveryTime:$deliveryTime,id:$id,orderLogistics_id:$orderLogistics_id,
              orderPay_id:$orderPay_id,orderShipFee:$orderShipFee,orderStatus:$orderStatus,orderTotalPay:$orderTotalPay,payTime:$payTime,productTotalPay:$productTotalPay,
              updatedAt:$updatedAt,user_id:$user_id){
                count
                createdAt
                id
                orderPay {
                  id
                  order {
                    id
                  }
                  payTime
                  totalPay
                  transactionId
                  user_id
                }
                orderStatus
                orderTotalPay
                count
              }
            }`,
        variables:data 
      }).then((e)=>{
        return e
      })
}

export default {
    createOrder
}