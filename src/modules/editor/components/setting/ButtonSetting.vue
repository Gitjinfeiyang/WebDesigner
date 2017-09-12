<template>
  <div class="button-setting" v-if="options&&options.data.source">
    <div class="block">
      <div class="title-bar">标题和链接内容</div>
      <div class="content">
        <div class="input-line">
          <div class="input-title">标题</div>
          <div class="input-content"><input type="text" v-model="options.data.source[0].name"/></div>
        </div>
        <div class="input-line">
          <div class="input-title">链接到</div>
          <div class="input-content">
            <label>
              <input type="radio" name="linkTo" :value="route.HOME.id" v-model="buttonData.classify"/>首页
            </label>
            <label>
              <input type="radio" name="linkTo" :value="route.LIST.id" v-model="buttonData.classify"/>文章列表
            </label>
            <label>
              <input type="radio" name="linkTo" :value="route.MESSAGE.id" v-model="buttonData.classify"/>留言板
            </label>
            <label>
              <input type="radio" name="linkTo" :value="route.CARD.id" v-model="buttonData.classify"/>微名片
            </label>
          </div>
        </div>
        <div class="list" v-if="buttonData.classify == route.LIST.id">
          <div class="title">文章列表</div>
          <table>
            <thead>
              <tr>
                <td>序号</td>
                <td>文章标题</td>
                <td>操作</td>
              </tr>
            </thead>
            <transition-group tag="tbody" name="list-complete">
              <tr class="list-complete-item" v-for="(article,index) in articleSelected" :key="article.id">
                <td>{{index+1}}</td>
                <td><p class="article-text">{{article.title}}</p></td>
                <td><span class="link iconfont" @click="deleteArticle(index)">&#xe618;</span></td>
              </tr>
            </transition-group>
          </table>
          <div class="add-new"><span class="link" @click="editArticle=true">选择文章</span></div>
        </div>
      </div>
    </div>
    <div class="block choose-icon">
      <div class="title-bar">图标</div>
      <div class="content">
        <div class="icon-wrapper" :class="buttonData.icon==icon?'link-active':''" v-for="icon in svgIcons" @click="buttonData.icon=icon">
          <svg class="icon" aria-hidden="true">
            <use :xlink:href="'#'+icon"></use>
          </svg>
        </div>
      </div>
    </div>
    <div class="button-wrapper">
      <input type="button" class="border-button" value="保存" @click="editButton"/>
    </div>
    <transition name="fade">
      <div class="articles"  v-if="editArticle">

        <div class="article-content block">
          <div class="title-bar">
            文章库
            <span class="iconfont close-button" @click="editArticle=false">&#xe622;</span>
          </div>
          <div class="content">
            <article-list @addArticle="addArticle" :source="articleSelected" @close="editArticle=false"></article-list>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import {route} from '../../../phone/router/router';
  import AddArticle from '../AddArticle.vue';
  import ArticleList from '../ArticleList.vue';
  import {API} from '../../assets/getData';
  import {svgIcons} from '../../assets/getTemplate';


  export default {
        props:['options'],
        data(){
            return({
              route:route,
              button:{},
              editArticle:false,
              svgIcons:svgIcons,
            })
        },
        mounted(){

        },
        computed:{
          buttonData(){
              return this.options.data.source[0];
          },
          articleSelected:{
              get:function(){
                return this.buttonData.source;
              },
              set:function(val){
                  if(!this.buttonData.source){
                      this.$set(this.buttonData,'source',[])
                  }
                    this.buttonData.source=val;
              }
          }
        },
        methods:{
          addArticle(articles){
              this.articleSelected=[];
              for(let i=0; i<articles.length; i++){
                  this.articleSelected.push(articles[i]);
              }
          },
          deleteArticle(index){
              this.articleSelected.splice(index,1);
          },
          editButton(){
              let ids='';

            if(this.options.data.source[0].classify == this.route.LIST.id){
              for(let i=0; i<this.articleSelected.length; i++){
                ids+=this.articleSelected[i].id+',';
              }
            }

              let data={
                userId:this.$store.state.userId,
                templateCode:this.$store.state.templateCode,
                modelId:this.options.id,
                modelClassify:2,
                articleids:ids,
                id:this.options.data.source[0].id||'',
                name:this.options.data.source[0].name,
                classify:this.options.data.source[0].classify,
                icon:this.options.data.source[0].icon,
              };

              API.editButton(data)
                .then((res) => {
                  this.$store.dispatch('notice',{text:'保存成功'});
                  this.$store.dispatch('reloadIndex');
                })
          }
        },
        components:{
            AddArticle,
            ArticleList,
        }
    }
</script>

<style scoped lang="less">
@import '../../assets/commen';

label{
  padding-right: 20px;
  input{vertical-align: middle; margin-right: 4px;}
}


  .block{
    margin-bottom: 20px;
    .content{
      .input-title{text-align:left; flex:0 60px; }
      .input-content{padding-left: 30px;}
    }
  }

  .list{
    border-radius: 6px;line-height: 48px; border:1px solid #e4e4e4;
    .title{text-indent: 10px;}
    table{
      text-align: center; width:100%; border-collapse: collapse;
      thead{background:@lightGreen;}
    }
    .delete{color:@blue; font-size: 12px;}
    .add-new{text-align: center; font-size: 12px; color:@blue;}
  }

  .choose-icon{

  }


.articles {
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
background: rgba(0, 0, 0, 0.5);
line-height: 100vh;
text-align: center;
z-index: 50;
.article-content {
background: #fff;
display: inline-block;
overflow: hidden;
vertical-align: middle;
width: 80%;
height: 80%;
border: 1px solid #666;
border-radius: 6px;
  box-shadow: 0 0 10px 1px #333;
.title-bar {
text-align: left; position:relative;
  .close-button{
    position:absolute; right:10px; top:0; height:100%; cursor:pointer;
  }
}
.content {
height: calc(~"100% - 40px");
overflow: auto;
}
}
}


  .icon-wrapper{border:1px solid #fff; transition:all 0.3s;}

</style>
