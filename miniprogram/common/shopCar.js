import configs from '../configs'
let {config}=configs


var gql = require('../graphql/wxgql.js');
var GraphQL = gql.GraphQL;
var gql = GraphQL({
  url: config.HTTP_DATA_URL
},true);

let creaShopCar=function(data){
    return gql.mutate({
      mutation:`mutation createUserCar($count: Int!,$createdAt: String!,$id: ID!,$product_id: String!,$updatedAt: String,$user_id: String!){
        create_userCart(count:$count,createdAt:$createdAt,id:$id,product_id:$product_id,updatedAt:$updatedAt,user_id:$user_id){
          count
          createdAt
          id
          product {
            id
          }
          updatedAt
          user_id
        }
      }`,
      variables:data 
    }).then((e)=>{
      return e
    })
}


export default{
  creaShopCar
}



