
/**
 * Created by Jinfeiyang on 2017-08-17.
 */
import COMPONENT_TYPE from '../../../template/componentType';

// 新增模板以模板文件名为模板名，模板内页面名固定为 Card,Index,NavBottom,如果新增加了组件要增加相应设置面板
  //需遵守命名规则

  //模板配置
let components={
  TEMPLATE_1:'template_1',
  };

const MODELS={

};

const svgIcons=['icon--GoogleDrive','icon--Foursquarezhuan','icon--Sharethiszhuanhuan','icon--MicrosoftMes','icon--Xboxzhuanhuan','icon--Dropboxzhuanhuan',
  'icon--InternetExpl','icon--Grooveshark','icon--Spotifyzhuanhuan','icon--GooglePlay','icon--Gmailzhuanhuan','icon--AWSzhuanhuan','icon--AWSzhuanhuan','icon--Pinboardzhuanhuan','icon--Whatsappzhuanhuan'];
const fontIcons=['&#xe60f;','&#xe605;','&#xe67d;','&#xe602;','&#xe62f;','&#xe730;','&#xe626;','&#xe606;','&#xe668;','&#xe77c;']


const CARD_NAME='Card';
const INDEX_NAME='Index';

const NAV_BOTTOM='NavBottom';

//微名片模板
let Cards={
  template_1:resolve => require(['../../../template/template_1/Card.vue'],resolve)
};
//主页模板
let Indexes={
  template_1:resolve => require(['../../../template/template_1/Index.vue'],resolve),
  template_2:resolve => require(['../../../template/template_2/Index.vue'],resolve)

};
//底部导航栏模板
let NavBottoms={
  template_1_nav_bottom:resolve => require(['../../../template/template_1/NavBottom.vue'],resolve)
};
//组件设置面板
let ComponentSettings={
  NavBottomSetting : resolve => require(['../components/setting/NavBottomSetting'],resolve),
  SwiperSetting : resolve => require(['../components/setting/SwiperSetting'],resolve),
  // ButtonGroupSetting : resolve => require(['../../../components/buttonsGroup/ButtonsGroupSetting'],resolve),
  ButtonSetting : resolve => require(['../components/setting/ButtonSetting'],resolve),
  BgButtonSetting : resolve => require(['../components/setting/BgButtonSetting'],resolve),
  TitleSetting : resolve => require(['../components/setting/TitleSetting'],resolve),
  ListSetting : resolve => require(['../components/setting/ListSetting'],resolve),
};




// (function getComponents(){
//   let templateName='';
//   for(let i=0; i<components.length; i++){
//     templateName=components[i];
//     // Cards[templateName]=resolve => require(['../../../template/'+templateName+'/Card.vue'],resolve);
//     // Indexes[templateName]=resolve => require(['../../../template/'+templateName+'/Index.vue'],resolve);
//     // NavBottoms[templateName]=resolve => require(['../../../template/'+templateName+'/NavBottom.vue'],resolve);
//     // require.ensure([],function(require){
//     //   Indexes[templateName]=require('../../../template/'+templateName+'/Index.vue')
//     // })
//   }
// })();




export {Cards,Indexes,NavBottoms,ComponentSettings,svgIcons,fontIcons};
