import Vue from 'vue';
// import ant from 'ant-design-vue/dist/antd';
import 'ant-design-vue/dist/antd.css';
import Button from 'ant-design-vue/lib/button';
import Modal from 'ant-design-vue/lib/modal';
import Input from 'ant-design-vue/lib/input';
import CheckBox from 'ant-design-vue/lib/checkbox';
import Upload from 'ant-design-vue/lib/upload';
import Select from 'ant-design-vue/lib/select';
import InputNumber from 'ant-design-vue/lib/input-number';
import VueGun from 'vue-gun';
import App from './App.vue';
import store from './store';
import router from './router';
import 'gun/lib/rindexed';
import 'gun/lib/radix';
import 'gun/lib/radisk';
import 'gun/sea';
import 'gun/lib/path';
import 'gun/lib/load';
import 'gun/lib/promise';

// Vue.use(ant);
Vue.use(Button);
Vue.use(Modal);
Vue.use(Input);
Vue.use(CheckBox);
Vue.use(Upload);
Vue.use(Select);
Vue.use(InputNumber);

Vue.config.productionTip = false;

Vue.use(VueGun, {

  peers: [

  ],

  radisk: true,

  localStorage: false,

});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
