<template>
<div id="app">
  <div class="router-view-wrapper" v-if="templateCode.length>0">
    <router-view></router-view>
  </div>
  <transition name="fade">
    <div class="no-data-notice" v-if="templateCode.length<=0">
      <div class="loading">
        <i class="iconfont">&#xe703;</i>
      </div>
      <p class="text">加载中...</p>
    </div>
  </transition>
</div>
</template>

<script>
import {NavBottoms} from '../editor/assets/getTemplate.js'
import {API} from './assets/getData';


    export default {
        data(){
            return{
                templateId:'template_1',
                info:{},
              templateCode:'',
              userId:this.$route.query.userId||localStorage.getItem('userid'),
            }
        },
        created(){
           this.getUserInfo()
        },
        methods:{
          getUserInfo(){
              if(this.$store.state.userId==undefined){
                  alert('用户不存在');
                  return;
              }else if(this.$store.state.userId != -1){
                  return;
              }
              this.$store.state.userId=this.userId;
            localStorage.setItem('userid',this.userId);
            API.getUserInfo(this.userId)
              .then((res) => {
                this.$store.state.userInfo=this.info=res.data;
                document.title=res.data.wzName;
                this.getTemplate()
              })
          },
          getTemplate(){
              let type=this.$store.state.type=this.$route.query.type||localStorage.getItem('type');
              if(type == 'view'){
                this.templateCode=this.$store.state.templateCode=this.$route.query.template||localStorage.getItem('templateCode');
              }else{
                  API.getDefaultTemplate(this.userId)
                    .then((res) => {
                      localStorage.setItem('templateCode',res.data.templateCode);
                      this.templateCode=this.$store.state.templateCode=res.data.templateCode;
                    })
              }
          }
        },
        components:{
          ...NavBottoms
        }
    }
</script>

<style scoped lang="less">
  @import './assets/phone';

  .router-view-wrapper{padding-bottom: 2rem;}
  .no-data-notice{
    width:100%; height:100%; background:#fff; text-align: center; padding-top:10rem; position:absolute; top:0; left:0;
    .loading{
      height:1.4rem; line-height: 1.4rem;
      .iconfont{font-size: 1rem; padding-bottom: 4px;}
    }
    .text{font-size: 0.512rem;
      line-height:1rem;}
  }
</style>
