<template>
  <div class="template-preview" @mouseover="getErweima">
    <div class="img-container">
      <div class="selected-notice" v-if="defaultTemplate==templateCode">正在使用</div>
      <img :src="imgUrl+template.img" />
      <div class="mask">
        <div class="content">
          <img :src="previewErweima" />
          <input type="button" class="green-button" :value="defaultTemplate==templateCode?'设置':'立即使用'" @click="goTo"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {IMGURL,API} from '../assets/getData'
    export default {
        props:['template','type'],
      data(){
            return({
              imgUrl:IMGURL,
              previewErweima:'',
              gettingErweima:false,
            })
      },
      computed:{
        defaultTemplate(){
            return this.$store.state.defaultTemplateCode;
        },
        templateCode(){
            return this.template.code||this.template.templateCode;
        },
        userId(){
            return this.$store.state.userId;
        }
      },
      methods:{
          goTo(){
              API.useTemplate(this.userId,this.templateCode)
                .then((res) => {
                  this.$router.push({name:'contentEditor',params:{id:this.templateCode}})
                })
          },
        getErweima(){
              if(this.previewErweima.length>0||this.gettingErweima) return;
              this.gettingErweima=true;
              let userId=56;
              //如果是个人模板则预览个人的，否则预览公用的
              if(this.type == 'private'){
                  userId=this.userId;
              }
              API.getErweima(userId,this.templateCode,'view')
                .then((res) => {
                  this.previewErweima=res.data.img;
                  this.gettingeErweima=false;
                })
        }
      }
    }
</script>

<style scoped lang="less">
  @import '../assets/commen';
.template-preview{
  display: inline-block; width:280px; height:400px; padding:30px;overflow: hidden; position:relative;
  .img-container{
    height:100%; position:relative; border-radius: 4px; overflow: hidden;
    img{width:100%; height:100%;}
  }
  .mask{
    position:absolute; left:0; top:0; width:100%; height:100%;  display: none;
    .content{
      position:absolute; top:50%; left:0; width:100%;height:200px; text-align: center; margin-top: -100px;
      img{width:120px; height:120px; margin-bottom: 20px;}

    }
  }

  .selected-notice{position:absolute; top:0; left:0; line-height: 30px; text-align: center; background:@yellow;
    width:100%; color:#fff; z-index: 10; font-size: 12px;}
}
  .template-preview:hover{
    .img-container>img{filter:blur(20px);}
    .mask{
      display: block;
    }
  }
</style>
