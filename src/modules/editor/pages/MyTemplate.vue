<template>
  <div class="my-template">
    <div class="width-limit">
      <template-preview v-for="template in templates" type="private" :template="template" :key="template.id"></template-preview>
      <p class="no-template" v-if="templates.length<=0"> <i class="iconfont">&#xe61e;</i>模板库空空如也</p>
      <div class="button-wrapper"  v-if="templates.length<=0"><input type="button" class="yellow-button" value="去模板市场选择一个" @click="goTo"/></div>
    </div>
  </div>
</template>

<script>
  import TemplatePreview from '../components/TemplatePreview.vue';
  import {API}  from '../assets/getData';

    export default {
        data(){
          return({
            templates:{},
          })
        },
        created(){
            this.getUserTemplates()
        },
        computed:{
          userId(){
              return this.$store.state.userId;
          }
        },
        methods:{
          getUserTemplates(){
              API.findUserTemplates(this.userId)
                .then((res) => {
                  this.templates=res.data;
                })
          },
          goTo(){
              this.$router.push({path:'/templates'})
          }
        },
        components:{
            TemplatePreview
        },

    }
</script>

<style scoped lang="less">
.no-template{
  font-size: 20px; text-align: center; padding-top: 20vh; line-height: 160px; color:#ddd;
  .iconfont{font-size: 160px; display: inline-block; vertical-align: middle; padding-right: 50px;}
}
  .width-limit{margin-top: 20px; background:#fff; padding:30px; width:1200px;}
  .my-template,.width-limit{min-height:calc(~"100vh - 164px");}
</style>
