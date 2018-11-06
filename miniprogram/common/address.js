import configs from '../configs'
let {config}=configs


var gql = require('../graphql/wxgql.js');
var GraphQL = gql.GraphQL;
var gql = GraphQL({
  url: config.HTTP_DATA_URL
},true);

let createUserAddress=function(data){
    return gql.mutate({
        mutation:`mutation createUserAddress($address: String!,$area: String!,$city: String!,$default: Int,$deleteddAt: String,$id: ID!,$postcode: String,
            $province: String!,$telephone: String!,$updatedAt: String,$user_id: String!,$username: String!){
        create_userAddress(address:$address,area:$area,city:$city,default:$default,deleteddAt:$deleteddAt,id:$id,postcode:$postcode,
        province:$province,telephone:$telephone,updatedAt:$updatedAt,user_id:$user_id,username:$username){
        address
        area
        city
        createdAt
        default
        deleteddAt
        id
        postcode
        province
        telephone
        updatedAt
        user_id
        username
        }
        }`,
        variables:data 
      }).then((e)=>{
        return e
      })
}

let getUserAddressByUser_id=function(userId){
    return gql.query({
        query:`query getUserAddressByUser_id($user_id: String){
            userAddress_by_props(user_id:$user_id){
              address
              area
              city
              createdAt
              default
              id
              postcode
              province
              telephone
              updatedAt
              user_id
              username
            }
          }`,
        variables:{
            user_id:userId
        }
    }).then((e)=>{
        return e
    })
}

export default {
    createUserAddress,
    getUserAddressByUser_id
}