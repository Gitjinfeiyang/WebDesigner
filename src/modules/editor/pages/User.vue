<template>
  <div class="user">
    <div class="nav-top">
      <div class="width-limit">
        <div class="nav-left">
          <router-link to="/user/info">简介</router-link>
          <router-link to="/user/contenteditor/template_1">设置</router-link>
          <router-link to="/user/message">留言板</router-link>
        </div>
        <div class="nav-right">
          <router-link to="/user/mytemplate">我的模板</router-link>
          <router-link to="/user/templates">我的二维码</router-link>
          <a class="erweima-wrapper" @mouseover="getErweima" @mouseout="showQrImg=false">
            预览
           <div class="erweima" v-if="showQrImg">
            <div class="loading" v-if="qrImg.length<=0"><i class="iconfont">&#xe703;</i></div>
            <img :src="qrImg"/>
          </div>
          </a>
          <a class="release" href="#" @click.prevent="release">发布</a>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import {API} from '../assets/getData.js';

    export default {
        data(){
            return({
              qrImg:'',
              showQrImg:false,
            })
        },
        created(){
            API.getUserInfo(51)
              .then( (res) => {

              })
              .then((err) => {

              })
        },
        methods:{
            getErweima(){
                this.showQrImg=true;
                if(this.qrImg.length>0) return;
              API.getErweima()
                .then((res) => {
                  this.qrImg=res.data.img;
                })
            },
            release(){
                API.release(51,'template_1')
                  .then((res) => {

                  })
            }
        }
    }
</script>

<style scoped lang="less">
  @import '../assets/commen';
  .nav-top{
    height:44px; background:#fff; line-height: 44px; color:#666; border-bottom: 1px solid #f1f1f1;
    a{display: inline-block; padding:0 20px; line-height: 30px;}
    .router-link-active{ border:1px solid #cfefdf; border-radius:4px; background:#ebf8f2; }
    .width-limit{display: flex;}
    .nav-left{flex:1; text-align: left;}
    .nav-right{
      flex:1; text-align: right;
      .release{color:#fff; background:@yellow; border-radius: 15px;}
      .erweima-wrapper{
        position:relative;
        .erweima{
          position:absolute; left:0; top:44px; z-index: 20; border:1px solid #f1f1f1; width:190px; height:190px; padding:10px;
          line-height: 180px; text-align: center; background:#fff;
          img{width:100%; heigth:100%;}
        }
      }
    }
  }
</style>
