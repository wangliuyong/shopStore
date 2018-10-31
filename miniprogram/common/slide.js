import configs from '../configs'
let {config}=configs

var gql = require('../graphql/wxgql.js');
var GraphQL = gql.GraphQL;
var gql = GraphQL({
  url: config.HTTP_DATA_URL
},true);


var getSlideImg=function(){
      return gql.query({
        query: `query {
          slideshow:slideshow_by_props{
          picture
          }
          magazineList:magazine_by_props {
          id
          magazineName:name,
          picture,
          magazineIntro,
          unitPrice
          enableSub
          }
         }`,
        variables: {
        }
      }).then((res) => {
        //成功
        return res
      }).catch(function () {
        //失败  
      });
}

export default {
    getSlideImg
}