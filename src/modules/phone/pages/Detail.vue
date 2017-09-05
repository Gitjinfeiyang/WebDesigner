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
            this.getArticle()
        },
        methods:{
            getArticle(){
                let articleId=this.$route.query.article;
                API.getArticles(51,articleId)
                  .then((res) => {
                      this.article=res.data.content;
                  })
            }
        }
    }
</script>

<style scoped lang="less">

</style>
