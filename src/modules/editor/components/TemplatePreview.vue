<template>
  <div class="template-preview" @mouseover="getErweima">
    <div class="img-container">
      <img :src="imgUrl+template.img" />
      <div class="mask">
        <div class="content">
          <img :src="previewErweima" />
          <input type="button" class="green-button" value="立即使用" @click="goTo"/>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import {IMGURL,API} from '../assets/getData'
    export default {
        props:['template'],
      data(){
            return({
              imgUrl:IMGURL,
              previewErweima:'',
              gettingErweima:false,
            })
      },
      methods:{
          goTo(){
              API.useTemplate(51,this.template.code||this.template.templateCode)
                .then((res) => {
                  this.$router.push({name:'contentEditor',params:{id:this.template.code||this.template.templateCode}})
                })
          },
        getErweima(){
              if(this.previewErweima.length>0||this.gettingErweima) return;
              this.gettingErweima=true;
              API.getErweima(51,this.template.code,'view')
                .then((res) => {
                  this.previewErweima=res.data.img;
                  this.gettingeErweima=false;
                })
        }
      }
    }
</script>

<style scoped lang="less">
.template-preview{
  display: inline-block; width:280px; height:400px; padding:30px;overflow: hidden;
  .img-container{
    height:100%; position:relative;
    img{width:100%; height:100%;}
  }
  .mask{
    position:absolute; left:0; top:0; width:100%; height:100%; background:rgba(0,0,0,0.3); display: none;
    .content{
      position:absolute; top:50%; left:0; width:100%;height:200px; text-align: center; margin-top: -100px;
      img{width:120px; height:120px;}

    }
  }
}
  .template-preview:hover{
    .mask{
      display: block;

    }
  }
</style>
