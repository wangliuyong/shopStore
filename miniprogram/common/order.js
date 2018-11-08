import configs from '../configs'
let {config}=configs


var gql = require('../graphql/wxgql.js');
var GraphQL = gql.GraphQL;
var gql = GraphQL({
  url: config.HTTP_DATA_URL
},true);

let createProductOrder=function(data){
    return gql.mutate({
        mutation:`mutation createOrderproduct($remark: String, $updatedAt: String, $unit: String!, $product_id: String!, $orderPay: Float!, $createdAt: String!, $productImg: String, $productName: String, $order_id: String!, $productPrice: Float, $id: ID!, $count: Int!, $productPay: Float, $user_id: String!, $orderPay_id: String) {
            createOrderproduct: create_orderProduct(remark: $remark updatedAt: $updatedAt unit: $unit product_id: $product_id orderPay: $orderPay createdAt: $createdAt productImg: $productImg productName: $productName order_id: $order_id productPrice: $productPrice id: $id count: $count productPay: $productPay user_id: $user_id orderPay_id: $orderPay_id) {
                remark
                updatedAt
                unit
                orderPay {
                    id
                    user_id
        
                    totalPay
                    transactionId
                    payTime
                }
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

let getOrderProduct=function(data){
    return gql.query({
        query: `query orderProductByProps($remark: String, $updatedAt: String, $unit: String, $product_id: String, $orderPay: Float, $createdAt: String, $productImg: String, $productName: String, $order_id: String, $productPrice: Float, $count: Int, $productPay: Float, $user_id: String, $orderPay_id: String) {
            orderProductByProps: orderProduct_by_props(remark: $remark updatedAt: $updatedAt unit: $unit product_id: $product_id orderPay: $orderPay createdAt: $createdAt productImg: $productImg productName: $productName order_id: $order_id productPrice: $productPrice count: $count productPay: $productPay user_id: $user_id orderPay_id: $orderPay_id) {
                remark
                updatedAt
                unit
                orderPay {
                    id
                    user_id
                    totalPay
                    transactionId
                    payTime
                }
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
        variables: data
      }).then((res) => {
        return res
      }).catch((error) => {
        return error
      })
}
export default {
  createProductOrder,
  createOrder,
  getOrderProduct
}