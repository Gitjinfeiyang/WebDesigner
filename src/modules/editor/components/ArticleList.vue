<template>
  <div>
        <div class="article-list">
          <div class="title">文章列表</div>
          <table>
            <thead>
            <tr>
              <td>选择</td>
              <td>文章标题</td>
              <td>配图</td>
              <td>操作</td>
            </tr>
            </thead>
            <transition-group name="list-complete" tag="tbody">
            <tr class="list-complete-item" v-for="(article,index) in allArticle.data" :key="article.id">
              <td><label><input type="checkbox" v-model="article.selected"/></label></td>
              <td><p class="article-text">{{article.title}}</p></td>
              <td class="img-td"><img :src="ImgUrl+article.img"/></td>
              <td>
                <span class="link iconfont" @click="editArticle(article)">&#xe61b;</span>
                <span class="link iconfont" @click="deleteArticle(article)">&#xe618;</span>
                <span v-if="index<allArticle.data.length-1" class="link iconfont" @click="exchangeArticle(article.id,allArticle.data[index+1].id)">&#xe701;</span>
              </td>
            </tr>
            <tr v-if="allArticle.data&&allArticle.data.length<=0"><td colspan="4">还没有文章</td></tr>
            </transition-group>
          </table>
          <div class="add-new"><span class="link" @click="addArticle">添加到文章列表</span></div>
        </div>
        <div class="block">
          <div class="title-bar">{{article.id?'编辑文章':'添加文章'}}</div>
          <div class="content">
            <div class="input-line">
              <div class="input-title">标题</div>
              <div class="input-content"><input type="text" v-model="article.title"/></div>
            </div>
            <div class="input-line">
              <div class="input-title">摘要</div>
              <div class="input-content"><textarea v-model="article.summary"></textarea></div>
            </div>
            <div class="input-line">
              <div class="input-title">图片</div>
              <div class="input-content"><img-uploader @success="getImg" :preImg="article.img"></img-uploader></div>
            </div>
            <div class="input-line">
              <div class="input-title">内容</div>
              <div class="input-content"><html-editor :content="article.content" @success="getContent"></html-editor></div>
            </div>
            <div class="button-wrapper">
              <input type="button" class="border-button" value="保存" @click="updateArticle"/>
              <input type="button" class="border-button" value="重置" @click="resetArticle"/>
            </div>
          </div>
        </div>
  </div>

</template>

<script>
  import {API,IMGURL} from '../assets/getData';
  import ImgUploader from '../components/ImgUploader.vue';
  import HtmlEditor from '../components/HtmlEditor.vue'


  export default {
      props:['source'],
        data(){
            return({
              allArticle:[],
              ImgUrl:IMGURL,
              article:{}

            })
        },
        created(){
          this.getAllArticle();
        },
        computed:{
          userId(){
              return this.$store.state.userId;
          },
        },
        methods:{
            getAllArticle(){
                API.getAllArticle(this.userId)
                  .then((res) => {
                    this.allArticle=res.data;
                    if(this.source&&this.source.length){
                      for(let i=0; i<this.allArticle.data.length; i++){
                        for(let o=0; o<this.source.length; o++){
                          if(this.allArticle.data[i].id == this.source[o].id){
                            this.allArticle.data[i].selected=true;
                          }
                        }
                      }
                    }
                  })
            },
          editArticle(article){
            API.getArticleDetail(article.id)
              .then((res) => {
                this.article=res.data;
              })
          },
          updateArticle(){
            API.updateArticle({
              userId:this.userId,
              id:this.article.id,
              img:this.article.img,
              title:this.article.title,
              summary:this.article.summary,
              content:this.article.content,
            })
              .then((res) => {
                this.getAllArticle();
                this.resetArticle();
                this.$store.dispatch('notice',{text:'保存成功'})
              })
          },
          exchangeArticle(id,targetId){
            API.exchangeArticle(id,targetId)
              .then((res) => {
                this.getAllArticle()
              })
          },
          addArticle(){
            let articles=[];
            for(let i=0; i<this.allArticle.data.length; i++){
                if(this.allArticle.data[i].selected){
                    articles.push(this.allArticle.data[i]);
                }
            }
            this.$emit('addArticle',articles);
            this.close();
          },
          deleteArticle(article){
            if(!confirm('确认要删除 '+article.title+' 吗？')) return;
            API.deleteArticle(article.id)
              .then((res) => {
                this.getAllArticle()
              })
          },
          resetArticle(){
            this.article={};
          },
          getContent(data){
            this.article.content=data;
          },
          getImg(url){
            this.article.img=url;
          },
          close(){
              this.$emit('close');
          }
        },
        components:{
            ImgUploader,
          HtmlEditor,
        }
    }
</script>

<style scoped lang="less">
  @import '../assets/commen';
  ::-webkit-scrollbar{display: none;}

  /*.articles {*/
    /*position: fixed;*/
    /*top: 0;*/
    /*left: 0;*/
    /*width: 100%;*/
    /*height: 100%;*/
    /*background: rgba(0, 0, 0, 0.5);*/
    /*line-height: 100vh;*/
    /*text-align: center;*/
    /*z-index: 50;*/
    /*.article-content {*/
      /*background: #fff;*/
      /*display: inline-block;*/
      /*overflow: hidden;*/
      /*vertical-align: middle;*/
      /*width: 80%;*/
      /*height: 80%;*/
      /*border: 1px solid #e4e4e4;*/
      /*border-radius: 2px;*/
      /*.title-bar {*/
        /*text-align: left;*/
      /*}*/
      /*.content {*/
        /*height: calc(~"100% - 40px");*/
        /*overflow: auto;*/
      /*}*/
    /*}*/
  /*}*/
    .article-list{
      border-radius: 6px; border:1px solid #e4e4e4;      line-height: 48px; margin-bottom: 30px;

      .title{text-indent: 10px;}
      table{
        text-align: center; width:100%; border-collapse: collapse;
        input{vertical-align: middle; opacity:0.5;}
        thead{background:@lightGreen;}
        td.img-td{
          img{width:100px; vertical-align: middle;}
        }
        tr:nth-of-type(even){background:#f9f9f9;}
      }
      .add-new{text-align: center; font-size: 12px; color:@blue;}
    }

  .block{
    line-height: 48px;
    .input-title{flex:0 80px; flex-shrink: 0;}
  }



</style>
