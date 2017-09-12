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
        <p class="phone-num">{{resource.mobile}}</p>
      </div>
    </div>
    <div class="bg-bottom">
      <div class="text">
        <div class="contact">
          <div class="phone"></div>
          <div class="message"></div>
        </div>
        <p class="address">{{resource.address}}</p>
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
    .bg-top{
      width:100%; height:30vh; background:url("./images/card_bg_1.jpg") no-repeat; background-size: 100% 100%;  line-height:30vh; text-align: center;
      .text-top{
        display: inline-block; background:rgba(0,0,0,0.3); color:#fff; font-family: "宋体"; text-align: center; padding:0.8rem 0.4rem; vertical-align: middle;
        .name{font-size: 1.6rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-weight: bold; line-height: 1.8rem; border-bottom: 0.05rem solid #fff;}
        .intro{font-size: 1rem; line-height: 1.2rem;}
      }
    }
    .bg-center{
      width:100%; height:40vh; background:url("./images/card_bg_02.jpg") no-repeat; background-size: 100% 100%; color:#fff; text-align: center;

      .text{
        width:100%; height:100%; background:rgba(0,0,0,0.8);padding:0.4rem 1rem;
      }
    }
    .bg-bottom{
      width:100%; height:calc(~"30vh - 2.2rem"); padding:0.2rem; background:url("./images/card_bg_2.jpg") no-repeat; background-size: 100% 100%;
      color:#fff;
      .address{font-size: 0.65rem; font-weight: bold;}
    }
  }
</style>
