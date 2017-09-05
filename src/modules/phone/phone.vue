<template>
<div id="app">
  <div class="router-view-wrapper">
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

            }
        },
        created(){
           this.getUserInfo()
        },
        methods:{
          getUserInfo(){
            API.getUserInfo(51)
              .then((res) => {
                this.info=res.data;
                document.title=res.data.wzName;
              })
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
