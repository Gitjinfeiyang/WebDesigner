/**
 * Created by Jinfeiyang on 2017-08-14.
 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);



const MUTATIONS={
  POSITION_EDITOR:'position_editor',
  NOTICE:'notice',
  RELOAD:'reload',
};

const store=new Vuex.Store({
  state:{
    mode:'edit',  //是否为编辑模式
    editorPosition:{ //编辑器的位置信息
      lineTop:{},
      lineBottom:{},
      lineLeft:{},
      lineRight:{},
    }, //编辑器位置和尺寸
    componentSelected:{}, //当前选中组件的数据
    notification:'',
    reload:1,
    reloadSwiper:1,
    reloadData:{},
  },
  mutations:{
    [MUTATIONS.POSITION_EDITOR](state,options){
      let target=options.target;
      state.componentSelected=options.component;
        let size={
          w:target.offsetWidth,
          h:target.offsetHeight
        };
        let position={
          x:target.offsetLeft,
          y:target.offsetTop
        };
        state.editorPosition={
          lineTop:{
            height:0,
            width:size.w+'px',
            transform:`translate3d(${position.x}px,${position.y}px,0)`
          },
          lineBottom:{
            height:0,
            width:size.w+'px',
            transform:`translate3d(${position.x}px,${position.y+size.h}px,0)`
          },
          lineLeft:{
            width:0,
            height:(size.h)+'px',
            transform:`translate3d(${position.x}px,${position.y}px,0)`
          },
          lineRight:{
            width:0,
            height:(size.h)+'px',
            transform:`translate3d(${position.x+size.w-1}px,${position.y}px,0)`
          }
        }
    },
    [MUTATIONS.NOTICE](state,text){
      state.notification=text;
    },
    [MUTATIONS.RELOAD](state,reloadData){
      state.reload++;
      state.reloadData=reloadData;
    }

  },
  actions:{
    positionEditor(context,options){
      context.commit(MUTATIONS.POSITION_EDITOR,options);
    },
    notice(context,options){
      context.commit(MUTATIONS.NOTICE,options.text);
      if(options.duration !== 0){
        setTimeout(function(){
          context.commit(MUTATIONS.NOTICE,'');
        },options.duration||3000);
      }

    },

    reloadIndex(context,reloadData={}){
      context.commit(MUTATIONS.RELOAD,reloadData);
    }
  }
});

export {store}