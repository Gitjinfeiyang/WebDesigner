<template>
  <div class="list-setting">
    <article-list @addArticle="addArticle" :source="articles.source"></article-list>
  </div>
</template>

<script>
  import AddArticle from '../AddArticle.vue';
  import ArticleList from '../ArticleList.vue';
  import {API} from '../../assets/getData';

    export default {
        props:['options'],
        data(){
          return({
            articles:this.options.data
            })
        },
        created(){
        },
        methods:{

          addArticle(articles){
            let swiper='';
            for(let i=0; i<articles.length; i++){
                swiper+=articles[i].id+',';
            }
              API.setTemplate({
                userId:this.$store.state.userId,
                templateCode:this.$store.state.templateCode,
                modelId:this.options.id,
                modelClassify:4,
                sourceId:swiper,
              })
                .then((res) => {
                  this.$store.dispatch('reloadIndex');
                  this.$store.dispatch('notice',{text:'保存成功'})
                })
          }
        },
        components:{
            AddArticle,
          ArticleList,
        }
    }
</script>

<style scoped lang="less">

</style>
