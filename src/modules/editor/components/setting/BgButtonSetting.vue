<template>
  <div class="bgbutton-setting">
    <swiper-setting radio="1" :options="options"></swiper-setting>
  </div>
</template>

<script>
  import SwiperSetting from './SwiperSetting.vue';
    export default {
        props:['options'],
        watch:{

        },
        components:{
            SwiperSetting
        }
    }
</script>

<style scoped lang="less">

</style>
