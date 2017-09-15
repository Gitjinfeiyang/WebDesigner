<template>
  <div class="home">
    <div class="router-view-wrapper">
      <router-view></router-view>
    </div>
    <!--<template_1_nav_bottom></template_1_nav_bottom>-->
    <component :is="templateCode+'_nav_bottom'"></component>
  </div>
</template>

<script>
  import {NavBottoms} from '../../editor/assets/getTemplate.js'
  export default {
      created(){
//        this.initUrl()
      },
      computed:{
        templateCode(){
            return this.$store.state.templateCode;
        }
      },
      methods:{
        initUrl(){
          this.$router.push({name:this.$route.name,query:{userId:this.userId}})
        }
      },
      components:NavBottoms
  }
</script>

<style scoped lang="less">
  .router-view-wrapper{padding-bottom: 2rem;}
</style>
