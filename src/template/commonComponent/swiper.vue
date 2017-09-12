<template>
  <div class='swipe' ref="swiper" v-component="componentData">
    <div class="swipe-wrap">
      <div v-for="item in resource.source" @click="toUrl(item.url)">
        <img :src="ImgUrl+item.url" />
        <p class="title">{{item.summary}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import Swipe from '../../assets/js/swipe.js';
  import COMPONENT_TYPE from '../componentType';
  import {IMGURL} from '../../modules/phone/assets/getData';


  export default{
    props:['source','id'],
    data(){
      return ({
        swiper:{},
        ImgUrl:IMGURL,
      });
    },
    watch:{
      reload(){
          this.$nextTick(() => {
            this.swiper.refresh()
          })
      }
    },
    computed:{
      componentData(){
          return {
              id:this.id,
              type:COMPONENT_TYPE.SWIPER,
              data:this.resource
          }
      },
      reload(){
          return this.$store&&this.$store.state.reloadSwiper||'';
      },
      resource(){
        let swiper={};
        if(this.source&&this.source.source&&this.source.source.length>0){
          swiper=this.source;
        }else{
          swiper={
            source:[{
              title:'图集',
              url:'',
            }]
          }
        }
        return swiper;
      }
    },
    mounted(){
      this.initSwiper()
    },
    methods:{
      toUrl(url){

      },
      initSwiper(){
        this.$nextTick( () => {
          this.swiper=Swipe(this.$refs.swiper,{
            continuous: true,
            stopPropagation: true,
            auto:3000,
            speed:600,
          });
        })
      }
    },
    updated(){
      this.$nextTick( () => {
        this.swiper.update();
      })
    }
  }
</script>

<style scoped lang="less">

  .swipe {
    overflow: hidden;
    visibility: hidden;
    position: relative;
    height:8rem;
    background:#fff;
    margin-bottom: 0.512rem;
  }
  .swipe-wrap {
    overflow: hidden;
    position: relative;
    height:100%;
  }
  .swipe-wrap > div {
    float:left;
    width:100vw;
    position: relative;
    height:100%;
    overflow: hidden;
    transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
  }

  .swipe-wrap{
    img{width:100%; height:100%;}
    .title{
      position:absolute; bottom:0; right:0; color:#fff; text-shadow: 0 0 10px #333; line-height: 1.6rem; padding:0 10px;
      white-space: nowrap; text-overflow: ellipsis; overflow: hidden;
    }
  }

</style>
