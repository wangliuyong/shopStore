import configs from '../configs'
let {config}=configs


var gql = require('../graphql/wxgql.js');
var GraphQL = gql.GraphQL;
var gql = GraphQL({
  url: config.HTTP_DATA_URL
},true);

let createProductOrder=function(data){
    return gql.mutate({
        mutation:`mutation createorderProduct($productPrice: Float,$updatedAt: String, $unit: String!,$remark: String, $product_id: String!,$productImg: String ,$productPay: Float,$productName: String,$orderPay: Float!, $createdAt: String!, $order_id: String!, $id: ID!, $count: Int!, $user_id: String!,$orderStatus: String,
            ) {
                createorderProduct: create_orderProduct(remark:$remark productPrice:$productPrice updatedAt: $updatedAt unit: $unit productPay:$productPay productImg:$productImg productName:$productName product_id: $product_id orderPay: $orderPay createdAt: $createdAt order_id: $order_id id: $id count: $count user_id: $user_id) {
                    remark
                    updatedAt
                    unit
                    orderPay
                    createdAt
                    productImg
                    productName
                    product {
                        category
                        updatedAt
                        unit
                        name
                        createdAt
                        status
                        id
                        intro
                        price
                        img
                        stock
                    }
                    productPrice
                    id
                    count
                    productPay
                    user_id
                    order {
                        deliveryTime
                        updatedAt
                        payTime
            
            
                        orderTotalPay
                        createdAt
                        orderStatus
                        id
                        orderShipFee
                        count
                        user_id
                        productTotalPay
                    }
                }
            }`,
        variables:data 
      }).then((e)=>{
        return e
      })
}



let createOrder=function(data){
  return gql.mutate({
      mutation:`mutation createorder($deliveryTime: String, $updatedAt: String, $orderLogistics_id: String, $payTime: String, $orderTotalPay: Float!, $createdAt: String!, $orderStatus: String!, $id: ID!, $orderShipFee: Float, $count: Int!, $user_id: String!, $productTotalPay: Float!, $orderPay_id: String!) {
        createorder: create_order(deliveryTime: $deliveryTime updatedAt: $updatedAt orderLogistics_id: $orderLogistics_id payTime: $payTime orderTotalPay: $orderTotalPay createdAt: $createdAt orderStatus: $orderStatus id: $id orderShipFee: $orderShipFee count: $count user_id: $user_id productTotalPay: $productTotalPay orderPay_id: $orderPay_id) {
            deliveryTime
            updatedAt
            payTime
            orderPay {
                id
                user_id
    
                totalPay
                transactionId
                payTime
            }
            orderLogistics {
                updatedAt
                logisticsFee
                expressId
                createdAt
                consigneeTel
                id
                consignAddress
                LogisticsStatus
                user_id
    
                consigneeName
            }
            orderTotalPay
            createdAt
            orderStatus
            id
            orderShipFee
            count
            user_id
            productTotalPay
        }
    }`,
      variables:data 
    }).then((e)=>{
      return e
    })
}



export default {
  createProductOrder,
  createOrder
}