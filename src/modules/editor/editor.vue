<template>
  <div id="app">
    <div class="header">
      <div class="width-limit">
        <div class="head-left"><router-link to="/templates"><span class="logo">微官网</span>自建平台</router-link></div>
        <div class="head-right"><span class="userinfo">欢迎回来，<router-link to="/user/info">嘻嘻嘻</router-link></span><span class="login">退出登录</span></div>
      </div>
    </div>
    <transition name="notice-down">
      <div class="notice" v-if="notification.length>0"><div class="content"><i class="iconfont">&#xe6e8;</i>{{notification}}</div></div>
    </transition>
    <div class="router-view-wrapper">
      <router-view></router-view>
    </div>
    <div class="footer">城云国际智能平台研发出品</div>
  </div>
</template>

<script>
  import {API} from './assets/getData';

export default {
  name: 'app',
  created(){
    this.getUserId()
  },
  computed:{
      notification(){
          return this.$store.state.notification;
      }
  },
  methods:{
      getUserId(){
          API.getUserId()
            .then((res) => {
              this.$store.state.userId=51
            })
            .catch((res) => {
              this.$store.state.userId=51
            })
      }
  }
}
</script>

<style lang="less">
  @import './assets/commen.less';

  #app{background:#f9f9f9; min-height: 100vh; width:100%; overflow-x: hidden;}

.header{
  height:60px; background:@green; line-height: 60px; color:#fff;
  .width-limit{
    display: flex;
    .head-left{
      flex:1;
      .logo{display:inline-block;font-family:'宋体'; font-size: 36px; font-weight: bold; transform:scaleX(0.8);}
    }
    .head-right{
      flex:1; text-align: right;
      .login{display: inline-block; padding-left: 20px;}
    }

  }

}
.router-view-wrapper{min-height: calc(~"100vh - 100px");}
  .notice{
    width:300px; border-radius: 4px; background:#fff; box-shadow: 0 0 10px 1px rgba(0,0,0,0.25); padding:10px 20px; border:1px solid #f1f1f1;
    position:fixed; top:10px; left:50%; margin-left: -150px; font-size: 12px; z-index: 100;

    .iconfont{display: inline-block; padding-right: 20px; color:@blue; font-size: 30px; vertical-align: middle;}
  }
  .footer{line-height: 40px; text-align: center; color:#f1f1f1; background:#333; font-size: 12px;}

</style>
