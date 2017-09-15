<template>
  <div class="button flex-1" v-component="componentData" @click="goTo">
    <div class="icon icon1">
      <svg aria-hidden="true">
        <use :xlink:href="'#'+resource.source[0].icon"></use>
      </svg>
    </div>
    <div class="text">
      <p class="name">{{resource.source[0].name}}</p>
      <slot name="extend"></slot>
    </div>
  </div>
</template>

<script>
  import COMPONENT_TYPE from '../componentType';
  import {route} from '../../modules/phone/router/router';

    export default {
        props:{
            source:{
                mName:'',
                mIcon:''
            },
            id:'',
          icon:'',
        },
      data(){
            return({

            })
      },
      methods:{
        goTo(){
            if(this.$store&&this.$store.state.mode=='edit') return;
            let name='';
            let query={};
           switch(parseInt(this.resource.source[0].classify)){
             case 1:
                name=route.HOME.name;
                break;
             case 2:
               name=route.CARD.name;
                 break;
             case 3:
               name=route.MESSAGE.name;
                 break;
             case 4:
               name=route.LIST.name;
               query={source:this.resource.source[0].articleids}
                 break;
           }
           this.$router.push({name:name,query:query});
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
            if(this.source&&this.source.source&&this.source.source.length>0){
                source=this.source;
            }else{
                source={
                    source:[
                    {
                      icon:this.icon||'icon--GoogleDrive',
                      name:'按钮',
                      classify:1
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
      svg,use{width:100%; height:100%;}
    }
    .name{line-height: 1.6rem;font-size: 0.6rem; color:#666; white-space: nowrap;overflow: hidden; text-overflow: ellipsis;}
  }
</style>
