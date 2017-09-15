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
    path:'home',
    name:'home',
  },
  CARD:{
    id:2,
    path:'card',
    name:'card',

  },
  MESSAGE:{
    id:3,
    path: 'message',
    name:'message',

  },
  LIST:{
    id:4,
    path:'list',
    name:'list',

  },
  DETAIL:{
    id:5,
    path:'detail',
    name:'detail',

  }
};

export default new Router({
  routes: [
    {
      path:'/:userId',
      component:Home,
      children:[
        {
          path:'/:userId/'+route.HOME.path,
          name:route.HOME.name,
          component:Index
        },
        {
          path:'/:userId/'+route.CARD.path,
          name:route.CARD.name,
          component:Card,
        },
        {
          path:'/:userId/'+route.MESSAGE.path,
          name:route.MESSAGE.name,
          component:Message
        },
        {
          path:'/:userId/'+route.LIST.path,
          name:route.LIST.name,
          component:List
        },
        {
          path:'/:userId/'+route.DETAIL.path,
          name:route.DETAIL.name,
          component:Detail
        }
      ]
    },



  ]
});

export {route};


