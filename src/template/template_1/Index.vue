<template>
  <div class="template" v-if="options.length>0">
    <swiper :source="componentData(1)" id="1"></swiper>
    <button-group>
      <m-button id="2" :source="componentData(2)"></m-button>
      <m-button id="3" :source="componentData(3)"></m-button>
      <m-button id="4" :source="componentData(4)"></m-button>
      <m-button id="5" :source="componentData(5)"></m-button>
    </button-group>
    <button-group1>
      <div slot="title"><m-title id="6" :source="componentData(6)"></m-title></div>
      <div slot="buttons">
        <bg-button class="button-1" id="7"  :source="componentData(7)"></bg-button>
        <bg-button class="button-2" id="8"  :source="componentData(8)"></bg-button>
        <bg-button class="button-3" id="9"  :source="componentData(9)"></bg-button>
        <bg-button class="button-4" id="10"  :source="componentData(10)"></bg-button>
        <bg-button class="button-5" id="11"  :source="componentData(11)"></bg-button>
      </div>
    </button-group1>
    <news id="13" :source="componentData(13)">
      <div slot="title"><m-title id="12" :source="componentData(12)"></m-title></div>
    </news>
  </div>
</template>

<script>
  import NavBottom from './NavBottom';
  import Swiper from './component/swiper.vue';
  import ButtonGroup from './component/ButtonsGroup.vue'
  import ButtonGroup1 from './component/ButtonsGroup1.vue'
  import News from './component/News.vue'
  import MButton from './component/Button.vue';
  import BgButton from './component/BgButton.vue';
  import MTitle from './component/Title.vue';

  const MODELS={
    swiper:1,

  };
    export default {
        props:['options'],
        mounted(){
        },
        computed:{

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
            Swiper,
            ButtonGroup,
            ButtonGroup1,
            News,
            MButton,
            BgButton,
            MTitle,
        },

    }
</script>

<style scoped lang="less">
  .template{
    background:#f1f1f1; color:#333;
    .title-bar{font-size:0.65rem; text-align: center; line-height: 2rem; background:#fff;  color:#555;}
  }
</style>
