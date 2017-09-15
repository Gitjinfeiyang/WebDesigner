/**
 * Created by Jinfeiyang on 2017-08-25.
 */
import axios from 'axios';
import {store} from '../vuex/store'
let  testServer='http://10.10.77.62:6080/wz';
let proxy='/api/wz'

let api = axios.create({
  baseURL: proxy,
  // headers: {
  //   'Content-Type': 'application/x-www-form-urlencoded',
  // },
  //   onUploadProgress: function (progressEvent) {
  //   console.log(progressEvent)
  // }
});

let uploadApi=axios.create({
  baseURL:proxy,
  headers:{
    'Content-Type': 'multipart/form-data',
  }
});

let auth=axios.create({
  baseURL:'/auth',
  // headers:{
  //   'Content-Type':'application/x-www-form-urlencoded'
  // }
})


const IMGURL='http://10.10.77.62/';



api.interceptors.request.use(function (config) {
  // Do something before request is sent
  if(config.url.indexOf('?')>0){
    config.url+='&timestamp='+new Date().getTime();
  }else{
    config.url+='?timestamp='+new Date().getTime();
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

// Add a response interceptor
api.interceptors.response.use(function (response) {
  // Do something with response data
  console.log(response)
  return response;
}, function (error) {
  // Do something with response error
  console.log('服务器错误')
  return Promise.reject(error);
});

class Api {

  test(){
    return api.get(`/wzUser/getUserId.json`)
  }

  testXiangyong(){
    return auth.post('/services/user/postUser.json',{userName:'xiangyong'})
  }



  getUserId(){
    return api.get('/wzUser/getUserId.json');
  }

  release(userId,templateCode){
    return api.get(`/templateSet/release.json?userId=${userId}&templateCode=${templateCode}`)
  }

  useTemplate(userId,templateCode){
    return api.post(`/userTemplate/useTemp.json`,{userId,templateCode})
  }

  updateTemplate(template){
    if(template.id){
      return api.post('/template/update.json',template)
    }else{
      return api.post('/template/add.json',template)
    }
  }

  uploadImg(formData){
    return uploadApi.post('/file/upload.json',formData)
  }


  getAllTemplates(){
    return api.get(`/template/find.json`);
  }


  getUserInfo(userId){
    return api.get(`/wzUser/findOne.json?userId=${userId}`);
  }

  upgradeUserInfo(profile){
    return api.post('/wzUser/add.json',profile);
  }

  findUserTemplates(userId){
    return api.get(`/userTemplate/findUserTemp.json?userId=${userId}`);
  }

  findDefaultTemplate(userId){
    return api.get(`/userTemplate/findDefaultTemp.json?userId=${userId}`)
  }




  getMessage(userId,start=0){
    return api.get(`/message/find.json?userId=${userId}&start=${start}`);
  }






  getSwiper(userId){
    return api.get(`/photo/find.json?userId=${userId}`);
  }
  upgradeSwiper(photo){
    if(photo.id){
      return api.post(`/photo/update.json`,photo);
    }else{
      return api.post(`/photo/add.json`,photo)
    }
  }
  exchangeSwiper(id,targetId){
    return api.get(`/photo/sort.json?id=${id}&targetId=${targetId}`);
  }
  deleteSwiper(id){
    return api.post(`/photo/del.json`,{id:id});
  }
  setTemplate(options){
    return api.post(`/templateSet/add.json`,options);
  }







  getIndex(userId,templateCode,type){
    return api.get(`/templateSet/main.json?userId=${userId}&templateCode=${templateCode}&type=${type}`)
  }







  getAllArticle(userId){
    return api.get(`/artice/find.json?userId=${userId}`);
  }

  updateArticle(article){
    if(article.id){
      return api.post(`/artice/update.json`,article);
    }else{
      return api.post(`/artice/add.json`,article);
    }
  }
  getArticleDetail(id){
    return api.get(`/artice/findOne.json?id=${id}`)
  }
  exchangeArticle(id,targetId){
    return api.get(`/artice/sort.json?id=${id}&targetId=${targetId}`);
  }
  deleteArticle(id){
    return api.post(`/artice/del.json`,{id:id})
  }



  editButton(button){
    return api.post('/button/add.json',button);
  }




  addTitle(options){
    return api.post('/text/addtempData.json',options);
  }
  getTitles(userId){
    return api.get(`/text/find.json?userId=${userId}`);
  }




  getErweima(userId,templateCode,type=''){
    let baseUrl=`${window.location.origin}/modules/phone.html#/${userId}/home`;
    if(type=='view'){
      baseUrl+=`?template=${templateCode}&type=${type}`
    }
    return api.get(`/templateSet/getQrCode.json?url=${encodeURIComponent(baseUrl)}`)
  }


}




function type(obj) {
  var toString = Object.prototype.toString;
  var map = {
    '[object Boolean]'  : 'boolean',
    '[object Number]'   : 'number',
    '[object String]'   : 'string',
    '[object Function]' : 'function',
    '[object Array]'    : 'array',
    '[object Date]'     : 'date',
    '[object RegExp]'   : 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]'     : 'null',
    '[object Object]'   : 'object'
  };
  if(obj instanceof Element) {
    return 'element';
  }
  return map[toString.call(obj)];
}

function deepClone(data) {
  var t = type(data), o, i, ni;

  if(t === 'array') {
    o = [];
  }else if( t === 'object') {
    o = {};
  }else {
    return data;
  }

  if(t === 'array') {
    for (i = 0, ni = data.length; i < ni; i++) {
      o.push(deepClone(data[i]));
    }
    return o;
  }else if( t === 'object') {
    for( i in data) {
      o[i] = deepClone(data[i]);
    }
    return o;
  }
}

let API =new Api();

export {API,IMGURL,deepClone};
