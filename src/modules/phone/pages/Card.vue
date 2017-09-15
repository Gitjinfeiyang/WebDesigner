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
          userId:this.$store.state.userId,
        })
      },
      computed:{
        templateCode(){
            return this.$store.state.templateCode;
        },
        info(){
            return this.$store.state.userInfo;
        }
      },
      created(){
//          this.initUrl()
      },
      methods:{
        getUserInfo(){
            API.getUserInfo(this.userId)
              .then((res) => {
                this.info=res.data;
              })
        },
        initUrl(){
            this.$router.push({name:this.$route.name,query:{userId:this.userId}})
        }
      },
      components:Cards
  }
</script>

<style scoped lang="less">
  .block{padding:20px; border:1px solid #f1f1f1; border-radius: 2px; margin-bottom: 20px;}
</style>
