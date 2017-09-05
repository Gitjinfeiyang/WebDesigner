<template>
  <template_1 :options="userData" keep-alive></template_1>
</template>

<script>
//  const Template_1 = resolve => require(['../../../template/template_1/Index.vue'],resolve);
import {Indexes} from '../../editor/assets/getTemplate'
import {API} from '../assets/getData';

  export default {
      data(){
          return{
            userData: {}
          }
      },
      created(){
        this.getIndexData()
      },
      methods:{
        getIndexData(){
            API.getIndex(51,'template_1','view')
              .then((res) => {
                this.userData=res.data;
              })
        }
      },
      components:Indexes
  }
</script>

<style scoped lang="less">

</style>
