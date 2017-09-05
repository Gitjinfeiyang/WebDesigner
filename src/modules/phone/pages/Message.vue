<template>
  <div class="message">
    <div class='banner'></div>
    <div class='input-area'>
      <form>
        <div class='input-line'>
          <div class='input-title'>请输入您的内容</div>
          <div class='input-content'>
            <textarea placeholder="如果您需要任何法律方面的帮助，请在此处留言向我提交，我会第一时间给您回复。" name="content" v-model="message.content"></textarea>
          </div>
        </div>
        <div class='input-line'>
          <div class='input-title'>姓名</div>
          <div class='input-content'><input type='text' name="name" v-model="message.name"/></div>
        </div>
        <div class='input-line'>
          <div class='input-title'>请输入您的手机号</div>
          <div class='input-content'><input type='text' name="tel" v-model="message.tel"/></div>
        </div>
        <div class='input-line verify'>
          <div class='input-title'>请输入验证码</div>
          <div class='input-content'>
            <div class='bg-hack'>
              <input type='text' v-model="message.code"/>
              <img :src='valiImg' @click="getValiCode"/>
            </div>
          </div>
        </div>
        <div class='input-line'>
          <div class='button-wrapper'>
            <input type='button' value='提交' class='blue-button' @click="addMessage"/>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import {API} from '../assets/getData';

    export default {
        data(){
            return ({
              valiImg:'',
              message:{},
            })
        },
      created(){
        this.getValiCode()
      },
      methods:{
          getValiCode(){
              API.getValiCode(51)
                .then((res) => {
                  this.valiImg=res.data.img;
                  this.message.token=res.data.token;
                })
          },

          addMessage(){
              API.addMessage({userId:51,...this.message})
                .then((res) => {
                  if(res.data.flag == true){
                    alert('留言成功')
                    this.message={};
                    this.getValiCode();
                  }else{
                      alert('验证码错误');
                  }
                })
          }
      }
    }
</script>

<style scoped lang="less">
  @import '../../../template/template_1/style/commen.less';

  .message .banner{background:url('../../../template/template_1/images/message_bg.jpg') no-repeat; height:8rem;}
  .message .input-line{padding:0.1rem 0.5rem;}
  .message .input-title{font-size: 0.6rem;color:#000; line-height: 1.5rem;}
  .message input,.message textarea{width:100%; border-radius: 2px; border:1px solid #f1f1f1;
    text-indent: 10px; font-size: 0.6rem;}
  .message input{line-height: 1.8rem;}
  .message textarea{line-height: 1rem; min-height: 3rem;padding:0.5rem;}
  .message .verify{font-size: 0;}
  .message .verify input{border:none; width:calc(~"100% - 4rem");font-size: 0.6rem;}
  .message .verify .bg-hack{border:1px solid #f1f1f1; background:#fff;}
  .message .verify img{width:3rem; margin:0.2rem 0.5rem; height:1.2rem; vertical-align: top;}

  .button-group .title{font-size: 0.6rem; text-align: center; line-height: 2rem;}
  .title img{margin-right: 10px; vertical-align: middle;padding-bottom: 10px;}
</style>
