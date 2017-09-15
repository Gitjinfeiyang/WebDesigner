<template>
  <div class="message">
    <div class="width-limit">
      <div class="table-wrapper">
        <table>
          <thead>
          <tr>
            <td class="time">时间</td>
            <td class="content">留言内容</td>
            <td class="contact">联系方式</td>
          </tr>
          </thead>
          <tbody>
          <tr v-for="data in message.data">
            <td>{{data.createTime | timestampToDate}}</td>
            <td><div class="message-context">{{data.content}}</div></td>
            <td>{{data.tel}}</td>
          </tr>
          </tbody>
        </table>
        <div class="button-wrapper">
          <input type="button" class="border-button" :value="noMoreMessage?'没有更多数据':'查看更多'" @click="getMoreMessage" :disabled="noMoreMessage"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {API} from '../assets/getData';

    export default {
        data(){
          return ({
            message:{},
            noMoreMessage:false,
          })
        },
        created(){
            this.getMessage()
        },
        filters:{
          timestampToDate(time){
              let date=new Date(time);
              return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
          }
        },
        computed:{
          userId(){
              return this.$store.state.userId;
          }
        },
        methods:{
            getMessage(){
                API.getMessage(this.userId)
                  .then((res) => {
                    this.message=res.data;
                  })
            },
            getMoreMessage(){
                API.getMessage(this.userId,this.message.start+11)
                  .then((res) => {
                    if(res.data.data.length<this.message.rows){
                      this.$store.dispatch('notice',{text:'没有更多数据了'})
                      this.noMoreMessage=true;
                    }else{
                      Array.prototype.push.apply(this.message,res.data.data);
                      this.message.rows=res.data.rows;
                      this.message.start=res.data.start;
                    }
                  })
            },
        }
    }
</script>

<style scoped lang="less">
  @import '../assets/commen';
  .message{
    padding:60px 0;
    .width-limit{
      background:#Fff; padding:40px;
      .table-wrapper{
        table{
          border-collapse: collapse; line-height: 36px; table-layout: fixed; text-align: center; width:100%;
          .message-context{display: inline-block; line-height: 24px; padding:8px; max-height: 76px; height:100%;
            overflow: hidden; text-overflow: ellipsis; vertical-align: middle;}
          td.time{width:20%;}
          td.contact{width:20%;}
          td.content{width:60%;}
          tbody{
            tr:nth-of-type(even){background:#f8f8f8;}
          }
        }
      }

    }
  }
</style>
