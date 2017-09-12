<template>
  <div class="card">
    <component :is="templateCode" :options="info"></component>
  </div>
</template>

<script>
import {Cards} from '../../editor/assets/getTemplate';
import {API} from '../assets/getData';

  export default {
      data(){
        return({
          info:{},
          userId:this.$store.state.userId,
        })
      },
      computed:{
        templateCode(){
            return this.$store.state.templateCode;
        }
      },
      created(){
        this.getUserInfo()
      },
      methods:{
        getUserInfo(){
            API.getUserInfo(this.userId)
              .then((res) => {
                this.info=res.data;
              })
        }
      },
      components:Cards
  }
</script>

<style scoped lang="less">
  .block{padding:20px; border:1px solid #f1f1f1; border-radius: 2px; margin-bottom: 20px;}
</style>
