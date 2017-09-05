<template>
  <div id="div3" class="wang-editor" @blur="save"></div>
</template>

<script>
  import Editor from 'wangeditor';
  import {IMGURL} from '../assets/getData';

    export default {
        props:['content'],
        data(){
          return({
            editor:{}
          })
        },
        watch:{
          content(){
            this.editor.txt.html(this.content);
          }
        },
        mounted(){
          let E = Editor;
          this.editor = new E('#div3');
          this.editor.customConfig.uploadImgMaxSize = 1024 * 1024;
          this.editor.customConfig.uploadFileName = 'img';
          this.editor.customConfig.uploadImgServer = '/api/wz/file/upload.json';
          this.editor.customConfig.uploadImgHooks={
            customInsert:function(insertImg,result,editor){
                for(let i=0; i<result.data.length; i++){
                    result.data[i]=IMGURL+result.data[i];
                    insertImg(result.data[i])
                }
            }
          };
          this.editor.create();
        },
        methods:{
            save(){
                this.$emit('save',this.editor.txt.html());
            }
        }
    }
</script>

<style scoped lang="less">
  .wang-editor{text-align: left;}
</style>
