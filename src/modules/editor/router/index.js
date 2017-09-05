import Vue from 'vue'
import Router from 'vue-router'

const ContentEditor = resolve => require(['../pages/ContentEditor.vue'],resolve);
const Info = resolve => require(['../pages/Info.vue'],resolve);
const ChooseTemplate = resolve => require(['../pages/ChooseTemplate.vue'],resolve);
const User = resolve => require(['../pages/User.vue'],resolve);
const Message = resolve => require(['../pages/Message.vue'],resolve);
const MyTemplate = resolve => require(['../pages/MyTemplate.vue'],resolve);

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/templates',
      component:ChooseTemplate
    },
    {
      path:'/user',
      component:User,
      children:[
        {
          path:'contenteditor/:id',
          name:'contentEditor',
          component:ContentEditor
        },
        {
          path:'message',
          name:'message',
          component:Message
        },
        {
          path:'info',
          name:'info',
          component:Info
        },
        {
          path:'mytemplate',
          name:'myTemplate',
          component:MyTemplate
        }
      ]
    },

  ]
})
