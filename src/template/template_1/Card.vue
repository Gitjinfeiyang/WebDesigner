<template>
  <div class="card" v-if="options">
    <div class='card card1'>
      <div class='avatar'><div class='img-wrapper'><img :src='imgUrl+options.logoUrl'/></div></div>
      <div class='name'>{{options.wzName}}</div>
      <div class='introduction'>{{options.intro}}</div>
    </div>
    <div class='card card2'>
      <div class='title'>擅长类目：</div>
      <p class='text'>{{options.goodatInto}}</p>
    </div>
    <div class='card card3'>
      <div class='line'>
        <img src='./images/phone_icon.png'/>
        <div class='text'>{{options.mobile}}</div>
      </div>
      <div class='line'>
        <img src='./images/email_icon.png'/>
        <div class='text'>{{options.email}}</div>
      </div>
      <div class='line'>
        <img src='./images/location_icon.png'/>
        <div class='text'>{{options.address}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {IMGURL} from '../../modules/phone/assets/getData';
    export default {
        props:['options'],
        data(){
            return({
              imgUrl:IMGURL
            })
        }
    }
</script>

<style scoped lang="less">
  .wrapper{padding:0.512rem; margin-bottom: 1.5rem;}
  .card{border-radius: 4px; font-size: 0.6rem; padding:1rem; background-size:100% 100%; margin-bottom: 20px;}
  .card1{background-image: url('./images/card_bg_03.jpg'); text-align: center;}
  .card1 .img-wrapper{display: inline-block; width:3.5rem; height:3.5rem; border-radius: 50%; overflow: hidden;}
  .card1 .img-wrapper img{width:100%; height:100%; background:#f1f1f1;}
  .card1 .name{line-height: 1.8rem; font-size: 0.8rem;}
  .card1 .introduction{line-height: 1.2rem; color:#666;padding:0.2rem 1rem;}

  .card2{background-image: url('./images/card_bg_06.jpg');}
  .card2 .title{display: inline-block; line-height: 1.8rem; border-bottom: 1px solid #000; font-size: 0.8rem;}
  .card2 .text{width:70%; background:#fff;padding:0.3rem; margin:0.4rem 0; color:#666; font-size: 0.6rem;}

  .card3{background-image: url('./images/card_bg_2.jpg');}
  .card3 .line{padding:0.2rem 1rem;line-height: 1rem; font-size: 0.65rem;}
  .card3 .text{display: inline-block; vertical-align:top; width:calc(~"100% - 80px"); padding-left: 10px;}
  .card3 img{vertical-align: top;padding-top: 10px;}
</style>
