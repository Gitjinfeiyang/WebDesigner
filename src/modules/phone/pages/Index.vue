<template>
  <div class="index">
    <component v-if="templateCode" :is="templateCode" :options="userData" keep-alive></component>
  </div>
</template>

<script>
//  const Template_1 = resolve => require(['../../../template/template_1/Index.vue'],resolve);
import {Indexes} from '../../editor/assets/getTemplate'
import {API} from '../assets/getData';

  export default {
      props:['template','test'],
      data(){
          return{
            userData: {}
          }
      },
      computed:{
        userId(){
            return this.$store.state.userId;
        },
        templateCode(){
            return this.$store.state.templateCode;
        },
        type(){
            return this.$store.state.type;
        }
      },
      created(){
//          this.initUrl()
        this.getIndexData()
      },
      methods:{
        getIndexData(){
            API.getIndex(this.userId,this.templateCode,this.type)
              .then((res) => {
                this.userData=res.data;
              })
        },
        initUrl(){
          this.$router.push({name:this.$route.name,query:{userId:this.userId}})
        }
      },
      components:Indexes
  }
</script>

<style scoped lang="less">

</style>
