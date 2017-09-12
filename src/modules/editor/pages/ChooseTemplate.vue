<template>
  <div class="choose-template">
    <div class="banner-wrapper">
      <div class="width-limit">
        <div class="banner"></div>
      </div>
    </div>
    <div class="width-limit">
      <div class="templates context">
        <!--<div class="filter">-->
          <!--<span class="title">行业</span>-->
          <!--<ul>-->
            <!--<li class="router-link-active">全部</li>-->
            <!--<li>全部</li>-->
            <!--<li>全部</li>-->
            <!--<li>全部</li>-->
            <!--<li>全部</li>-->
            <!--<li>全部</li>-->
          <!--</ul>-->
        <!--</div>-->
        <template-preview v-for="template in templates.data" :template="template" :key="template.id"></template-preview>
      </div>
      <div class="block">
        <div class="title-bar">添加模板</div>
        <div class="content">
          <div class="input-line">
            <div class="input-title">code</div>
            <div class="input-content">
              <input type="text" v-model="template.code"/>
            </div>
          </div>
          <div class="input-line">
            <div class="input-title">name</div>
            <div class="input-content">
              <input type="text" v-model="template.name"/>
            </div>
          </div>
          <div class="input-line">
            <div class="input-title">img</div>
            <div class="input-content">
              <img-uploader :preImg="template.img" @success="getImg"></img-uploader>
            </div>
          </div>
          <div class="input-line">
            <div class="input-title">briefInfo</div>
            <div class="input-content">
              <input type="text" v-model="template.briefInfo"/>
            </div>
          </div>
          <div class="button-wrapper">
            <input type="button" class="border-button" value="保存" @click="upgradeTemplate"/>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import TemplatePreview from '../components/TemplatePreview.vue';
  import {API} from '../assets/getData';
  import ImgUploader from '../components/ImgUploader.vue'

    export default {
        data(){
          return({
            template:{},
            templates:{},
          })
        },
        components:{
            TemplatePreview,
          ImgUploader,
        },
        created(){
          this.getAllTemplates()
        },
        methods:{
            getAllTemplates(){
                API.getAllTemplates()
                  .then((res) => {
                    this.templates=res.data;
                  })
            },
          upgradeTemplate(){
            API.updateTemplate(this.template)
              .then((res) => {

              })
          },
          getImg(url){
                this.template.img=url;
          }
        }
    }
</script>

<style scoped lang="less">
  @import "../assets/commen";
  .choose-template{
    .banner-wrapper{background:#fff; padding:30px 0;}
    .banner{height:380px; background:#fff url("../assets/images/banner.png") no-repeat center center; background-size: 100% 100%;  }
    .width-limit{width:1200px;}
    .templates{
      margin-top: 30px;
      .filter{
        line-height: 20px;
        .title,ul,li{display: inline-block;}
        ul{padding-left: 20px;}
        li{padding:0 8px;}
        .router-link-active{border-radius: 12px; border:1px solid @green; color:@green;}
      }
    }
  }
</style>
