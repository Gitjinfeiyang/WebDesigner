<template>
  <div class="img-uploader">
    <div class="img-left" @click="openFile"><img :src="img"  v-if="img.length>0"/><i class="iconfont" v-if="img.length<=0">&#xe639;</i></div>
    <div class="text-right">
      <div class="button-top">
        <input style="display: none;" type="file" id="fileUploader" ref="file_uploader" accept="image/png,image/gif,image/jpeg"/>
        <button :disabled="uploading" class="border-button" @click="openFile"><i class="iconfont" v-if="!uploading">&#xe6e7;</i><span class="loading" v-if="uploading"><i class="iconfont">&#xe703;</i></span> {{uploading?'上传中':'上传图片'}}</button>
      </div>
      <p class="text">请上传200*200 大小不超过300kb的图片</p>
    </div>
  </div>
</template>

<script>
  import {API,IMGURL} from '../assets/getData';

    export default {
        props:{
          sizeLimit:50000,
          preImg:{
              default(){
                  return ''
              }
          },
        },
        data(){
          return ({
            imgUploaded:'',
            baseUrl:IMGURL,
            uploading:false,
          })
        },
        computed:{
          img(){
              let img='';
              if(this.preImg.length>0){
                  img=IMGURL+this.preImg;
              }else if(this.imgUploaded.length>0){
                  img=IMGURL+this.imgUploaded;
              }
              return img;
          }
        },
        mounted(){
          this.$refs.file_uploader.addEventListener('change',(e) => {
              this.uploading=true;
              this.imgUploaded='';

              if(e.target.files[0].size>this.sizeLimit){
                  alert('图片大小不能超过50kb');
                  return;
              }
              let formData=new FormData();
              formData.append('img',e.target.files[0]);
              this.$store.dispatch('notice',{text:'图片上传中...',duration:0});
              API.uploadImg(formData)
                .then( (res) => {
                    if(res.data.errno == 0){
                        this.imgUploaded=res.data.data[0];
                        this.$store.dispatch('notice',{text:'图片上传成功'});
                        this.$emit('success',res.data.data[0]);
                    }else{
                      this.$store.dispatch('notice',{text:'上传失败，服务器错误'});
                    }
                    this.uploading=false;
                })
                .catch( (err) => {
                  this.uploading=false;
                  this.$store.dispatch('notice',{text:'上传失败，服务器错误'});
                })
          });
        },
        methods:{
            openFile(){
              this.$refs.file_uploader.value='';
              this.$refs.file_uploader.click();
            },

        }

    }
</script>

<style scoped lang="less">
label{display: inline-block;}
  .img-uploader{
    display: flex;
    .border-button{line-height: 24px; height: 24px; }
    .img-left{
      flex:0 100px; height:100px; flex-shrink: 0; line-height: 100px; text-align: center;
      img{width:100%; height:100%;}
      .iconfont{color:#f1f1f1; font-size: 80px;}
    }
    .text-right{
      flex:1; padding-left: 30px; line-height: 36px; padding-top: 20px;
      .text{color:#999; font-size: 12px;}
    }
  }
</style>
