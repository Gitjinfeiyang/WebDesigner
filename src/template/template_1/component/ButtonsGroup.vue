<template>
  <div class="buttons-group flex-parent">
    <slot></slot>
  </div>
</template>

<script>
  import COMPONENT_TYPE from '../../componentType';
    export default {
      props:['options'],
      data(){
          return({

          })
      },
      components:{
      }
    }
</script>

<style scoped lang="less">
  @import '../style/commen.less';

  .buttons-group{
    background:#fff; padding:0.4rem 0; text-align: center; font-size: 0;
    .button{
      .icon{
        height:3rem;
        img{height:100%;}
      }
      .name{line-height: 1.6rem;font-size: 0.6rem; color:#666;}
    }
  }
</style>
