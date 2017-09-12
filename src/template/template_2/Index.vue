<template>
  <div class="index">
    <div class="button-wrapper">
      <m-button class="button-1" id="1" :source="componentData(1)"></m-button>
      <m-button class="button-2" id="2" :source="componentData(2)"></m-button>
      <m-button class="button-3" id="3" :source="componentData(3)"></m-button>
      <m-button class="button-4" id="4" :source="componentData(4)"></m-button>
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
  @button1top:12%;
  @button2top:@button1top+16%;
  @button3top:@button2top+24%;
  @button4top:@button3top+16%;
  .index{

    >.button-wrapper{
      height:100%; width:100%; position:absolute; top:0; left:0; background:url('./images/bg.jpg') no-repeat; background-size: 100% 100%;
      .button{
        width:4rem; position:relative;
        .icon{height:4rem;}
        .name{position:absolute; right:calc(~"100% + 0.6rem");top:50%; white-space: nowrap; line-height: 1rem; margin-top: -0.5rem;
          font-size: 0.8rem; color:#fff;}
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
