<template>
  <div class="editor">
    <div class="width-limit clearfix">
      <div class="phone-view fl">
        <div class="template-area">
          <div class="component-selector">
            <div class="line-top line-horizontal" :style="componentSelector.lineTop">
              <div class="edit-buttons" :style="selectorStyle()">
                <span class="edit-button" @click="showEditor=!showEditor" :class="showEditor?'editing':''">设置</span>
              </div>
            </div>
            <div class="line-bottom line-horizontal" :style="componentSelector.lineBottom"></div>
            <div class="line-left line-vertical" :style="componentSelector.lineLeft"></div>
            <div class="line-right line-vertical" :style="componentSelector.lineRight"></div>
          </div>
          <component :is="templateId" :options="userData" v-if="gotUserData"></component>
          <!--<component :is="templateId+'_nav_bottom'"></component>-->
          <transition name="fade">
            <div class="no-data-notice" v-if="!gotUserData">
              <div class="loading">
                <i class="iconfont">&#xe703;</i>
              </div>
              <p class="text">模板加载中...</p>
            </div>
          </transition>
        </div>
      </div>
        <div class="edit-panel fl">
          <div class="mask-top"></div>
          <div class="scroll-wrapper">
            <transition name="slide">
              <component  v-if="selectedComponent.type&&showEditor" :is="selectedComponent.type+'Setting'" :options="selectedComponent"></component>
            </transition>
          </div>
        </div>

    </div>
  </div>

</template>

<script>
  import {Indexes,ComponentSettings,NavBottoms} from '../assets/getTemplate';
  import {data} from '../../../assets/js/data.js';
  import {API} from '../assets/getData'


  export default {
    data(){
      return({
        userData:[],
        gotUserData:false,
        showEditor:true,
        templateId:'',
      })
    },
    watch:{
       reload(){
           this.getIndexResource();
//         for(let i=0; i<this.userData.length; i++){
//             if(this.userData[i].modelId == this.reloadData.modelId){
//                this.$set(this.userData,[i],this.reloadData.data);
//             }
//         }
       }
    },
    created(){
        this.$store.state.templateCode=this.templateId=this.$route.params.id;
        this.getIndexResource()
    },
//    beforeDestroy(){
//      this.$store.state.editorPosition={};
//      this.$store.state.componentSelector={};
//    },
    computed:{
      transformCss:{
        get:function(){
          let style=this.selectedComponent.options.style;
          let obj={};
          Object.keys(style).forEach((key) => {
            let css=style[key];
            let styles=css.split(';');
            obj[key]={};
            for(let i=0; i<styles.length; i++){
              if(styles[i].length<=0) continue;
              let style=styles[i].replace('-','').split(':');
              obj[key][style[0]]=style[1];
            }
          });
          return obj;
        },
        set:function(){

        }
      },
      componentSelector(){
          return this.$store.state.editorPosition;
      },
      selectedComponent(){
          return this.$store.state.componentSelected;
      },
      reload(){
          return this.$store.state.reload;
      },
      reloadData(){
          return this.$store.state.reloadData;
      }
    },
    methods:{
      selectorStyle(){
          let style='';
          let selector=this.componentSelector;
         if(splitPx(selector.lineLeft.height)<40||splitPx(selector.lineTop.width)<80){
             style+='top:-24px;'
         }
         return style;
      },

      getIndexResource(){
          API.getIndex(51,this.templateId,'view')
            .then( (res) => {
                this.userData=res.data;
                this.gotUserData=true;
            })
            .catch((err) => {

            })
      },
    },
    components:{
      ...Indexes,
      ...ComponentSettings,
      ...NavBottoms
    }
  }

  function splitPx(str){
    let num=0;
    str+='';
    if(str instanceof Array){
      for(let i=0; i<str.length; i++){
        if(str[i].indexOf('px')>0){
          num=parseInt(str[i].replace('px',''));
        }else{
          num=parseInt(str[i]);
        }
      }
    }else{
        if(str.indexOf('px')>0){
          num=parseInt(str.replace('px',''));
        }else{
            num=parseInt(str);
        }
    }
    return num;
  }
</script>

<style scoped lang="less">
  @phoneWidth:375px;
  @phoneHeight:600px;
  .editor{
    height:calc(~"100vh - 144px");min-height: 500px;
    .width-limit{display: flex;  background:#fff; padding:4vh 80px 0 80px; height:100%; overflow: hidden;}
  }
  .phone-view{width:calc(~"0.52*(100vh - 200px)"); min-width: 210px; height:calc(~"100vh - 200px"); min-height: 400px; padding:5vh 0.5vh 9vh 0.5vh; border:1px solid #999; border-radius: 4vh;
    position:relative; box-shadow: 0 0 20px 1px #dfdfdf; }

  .phone-view:after{display: block; content:''; width:6vh; height:6vh; border-radius: 50%; border:1px solid #999; margin:1.5vh auto;}
  .template-area{
    width:100%; height:100%;position:relative; border:1px solid #999; padding:1px;
    overflow: auto; background:#fff;
    .main-wrapper{position:relative; height:100%; overflow: auto;}
    .no-data-notice{
      width:100%; height:100%; background:#fff; text-align: center; padding-top: 260px; position:absolute; top:0; left:0;
      .loading{
        height:40px; line-height: 40px;
        .iconfont{font-size: 36px; padding-bottom: 4px;}
      }
      .text{font-size: 12px; line-height: 60px;}
    }
  }
  textarea{width:300px; height:200px;}
  .edit-panel{
    width:calc(~"100% - 0.52*(100vh - 200px) - 120px"); height:100%;margin:0 0 30px 120px;position:relative; overflow: hidden;
    .mask-top{position:absolute; top:0; left:0; width:100%; height:30px; background:linear-gradient(to bottom,#fff,rgba(255,255,255,0));
      z-index: 2;}
    .scroll-wrapper{
      height:100%; overflow: auto; padding-top: 30px; position:relative;
    }
  }
  .component-selector{
    position:absolute; top:0; left:0; z-index: 10;
    .line-horizontal{border-top: 1px dashed #f00; position:absolute; transition:all 0.3s; }
    .line-vertical{border-left: 1px dashed #f00; position:absolute; transition:all 0.3s; }
    .edit-buttons{
      position:absolute; top:4px; right:0; height:20px; white-space:nowrap;line-height: 20px; padding:0 4px; text-align: right;
      moz-user-select: -moz-none;
      -moz-user-select: none;
      -o-user-select:none;
      -khtml-user-select:none;
      -webkit-user-select:none;
      -ms-user-select:none;
      user-select:none;
      .edit-button{display: inline-block; padding:0 8px; margin-left: 4px; background:#f8f8f8; font-size: 12px; border-radius: 4px;
        transition:all 0.2s; cursor:pointer; color:#999; text-align: center; }
      .editing{background:#f00; color:#fff;}
    }
  }

</style>
