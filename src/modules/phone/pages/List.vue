<template>
  <div class="list">
      <div class='title-bar'><div class='border'><div class='inner'>新闻咨询</div></div></div>
        <ul class="list-content">
          <li class="item" v-for="item in list.data" @click="goTo(item.id)">
            <div class="img-left"><img :src="imgUrl+item.img"/></div>
            <div class="text-right">
              <p class="title">{{item.title}}</p>
              <p class="summary">{{item.summary}}</p>
            </div>
          </li>
        </ul>
      <a href='./index.html' class='home-button'></a>
  </div>
</template>

<script>
  import {API,IMGURL} from '../assets/getData';

    export default {
        data(){
          return {
              list:{},
              imgUrl:IMGURL,
          }
        },
        created(){
          this.getArticles()
        },
        methods:{
            getArticles(){
              let articleIds = this.$route.query.source;
              API.getArticles(51, articleIds)
                .then((res) => {
                  this.list = res.data;
                })
            },
            goTo(id){
                this.$router.push({path:'/detail',query:{article:id}})
            }
        }
    }
</script>

<style scoped lang="less">
@import '../assets/phone.less';
.list{
  .title-bar{
    line-height: 2rem;
    .border{
      border-bottom: 1px solid #f1f1f1; text-align: center;
      .inner{display: inline-block; border-bottom: 3px solid @blue;}
    }

  }
  .item{
    border-bottom: 1px solid #f1f1f1;display: flex; padding:0.5rem;
    .img-left{
      flex:0 4rem; flex-shrink: 0; height:4rem;
      img{width:100%; height:100%;}
    }
    .text-right{
      flex:1; padding-left: 1rem; overflow: hidden; word-break: break-all;
      .title{white-space: nowrap; width:100%; overflow: hidden; text-overflow: ellipsis;font-size: 0.7rem; height:1.2rem;}
      .summary{font-size: 0.512rem; color:#666; height:2.8rem; overflow: hidden; line-height: 0.7rem;}
    }
  }
}
</style>
