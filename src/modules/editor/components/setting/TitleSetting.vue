<template>
  <div class="title-setting">
    <div class="block">
      <div class="title-bar">标题</div>
      <div class="content">
        <div class="input-line">
          <div class="input-title">标题</div>
          <div class="input-content"><input type="text" v-model="options.data.source[0].title"/></div>
        </div>
      </div>
    </div>
    <div class="block choose-icon">
      <div class="title-bar">图标</div>
      <div class="content">
        <div class="input-line">
            <div class="icon-wrapper" @click="options.data.source[0].img = icon" :class="options.data.source[0].img == icon?'link-active':''" v-for="icon in fontIcons"><i class="iconfont" v-html="icon"></i></div>
        </div>
      </div>
    </div>
    <div class="button-wrapper"><input type="button" class="border-button" value="保存" @click="addTitle"/></div>
  </div>
</template>

<script>
  import {API,IMGURL} from '../../assets/getData';
  import {fontIcons} from '../../assets/getTemplate';

    export default {
        props:['options'],
        data(){
          return({
            title:{},
            allTitles:[],
            imgUrl:IMGURL,
            fontIcons,
          })
        },
        created(){
//          this.getTitles()
        },
        methods:{
            addTitle(){
                delete this.options.data.source[0].updateTime;
                delete this.options.data.source[0].createTime;
                API.addTitle({
                  userId:51,
                  templateCode:'template_1',
                  modelId:this.options.id,
                  modelClassify:3,
                  ...this.options.data.source[0]
                })
                  .then((res) => {
                    if(res.data.flag == true){
                      this.$store.dispatch('notice',{text:'保存成功'})
                    }else{
                        this.$store.dispatch('notice',{text:'保存失败'})
                    }
                  })
            },
            getTitles(){
                API.getTitles(51)
                  .then((res) => {
//                    this.title=res.data;
                  })
            }
        }

    }
</script>

<style scoped lang="less">
  @import '../../assets/commen';

</style>
