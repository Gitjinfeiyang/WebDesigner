<template>
  <div class="info">
    <div class="width-limit">
      <div class="context">
        <div class="block">
          <div class="title-bar">基本资料设置</div>
          <div class="content">
            <div class="input-line">
              <div class="input-title">公司/个人名称</div>
              <div class="input-content"><input type="text" v-model="wzUser.wzName"/></div>
            </div>
            <div class="input-line">
              <div class="input-title">联系人</div>
              <div class="input-content"><input type="text" v-model="wzUser.contactName"/></div>
            </div>
            <div class="input-line">
              <div class="input-title">官网logo/个人头像</div>
              <div class="input-content"><img-uploader @success="getImg" :preImg="wzUser.logoUrl"></img-uploader></div>
            </div>
            <div class="input-line">
              <div class="input-title">联系电话</div>
              <div class="input-content"><input type="text" v-model="wzUser.mobile"/></div>
            </div>
            <div class="input-line">
              <div class="input-title">联系地址</div>
              <div class="input-content"><input type="text" v-model="wzUser.address"/></div>
            </div>
            <div class="input-line">
              <div class="input-title">业务擅长领域</div>
              <div class="input-content"><textarea placeholder="不超过60个字" v-model="wzUser.goodatInto"></textarea></div>
            </div>
            <div class="input-line">
              <div class="input-title">公司/个人简介</div>
              <div class="input-content"><textarea placeholder="不超过100个字" v-model="wzUser.intro"></textarea></div>
            </div>
          </div>
        </div>
        <div class="button-wrapper">
          <input type="button" class="border-button" value="保存" @click="payloadInfo"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ImgUploader from '../components/ImgUploader.vue';
  import {API} from '../assets/getData';

    export default {
      data(){
        return ({
          wzUser:{}
        })
      },
        components:{
            ImgUploader,
        },
      created(){
        this.getUserInfo();
      },
      methods:{
          getImg(url){
              this.wzUser.logoUrl=url;
          },
          getUserInfo(){
            API.getUserInfo(51)
              .then( (res) => {
                  this.wzUser=res.data;
              })
              .catch( (res) => {

              })
          },
          payloadInfo(){
              this.$store.dispatch('notice',{text:'正在保存...',duration:0});
            API.upgradeUserInfo({userId:1,...this.wzUser})
              .then( (res) => {
                this.$store.dispatch('notice',{text:'保存成功'})
              })
              .catch( (res) => {
                  this.$store.dispatch('notice',{text:'保存失败，服务器异常'});
              })
          }
      }
    }
</script>

<style scoped lang="less">
  .info{
    padding:30px 0;
    .context{
      padding:50px 120px; line-height: 36px;
      .block{width:900px; margin:0 auto;}
      .input-title{flex:0 300px; text-align: right; padding-right: 50px;}
      .input-content{padding-right: 100px;}
    }
  }
</style>
