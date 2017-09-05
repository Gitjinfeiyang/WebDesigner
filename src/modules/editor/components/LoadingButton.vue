<template>
  <div class="loading-button-wrapper">
    <button :class="type" :disabled="loading" @click="clickHandler">
      <slot></slot>
      <div class="loading" v-if="loading">
        <i class="iconfont">&#xe703;</i>
      </div>
    </button>
  </div>
</template>

<script>
    export default {
        props:{
            type:{
                default(){
                    return 'border-button'
                }
            },
            loading:{
                default(){
                    return false;
                }
            },
            clickHandler:{
                default(){
                    return function(e){

                    }
                }
            },
        }
    }
</script>

<style scoped lang="less">
  .loading-button-wrapper{
    text-align: center; position:relative;
    .loading{display: inline-block;}
  }
</style>
