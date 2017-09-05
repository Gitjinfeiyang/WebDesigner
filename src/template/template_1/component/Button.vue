<template>
  <div class="button flex-1" v-component="componentData" @click="goTo">
    <div class="icon icon1">
      <svg class="icon" aria-hidden="true">
        <use :xlink:href="'#'+resource.source[0].icon"></use>
      </svg>
    </div>
    <p class="name">{{resource.source[0].name}}</p>
  </div>
</template>

<script>
  import COMPONENT_TYPE from '../../componentType';
  import {route} from '../../../modules/phone/router/router';

    export default {
        props:{
            source:{
                mName:'',
                mIcon:''
            },
            id:'',
        },
      data(){
            return({

            })
      },
      methods:{
        goTo(){
            if(this.$store&&this.$store.state.mode=='edit') return;
            let path='';
           switch(parseInt(this.resource.source[0].classify)){
             case 1:
                path=route.HOME.path;
                break;
             case 2:
                path=route.CARD.path;
                 break;
             case 3:
                 path=route.MESSAGE.path;
                 break;
             case 4:
                 path=route.LIST.path+'?source='+this.resource.source[0].articleids;
                 break;
           }
           this.$router.push(path);
        }
      },
      computed:{
        componentData(){
            return{
              type:COMPONENT_TYPE.BUTTON,
              data:this.resource,
              id:this.id
            }

        },
        resource(){
            let source={};
            if(this.source&&this.source.source.length>0){
                source=this.source;
            }else{
                source={
                    source:[
                    {
                      icon:'icon--GoogleDrive',
                      name:'按钮'
                    }
                  ]
                };
            }
            return source;
        }
      }
    }
</script>

<style scoped lang="less">
  .button{
    display: inline-block; width:25%;
    .icon{
      height:3rem; overflow: hidden;
      svg{width:100%; height:100%;}
    }
    .name{line-height: 1.6rem;font-size: 0.6rem; color:#666;}
  }
</style>
