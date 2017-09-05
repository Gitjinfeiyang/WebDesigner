<template>
  <div class="card">
    <template_1 :options="info"></template_1>
  </div>
</template>

<script>
import {Cards} from '../../editor/assets/getTemplate';
import {API} from '../assets/getData';

  export default {
      data(){
        return({
          info:{}
        })
      },
      created(){
        this.getUserInfo()
      },
      methods:{
        getUserInfo(){
            API.getUserInfo(51)
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
