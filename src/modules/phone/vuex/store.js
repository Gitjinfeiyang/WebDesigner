/**
 * Created by Jinfeiyang on 2017-09-06.
 */
import Vue from 'vue';
import Vuex,{Store} from 'vuex';

Vue.use(Vuex);

const store=new Store({
  state:{
    userInfo:{},
    templateCode:'',
    userId:-1,
    type:'',
  },
  mutations:{

  },
  actions:{

  }
});

export {store}
