import configs from '../configs'
let {config}=configs


var gql = require('../graphql/wxgql.js');
var GraphQL = gql.GraphQL;
var gql = GraphQL({
  url: config.HTTP_DATA_URL
},true);

let getProductByStatus=function(status){
    return gql.query({
        query: `query getProductByStatus($status: String){
            product_by_props(status:$status){
              category
              createdAt
              id
              img
              intro
              name
              price
              status
              stock
              unit
              updatedAt
            }
          }`,
        variables: {
            status
        }
      }).then((res) => {
        return res
      }).catch(() => {
    
      })
}

let getProductById=function(id){
    return gql.query({
        query: `query getProductById($id:ID){
            product_by_id(id:$id){
              category
              createdAt
              id
              img
              intro
              name
              price
              status
              stock
              unit
              updatedAt
            }
          }`,
        variables: {
            id
        }
      }).then((res) => {
        return res
      }).catch(() => {
    
      })
}

export default {
    getProductByStatus,
    getProductById
}