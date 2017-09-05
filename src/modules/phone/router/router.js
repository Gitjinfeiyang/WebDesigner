/**
 * Created by Jinfeiyang on 2017-08-14.
 */
import Vue from 'vue'
import Router from 'vue-router'

import Index from '../pages/Index.vue'
import Home from '../pages/Home.vue'

const Card = resolve => require(['../pages/Card.vue'],resolve);
const Message = resolve => require(['../pages/Message.vue'],resolve);
const List = resolve => require(['../pages/List.vue'],resolve);
const Detail = resolve => require(['../pages/Detail.vue'],resolve);


Vue.use(Router);

const route={
  HOME:{
    id:1,
    path:'/home'
  },
  CARD:{
    id:2,
    path:'/card'
  },
  MESSAGE:{
    id:3,
    path: '/message'
  },
  LIST:{
    id:4,
    path:'/list'
  }
};

export default new Router({
  routes: [
    {
      path:'/',
      component:Home,
      children:[
        {
          path:route.HOME.path,
          component:Index
        },
        {
          path:route.CARD.path,
          component:Card,
        },
        {
          path:route.MESSAGE.path,
          component:Message
        },
        {
          path:route.LIST.path,
          component:List
        }
      ]
    },
    {
      path:'/detail',
      component:Detail
    }


  ]
});

export {route};


