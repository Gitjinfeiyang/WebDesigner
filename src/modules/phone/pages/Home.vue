<template>
  <div class="home">
    <div class="router-view-wrapper">
      <router-view></router-view>
    </div>
    <template_1_nav_bottom></template_1_nav_bottom>
  </div>
</template>

<script>
  import {NavBottoms} from '../../editor/assets/getTemplate.js'
  export default {
      components:NavBottoms
  }
</script>

<style scoped lang="less">
  .router-view-wrapper{padding-bottom: 2rem;}
</style>
