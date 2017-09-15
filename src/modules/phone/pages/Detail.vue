<template>
  <div class="detail" v-html="article">

  </div>
</template>

<script>
  import {API} from '../assets/getData';

    export default {
        data(){
          return {
              article:''
          }
        },
        created(){
//            this.initUrl();
            this.getArticle();
        },
        methods:{
            getArticle(){
                let articleId=this.$route.query.article;
                API.getArticles(51,articleId)
                  .then((res) => {
                      this.article=res.data.content;
                  })
            },
          initUrl(){
            this.$router.push({name:this.$route.name,query:{userId:this.userId}})
          }
        }
    }
</script>

<style scoped lang="less">
.detail{
  font-size: 24px; padding:20px;
}
</style>
