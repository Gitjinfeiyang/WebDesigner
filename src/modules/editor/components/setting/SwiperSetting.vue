<template>
  <div class="swiper-setting">
    <div class="table-wrapper">
      <table>
        <thead>
        <tr>
          <td>选择</td>
          <td>图片</td>
          <td>摘要</td>
          <td>操作</td>
        </tr>
        </thead>
        <transition-group tag="tbody" name="list-complete">
          <tr class="item list-complete-item" v-for="(swipe,index) in allSwiper" v-if="allSwiper.length>0"
              :key="swipe.id">
            <td><label><input v-if="radio!='1'" type="checkbox" v-model="swipe.checked"/><input v-if="radio=='1'"
                                                                                                name="checked"
                                                                                                :value="swipe.id"
                                                                                                type="radio"
                                                                                                v-model="radioSwiperSelected"/></label>
            </td>
            <td><img :src="imgUrl+swipe.url"/></td>
            <td>{{swipe.summary}}</td>
            <td>
              <span class="link iconfont" title="删除" @click="deleteSwiper(swipe)">&#xe618;</span>
              <span class="link iconfont" title="编辑" @click="editSwiper(swipe)">&#xe61b;</span>
              <span class="link iconfont" title="下移" v-if="index<allSwiper.length-1"
                    @click="exchangeSwiper(swipe.id,allSwiper[index+1].id)">&#xe701;</span>
            </td>
          </tr>
          <tr v-if="allSwiper.length<=0" key="loading">
            <td colspan="4" class="loading"><i class="iconfont">&#xe703;</i></td>
          </tr>
          <tr key="save">
            <td colspan="4">
              <loading-button :clickHandler="setSwiper" :loading="settingSwiper">保存</loading-button>
            </td>
          </tr>
        </transition-group>
      </table>
    </div>
    <div class="block">
      <div class="title-bar">{{newPhoto.id?'编辑':'新增'}}图片</div>
      <div class="content">
        <div class="input-line">
          <div class="input-title">图片</div>
          <div class="input-content">
            <img-uploader :preImg="newPhoto.url" @success="getImg"></img-uploader>
          </div>
        </div>
        <div class="input-line">
          <div class="input-title">标题</div>
          <div class="input-content"><input type="text" name="title" v-model="newPhoto.title"/></div>
        </div>
        <div class="input-line">
          <div class="input-title">摘要</div>
          <div class="input-content"><input type="text" name="summary" v-model="newPhoto.summary"/></div>
        </div>
      </div>
      <div class="button-wrapper">
        <loading-button class="loading-button" :clickHandler="upgradeSwiper">保存</loading-button>
        <input type="button" class="border-button" value="重置" @click="resetPhoto"/>
      </div>
    </div>
  </div>
</template>

<script>
  import ImgUploader from '../ImgUploader.vue';
  import LoadingButton from '../LoadingButton.vue'
  import {API, IMGURL, deepClone} from '../../assets/getData';

  export default {
    props: {
      options: {},
      radio: '',
    },
    data(){
      return ({
        newPhoto: {},//存放新增的图片
        allSwiper: [],//库中的图片
        imgUrl: IMGURL,//图片域名
        radioSwiperSelected: '',//存放input[type=radio]时的是否选中的值
        settingSwiper: false,
        upgradingSwiper: false,
      })
    },
    watch: {
      swiperSelected(){
        this.isSwiperChecked()
      }
    },
    created(){
      this.getSwiper()
    },
    computed: {
      swiperSelected(){
        return this.options;
      },
      templateCode(){
          return this.$store.state.templateCode;
      },
      userId(){
          return this.$store.state.userId;
      }
    },
    methods: {
      isSwiperChecked(){
        if (this.radio == 1) {
          this.radioSwiperSelected = this.swiperSelected.data.source[0].id;
        } else {
          for (let i = 0; i < this.allSwiper.length; i++) {
            this.$set(this.allSwiper[i], 'checked', false);
            for (let o = 0; o < this.swiperSelected.data.source.length; o++) {
              if (this.allSwiper[i].id == this.swiperSelected.data.source[o].id) {
                this.$set(this.allSwiper[i], 'checked', true);
              }
            }
          }
        }

      },
      getSwiper(){
        API.getSwiper(this.userId)
          .then((res) => {
            this.allSwiper = res.data;
            this.isSwiperChecked();
          })
      },
      upgradeSwiper(){
        this.upgradeSwiper = true;
        API.upgradeSwiper({userId: this.userId, ...this.newPhoto})
          .then((res) => {
            if (res.data.flag == true) {
              this.getSwiper();
              this.$store.dispatch('notice', {text: '保存成功'});
              this.upgradeSwiper = false;
              this.newPhoto = {};
            }
          })
          .catch((err) => {
            this.$store.dispatch('notice', {text: '保存失败'});
            this.upgradeSwiper = false;

          })
      },
      exchangeSwiper(id, targetId){
        API.exchangeSwiper(id, targetId)
          .then((res) => {
            this.$store.dispatch('notice', {text: '保存成功'});
            this.getSwiper()
          })
      },
      deleteSwiper(swiper){
        if (!confirm('确定删除' + swiper.summary + '吗？')) return;
        API.deleteSwiper(swiper.id)
          .then((res) => {
            this.getSwiper()
          })
      },
      editSwiper(swipe){
        this.newPhoto = deepClone(swipe);
        delete this.newPhoto.createTime;
        delete this.newPhoto.updateTime;
        delete this.newPhoto.sortNum;
        delete this.newPhoto.checked;
      },
      setSwiper(){
        this.settingSwiper = true;
        let swiper = '';
        if (this.radio == 1) {
          swiper = this.radioSwiperSelected;
        } else {
          for (let i = 0; i < this.allSwiper.length; i++) {
            if (this.allSwiper[i].checked == true) {
              swiper += this.allSwiper[i].id + ',';
            }
          }
        }

        API.setTemplate({
          userId: this.userId,
          templateCode: this.templateCode,
          modelId: this.swiperSelected.id,
          modelClassify: 1,
          sourceId: swiper,
        })
          .then((res) => {
            this.$store.dispatch('reloadIndex', {modelId: this.swiperSelected.id});
            this.$nextTick((res) => {
              this.isSwiperChecked()
            })
            this.resetPhoto()
            this.$store.dispatch('notice', {text: '保存成功'});
            this.settingSwiper = false;
          })
          .catch((err) => {
            this.$store.dispatch('notice', {text: '保存失败'});
            this.settingSwiper = false;
          })

      },

      resetPhoto(){
        this.newPhoto={};
      },


      getImg(img){
        this.newPhoto.url = img;
      }
    },
    components: {
      ImgUploader,
      LoadingButton,
    },

  }
</script>

<style scoped lang="less">
  @import '../../assets/commen.less';

  .swiper-setting {
    .block {
      .input-title {
        flex: 0 90px;
      }
    }
  }

  .table-wrapper {
    margin-bottom: 40px;
  }

  .item {
    label {
      display: inline-block;
      width: 100%;
      height: 100%;
    }
    input[type=checkbox] {
      width: 14px;
      height: 14px;
      opacity: 0.5;
    }
    td {
      height: 48px;
      padding: 12px 10px;
      line-height: 48px;
    }
    img {
      height: 40px;
      vertical-align: middle;
    }
  }

  .button-wrapper{
    text-align: center;
    .loading-button{display: inline-block;}
  }
</style>
