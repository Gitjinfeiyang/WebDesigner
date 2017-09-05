/**
 * Created by Jinfeiyang on 2017-08-14.
 */
import Vue from 'vue'
import Phone from './phone.vue'
import router from './router/router'

Vue.config.productionTip = false

Vue.directive('component',{

});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<phone/>',
  components: { Phone }
})
