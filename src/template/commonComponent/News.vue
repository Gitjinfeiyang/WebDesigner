<template>
  <div class="news-wrapper" v-component="componentData">
    <slot name="title"></slot>
    <ul>
      <li class="news flex-parent" v-for="article in resource.source" @click="goTo(article.id)">
        <div class="img-wrapper">
          <img :src="imgUrl+article.img" alt="">
        </div>
          <div class="con">
            <p class="tit">{{article.title}}</p>
            <p class="txt">{{article.summary}}</p>
          </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import COMPONENT_TYPE from '../componentType';
  import {IMGURL} from '../../modules/editor/assets/getData'

  export default {
      props:['source','id'],
      data(){
          return({
            imgUrl:IMGURL,

          })
      },
      computed:{
          componentData(){
              return({
                type:COMPONENT_TYPE.LIST,
                id:this.id,
                data:this.resource,
              })
          },
          resource(){
              let data={};
              if(this.source&&this.source.source&&this.source.source.length>0){
                  data=this.source;
              }else{
                  data={
                      source:[{
                          title:'标题',
                          img:'img',
                          summary:'添加内容'
                      }]
                  }
              }
              return data;
          }
      },
      methods:{
          goTo(id){
            if(this.$store&&this.$store.state.mode=='edit') return;
            this.$router.push({path:'/detail',query:{article:id}})
          }
      }
  }
</script>

<style scoped lang="less">
  @import "../template_1/style/commen.less";

  .news-wrapper{
    background:#fff;
    .title{
      text-align: center; font-size: 0.65rem; line-height: 2rem;
      img{margin-right: 10px; vertical-align: middle; margin-bottom: 0.2rem; height:0.65rem;}
    }
    .news{
      padding:0.8rem; border-bottom: 2px dashed #f1f1f1;
      .img-wrapper{
        flex:3; height:4.5rem; flex-shrink: 0; background:#f1f1f1; overflow: hidden;
        img{width:100%; height:100%;}
      }
      .con{flex:4;padding-left: 0.5rem; width:calc(~"100% - 5.5rem");}
      .tit{ white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color:#000; font-size: 0.7rem; width:100%; height:1.2rem; }
      .txt{font-size: 0.6rem; line-height: 1.1rem; height:3.3rem; overflow: hidden; color:#555;}
    }
    .button-wrapper{
      padding:0.5rem; text-align: center;
      .blue-button{background:@blue; color:#fff; font-size: 0.512rem; border-radius: 4px; padding:0.212rem 1rem;}
    }
  }
</style>
