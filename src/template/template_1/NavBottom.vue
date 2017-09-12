<template>
  <div class="nav" :style="mode == 'edit'?'position:initial':''">
    <router-link class="button" :to="route.HOME">
      <div class="icon"><i class="iconfont">&#xe614;</i></div>
      <p class="name">主页</p>
    </router-link>
    <a class="button" :href="'tel:'+tel">
      <div class="icon"><i class="iconfont">&#xe6dd;</i></div>
      <p class="name">电话</p>
    </a>
    <router-link class="button" :to="route.MESSAGE">
      <div class="icon"><i class="iconfont">&#xe638;</i></div>
      <p class="name">留言</p>
    </router-link>
    <router-link class="button" :to="route.CARD">
      <div class="icon"><i class="iconfont">&#xe61a;</i></div>
      <p class="name">名片</p>
    </router-link>
  </div>
</template>

<script>
  import COMPONENT_TYPE from '../componentType';
  import {route} from '../../modules/phone/router/router'

    export default {
        props:['options','styles'],
        data(){
            return {
              mode:this.$store&&this.$store.state&&this.$store.state.mode,
              route,
              tel:this.$store&&this.$store.state&&this.$store.state.userInfo.mobile,
            }
        },
        computed:{

        },
        methods:{
          componentData(val){
              return {
                  type:COMPONENT_TYPE.BUTTON,
                data:val
              }
          }
        }
    }
</script>

<style scoped lang="less">
  @import './style/commen';
.nav{
  display: flex; width:100%; height:2.2rem;padding:0.2rem 0; background:#fff; border-top: 1px solid #f1f1f1;
  position:fixed; bottom:0; left:0;
  .button{flex:1; text-align: center;}
  .icon{height:1.3rem; width:100%; text-align: center;}
  .name{font-size: 0.5rem;}
  .router-link-active{color:@blue;}
}
</style>
