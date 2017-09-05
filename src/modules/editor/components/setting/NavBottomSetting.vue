<template>
<div class="nav-bottom-setting">
  <div v-for="nav in options.data.content">
    icon:<input type="text" v-model="nav.icon" />
    text:<input type="text" v-model="nav.text" />
  </div>
</div>
</template>

<script>
    export default {
        props:['options']
    }
</script>

<style scoped lang="less">

</style>
