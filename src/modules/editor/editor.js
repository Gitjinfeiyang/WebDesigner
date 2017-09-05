// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Editor from './editor.vue'
import router from './router'
import {store} from './vuex/store'
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'
// import iView from 'iview';
// import 'iview/dist/styles/iview.css';

Vue.config.productionTip = false;
NProgress.configure({
  speed:1000,
  showSpinner:true
});
NProgress.inc(0.2)

// Vue.use(iView);

let data={};
let componentEditing={};

Vue.directive('component',{
  inserted(el,binding){
    el.dataset.componentid=parseInt(Math.random()*100);
    el.onclick=function(e){
      e.preventDefault();
      e.stopPropagation();
      componentEditing=el.dataset.componentid;
      data=binding.value;
      store.dispatch('positionEditor',{
        target:el,
        component:data
      });
    }
  },
  componentUpdated(el,binding){
    if(componentEditing!=el.dataset.componentid) return;
    data=binding.value;
    store.dispatch('positionEditor',{
      target:el,
      component:data
    });
    el.onclick=function(e){
      e.preventDefault();
      e.stopPropagation();
      componentEditing=el.dataset.componentid;
      data=binding.value;
      store.dispatch('positionEditor',{
        target:el,
        component:data
      });
    }
  }
});

router.beforeEach((to,from,next) => {
  NProgress.start();
  next();
});
router.afterEach((to,from) => {
  NProgress.done();
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<editor/>',
  components: { Editor }
});
