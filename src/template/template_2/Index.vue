<template>
  <div class="index">
    <div class="button-wrapper">
      <div class="circle">
        <m-button class="button-1" id="1" :source="componentData(1)" icon="icon-xiangmu7">
          <m-title class="detail" slot="extend" id="5" :source="componentData(5)"></m-title>
        </m-button>
        <m-button class="button-2" id="2" :source="componentData(2)" icon="icon-yonghu">
          <m-title class="detail" slot="extend" id="6" :source="componentData(6)"></m-title>
        </m-button>
        <m-button class="button-3" id="3" :source="componentData(3)" icon="icon-liuyan1">
          <m-title class="detail" slot="extend" id="7" :source="componentData(7)"></m-title>
        </m-button>
        <m-button class="button-4" id="4" :source="componentData(4)" icon="icon-wenzhang1">
          <m-title class="detail" slot="extend" id="8" :source="componentData(8)"></m-title>
        </m-button>
      </div>
    </div>
  </div>
</template>

<script>
  import Button from '../commonComponent/Button.vue';
  import BgButton from '../commonComponent/BgButton.vue';
  import News from '../commonComponent/News.vue';
  import Title from '../commonComponent/Title.vue';
  import Swiper from '../commonComponent/swiper.vue';

    export default {
        props:['options'],
        created(){
        },
        methods:{
          componentData(id){
            let data={};
            for(let i=0; i<this.options.length; i++){

              if(this.options[i].modelId == id){
                data=this.options[i];
              }

            }
            return data;
          }
        },
        components:{
            'm-button':Button,
          BgButton,
          News,
          'm-title':Title,
          Swiper,
        }
    }
</script>

<style lang="less">
  @button1top:-15%;
  @button2top:@button1top+30%;
  @button3top:@button2top+45%;
  @button4top:@button3top+30%;
  .index{
    width:100%; height:100%;
    >.button-wrapper{
      height:100%; width:100%; position:absolute; top:0; left:0; background:url('./images/bg.jpg') no-repeat; background-size: 100% 100%;
      .circle{background:url("./images/circle_bg.png") no-repeat center right; width:100%; height:50%; position:absolute; top:25%; right:0;
        background-size: contain;}
      .button{
        width:4rem; position:relative; text-shadow: 1px 1px 10px #999;
        .icon{height:4rem;}
        .text{
          height:100%; position:absolute;  right:100%; top:0; white-space: nowrap; line-height: 1rem;
          color:#fff; background:url("./images/text_bg.png"); background-size: 100% 100%;padding:0.4rem;
          .name{color:#fff; font-size: 0.8rem;}
          .detail{
            .iconfont{display: none;}
          }
          .title{line-height: 1rem;}
        }
      }
      .button-1{
        position:absolute; top:@button1top; right:10%;
      }
      .button-2{
        position:absolute; top:@button2top; right:40%;
      }
      .button-3{
        position:absolute; top:@button3top; right:40%;
      }
      .button-4{
        position:absolute; top:@button4top; right:10%;
      }
    }
  }

</style>
