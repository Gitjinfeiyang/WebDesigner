<template>
  <div class="button" v-component="componentData" :style="{backgroundImage:'url('+imgUrl+resource.source[0].url+')'}">
    <div class='text'>{{resource.source&&resource.source[0]&&resource.source[0].title}}</div>
  </div>
</template>

<script>
  import COMPONENT_TYPE from '../../componentType';
  import {IMGURL} from '../../../modules/editor/assets/getData'

    export default {
        props:['source','id'],
        data(){
          return({
            imgUrl:IMGURL
          })
        },
        computed:{
            componentData(){
                return {
                    type:COMPONENT_TYPE.BGBUTTON,
                    data:this.resource,
                    id:this.id,
                }
            },
            resource(){
                let button={};
                if(this.source&&this.source.source.length>0){
                  button=this.source;
                }else{
                    button={
                        source:[{
                            title:'图集',
                            url:'',
                        }]
                    }
                }
                return button;
            }
        }
    }
</script>

<style scoped lang="less">
  .button{
    font-size: 0.59rem;
    display: inline-block;
    width:31%;
    height:4rem;
    line-height: 4rem;
    padding:0 0.512rem;text-align: center;background-size: 100% 100%;
  }
  .button .text{
    display:inline-block;width:100%; background:rgba(0,0,0,0.4); line-height: 2rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
    color:#fff; font-size: 0.59rem; vertical-align: middle;
  }
</style>
