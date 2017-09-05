<template>
  <div class="button-group">
    <slot name="title"></slot>
    <slot name="buttons"></slot>
  </div>
</template>

<script>
  import COMPONENT_TYPE from '../../componentType';

  export default {
      data(){
          return({
            componentData:{
                type:COMPONENT_TYPE.BUTTON
            }
          })
      }
  }
</script>

<style scoped lang="less">
  .button-group{
    background:#fff;
    font-size: 0; margin-top: 20px;
    padding: 0 0.4267rem 1rem 0.4267rem;margin-bottom: 0.5rem;
    .title{
      text-align: center; font-size: 0.65rem; line-height: 2rem;
      img{margin-right: 10px; vertical-align: middle; margin-bottom: 0.2rem; height:0.65rem;}
    }
  }
  .button-group .button{
    font-size: 0.59rem;
    display: inline-block;
    width:31%;
    height:4rem;
    line-height: 4rem;
    padding:0 0.512rem;text-align: center;
  }
  .button-group .button .text{
    display:inline-block;width:100%; background:rgba(0,0,0,0.4); line-height: 2rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
    color:#fff; font-size: 0.59rem; vertical-align: middle;
  }
  .button-group .button-1{ width:65.5%;
    margin-right:3.5%; margin-bottom: 3.5%;}
  .button-group .button-2{ margin-bottom: 3.5%;}
  .button-group .button-3{}
  .button-group .button-4{ margin:0 3.5%;}
  .button-group .button-5{}
</style>
