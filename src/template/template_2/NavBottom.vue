<template>
  <div class="nav-wrapper" v-show="!hide">
    <nav-bottom></nav-bottom>
  </div>
</template>

<script>
  import COMPONENT_TYPE from '../componentType';
  import {route} from '../../modules/phone/router/router'
  import NavBottom from '../template_1/NavBottom.vue'

  export default {
    props:['options','styles'],
    data(){
      return {
        mode:this.$store&&this.$store.state&&this.$store.state.mode,
        route,
        tel:this.$store&&this.$store.state&&this.$store.state.userInfo.mobile,
        hide:false,
      }
    },
    watch:{
      '$route'(){
          this.checkShow();
      }
    },
    mounted(){
      this.checkShow()
    },
    computed:{

    },
    methods:{
      componentData(val){
        return {
          type:COMPONENT_TYPE.BUTTON,
          data:val
        }
      },
      checkShow(){
        if(this.$route.path.indexOf('home')>=0){
          this.hide=true;
        }else{
          this.hide=false;
        }
      }
    },
    components:{
        NavBottom
    }
  }
</script>

<style scoped lang="less">
  @import './style/commen';

</style>

