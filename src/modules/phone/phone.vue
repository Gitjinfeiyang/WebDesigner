<template>
<div id="app">
  <div class="router-view-wrapper" v-if="templateCode.length>0">
    <router-view></router-view>
  </div>
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
  .router-view-wrapper{padding-bottom: 2rem;}
</style>
