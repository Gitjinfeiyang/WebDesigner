<template>
  <div class="card" v-if="options">
    <div class="bg-top">
      <div class="text-top">
        <p class="name">{{resource.wzName}}</p>
        <p class="intro">全国个性精装领导品牌</p>
      </div>
    </div>
    <div class="bg-center">
      <div class="text">
        <p class="title">{{resource.contactName}}</p>
        <p class="phone-num"><i class="iconfont">&#xe6dd;</i>{{resource.mobile}}</p>
        <p class="good">{{resource.goodatInto}}</p>
      </div>
    </div>
    <div class="bg-bottom">
      <div class="text">
        <div class="contact">
          <a class="phone" :href="'tel:'+resource.mobile">
            <i class="iconfont">&#xe6dd;</i>
          </a>
          <a class="message" :href="'sms:'+resource.mobile">
            <i class="iconfont">&#xe638;</i>
          </a>
        </div>
        <p class="address"><i class="iconfont">&#xe614;</i>{{resource.address}}</p>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        props:['options'],
      computed:{
            resource(){
                return this.options;
            }
      }
    }
</script>

<style scoped lang="less">
  .card{
    overflow: hidden; height:100%;
    .bg-top{
      width:100%; height:30vh; background:url("./images/card_bg_1.jpg") no-repeat; background-size: 100% 100%;  line-height:30vh; text-align: center;
      .text-top{
        display: inline-block; background:rgba(0,0,0,0.3); color:#fff; font-family: "宋体"; text-align: center; padding:0.8rem 0.4rem; vertical-align: middle;
        .name{font-size: 1.4rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-weight: bold; line-height: 1.8rem; border-bottom: 0.05rem solid #fff;}
        .intro{font-size: 0.8rem; line-height: 1.2rem;}
      }
    }
    .bg-center{
      width:100%; background:url("./images/card_bg_02.jpg") no-repeat; background-size: 100% 100%; color:#fff; text-align: center;

      .text{
        width:100%; height:100%; background:rgba(0,0,0,0.75);padding:1rem 1rem;
        .title{line-height: 1.6rem;}
        .phone-num{
          font-size: 0.6rem; line-height: 1rem;
          .iconfont{display: inline-block;padding:0 10px;}
        }
        .good{line-height: 1.6rem; height:5.3rem; overflow: hidden; font-size: 0.58rem;padding:0.5rem 1rem 0 1rem; color:#cdcdcd;}
      }
    }
    .bg-bottom{
      margin:0.2rem; height:calc(~"30vh - 2.2rem"); padding:0.2rem; background:url("./images/card_bg_2.jpg") no-repeat; background-size: 100% 100%;
      color:#fff;text-align: center;
      .contact{
        padding:0.5rem;
        .phone,.message{display: inline-block; width:3rem; height:3rem;border-radius: 50%; border:2px solid #fff; line-height: 3rem; text-align: center; font-size: 1.6rem;}
        .phone{margin-right: 2rem;}
        .message{}
      }
      .address{
        font-size: 0.6rem; font-weight: bold;
        .iconfont{padding-right: 10px;}
      }
    }
  }
</style>
