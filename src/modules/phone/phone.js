/**
 * Created by Jinfeiyang on 2017-08-14.
 */
import Vue from 'vue'
import Phone from './phone.vue'
import router from './router/router'
import {store} from './vuex/store'

Vue.config.productionTip = false

Vue.directive('component',{

});

router.beforeEach((to,from,next) => {
  next()
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<phone/>',
  components: { Phone }
})
