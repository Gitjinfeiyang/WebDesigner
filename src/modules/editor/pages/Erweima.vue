<template>
  <div class="erweima">
    <div class="img-wrapper">
      <img :src="erweima" />
      <p class="yellow">这是您微官网唯一的二维码</p>
    </div>
  </div>
</template>

<script>
  import {API,IMGURL} from '../assets/getData';

    export default {
        data(){
            return({
              erweima:'',
            })
        },
        created(){
            this.getErweima()
        },
        methods:{
            getErweima(){
                API.getErweima(51)
                  .then((res) => {
                    this.erweima=res.data.img;
                  })
            }
        }
    }
</script>

<style scoped lang="less">
  @import '../assets/commen';
  .img-wrapper{
    padding-top: 10vh; text-align: center;
    .yellow{color:@yellow;}
  }
</style>
