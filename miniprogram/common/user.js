import configs from '../configs'
let {config}=configs


var gql = require('../graphql/wxgql.js');
var GraphQL = gql.GraphQL;
var gql = GraphQL({
  url: config.HTTP_DATA_URL
},true);

var createUser=function(user) {
    let {createdAt,email,openid,password,telephone,updatedAt,userData_id,username}=user
  return gql.mutate({
    mutation: `mutation createUser($createdAt:String,$email: String,$openid: String,$password: String,$telephone: String,
        $updatedAt: String,$userData_id: String,$username: String){
        create_user(createdAt:$createdAt,email:$email,openid:$openid,password:$password,telephone:$telephone,
        updatedAt:$updatedAt,userData_id:$userData_id,username:$username){
        createdAt
        email
        openid
        password
        telephone
        userData {
        id
        }
        username
        updatedAt

        }
}`,
    variables: {
        createdAt,email,openid,password,telephone,updatedAt,userData_id,username
    }
  }).then((res) => {
    return res
  }).catch(() => {

  })
}

var getUserByOpenid=function(openid) {
  return gql.query({
    query: `query getUserByOpenid($openid:String){
        user_by_props(openid:$openid){
          openid
        }
      }`,
    variables: {
        openid
    }
  }).then((res) => {
    return res
  }).catch(() => {

  })
}



export default{
    createUser,
    getUserByOpenid
}