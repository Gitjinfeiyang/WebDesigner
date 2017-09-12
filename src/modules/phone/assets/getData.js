/**
 * Created by Jinfeiyang on 2017-08-30.
 */
import axios from 'axios';

let api = axios.create({
  baseURL: '/api/wz',
  // headers: {
  //   'Content-Type': 'application/x-www-form-urlencoded',
  // },
  //   onUploadProgress: function (progressEvent) {
  //   console.log(progressEvent)
  // }
});

const IMGURL='http://10.10.77.62/';

class Api {

  getValiCode(userId){
    return api.get(`/message/getValidCode.json?userId=${userId}`);
  }

  addMessage(message){
    return api.post('/message/add.json',message);
  }

  getIndex(userId,templateCode,type=''){
    let baseUrl=`/templateSet/main.json?userId=${userId}`;
    if(type=='view'){
      baseUrl+=`&templateCode=${templateCode}&type=view`
    }
    return api.get(baseUrl)
  }

  getArticles(userId,source){
    let sourceArray=source.toString().split(',');
    if(sourceArray.length>2){
      return api.get(`/artice/find.json?userId=${userId}&ids=${source}`)
    }else{
      return api.get(`/artice/findOne.json?id=${source}`)
    }
  }


  getUserInfo(userId){
    return api.get(`/wzUser/findOne.json?userId=${userId}`)
  }

  getDefaultTemplate(userId){
    return api.get(`/userTemplate/findDefaultTemp.json?userId=${userId}`)
  }

}



let API =new Api();

export {API,IMGURL};
