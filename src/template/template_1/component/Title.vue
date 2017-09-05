<template>
  <div class="title" v-component="componentData">
    <i class="iconfont" v-html="resource.source[0].img"></i> {{resource.source[0].title}}
  </div>
</template>

<script>
  import COMPONENT_TYPE from '../../componentType';

    export default {
        props:['source','id'],
        computed:{
            componentData(){
                return{
                    type:COMPONENT_TYPE.TITLE,
                    data:this.resource,
                    id:this.id,
                }
            },
          resource(){
                let title={};
                if(this.source&&this.source.source.length>0){
                    title=this.source;
                }else{
                    title={
                        source:[
                          {
                              img:'&#xe60f;',
                              title:'标题'
                          }
                        ]
                    }
                }
                return title;
          }
        }
    }
</script>

<style scoped lang="less">
  @import '../style/commen';
  .title{
    text-align: center; font-size: 0.65rem; line-height: 2rem;
    img{margin-right: 10px; vertical-align: middle; margin-bottom: 0.2rem; height:0.65rem;}
    .iconfont{color:@blue;font-weight: bold; font-size: 0.6rem;}
  }
</style>
