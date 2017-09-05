<template>
  <div class="add-article">

  </div>
</template>

<script>
  import ImgUploader from '../components/ImgUploader.vue';
  import {API} from '../assets/getData';

    export default {
        data(){
            return({
              article:{}
            })
        },
      methods:{
        updateArticle(){
            API.updateArticle({userId:51,...this.article})
              .then((res) => {

              })
        },
        getImg(url){
            this.article.img=url;
        }
      },
      components:{
          ImgUploader,
      }
    }
</script>

<style scoped lang="less">

</style>
