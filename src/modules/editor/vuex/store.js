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
  INIT_EDITOR:'init_editor',
};

let noticeTimeout={};
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
    userInfo:{},
    userId:0,
    templateCode:'',
    defaultTemplateCode:'',
    released:true,
  },
  mutations:{
    [MUTATIONS.POSITION_EDITOR](state,options){
      let target=options.target;
      state.componentSelected=options.component;
        let size={
          w:target.offsetWidth,
          h:target.offsetHeight
        };
        let position=caculatePosition(target)
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
    },
    [MUTATIONS.INIT_EDITOR](state){
      state.editorPosition={ //编辑器的位置信息
        lineTop:{},
        lineBottom:{},
        lineLeft:{},
        lineRight:{},
      };
      state.componentSelected={};
    }

  },
  actions:{
    positionEditor(context,options){
      context.commit(MUTATIONS.POSITION_EDITOR,options);
    },
    notice(context,options){
      context.commit(MUTATIONS.NOTICE,options.text);
      clearTimeout(noticeTimeout)
      if(options.duration !== 0){
        noticeTimeout=setTimeout(function(){
          context.commit(MUTATIONS.NOTICE,'');
        },options.duration||3000);
      }

    },

    reloadIndex(context,reloadData={}){
      context.commit(MUTATIONS.RELOAD,reloadData);
    },

    initEditor(context){
      context.commit(MUTATIONS.INIT_EDITOR);
    }
  }
});


function caculatePosition(target,position={x:0,y:0}){
  position.x+=target.offsetLeft;
  position.y+=target.offsetTop;
  let parent=target.parentNode;
  let styles=getComputedStyle(parent,'');
  if(parent.className.indexOf("template-area")<0&&styles.position !='static'){
    return caculatePosition(parent,position);
    // return position
  }else{
    return position;
  }
}

export {store}
