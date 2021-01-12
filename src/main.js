import Vue from 'vue';
// import ant from 'ant-design-vue/dist/antd';
import 'ant-design-vue/dist/antd.css';
import { message } from 'ant-design-vue';
import Button from 'ant-design-vue/lib/button';
import Modal from 'ant-design-vue/lib/modal';
import Input from 'ant-design-vue/lib/input';
import CheckBox from 'ant-design-vue/lib/checkbox';
import Table from 'ant-design-vue/lib/table';
import Drawer from 'ant-design-vue/lib/drawer';
import Upload from 'ant-design-vue/lib/upload';
import Select from 'ant-design-vue/lib/select';
import InputNumber from 'ant-design-vue/lib/input-number';
import VideoPlayer from 'vue-video-player';
import Viewer from 'v-viewer';
import PDF from 'pdfjs-dist';
import 'viewerjs/dist/viewer.css';
import VueGun from 'vue-gun';
import Gun from 'gun';
import Progress from 'ant-design-vue/lib/progress';
import vuescroll from 'vuescroll';

import axios from 'axios';
import VueAxios from 'vue-axios';

import App from './App.vue';
import store from './store';
import router from './router';
import 'vuescroll/dist/vuescroll.css';
import 'gun/lib/rindexed';
import 'gun/lib/radix';
import 'gun/lib/radisk';
// import 'gun/sea';
import 'gun/lib/path';
import 'gun/lib/load';
import 'gun/lib/promise';

require('vue-video-player/src/custom-theme.css');

// Vue.use(ant);
Vue.use(VideoPlayer);
Vue.use(Button);
Vue.use(Modal);
Vue.use(Input);
Vue.use(CheckBox);
Vue.use(Table);
Vue.use(Drawer);
Vue.use(Viewer);
Vue.use(PDF);
Vue.use(Upload);
Vue.use(Select);
Vue.use(InputNumber);
Vue.use(Progress);
Vue.use(vuescroll);
Vue.use(VueAxios, axios);

Vue.prototype.$message = message;
Vue.config.productionTip = false;

Vue.use(VueGun, {
  peers: [
    // empty at start; first peer is added after backend base URL is detected
    // do NOT add options here; this instance will be replaced by another in
    // the `created` hook below
  ],
  // radisk: true,
  // localStorage: false,
});

message.config({

  duration: 2,
  top: '100px',
  maxCount: 3,

});

Viewer.setDefaults({
  Options: {
    inline: true, button: true, navbar: true, title: true, toolbar: true, tooltip: true, movable: true, zoomable: true, rotatable: true, scalable: true, transition: true, fullscreen: true, keyboard: true, url: 'data-source',
  },
});

new Vue({
  router,
  store,
  render: (h) => h(App),
  methods: {
    async detectBackendBaseUrl() {
      const candidates = [
        window.location.origin,
        `${window.location.protocol}//${window.location.hostname}:7001`,
      ];
      let result = null;
      for (let i = 0; i < candidates.length; i += 1) {
        const candidate = candidates[i];
        try {
          // eslint-disable-next-line no-await-in-loop
          await axios.get(`${candidate}/api/state`);
          result = candidate;
          break;
        // eslint-disable-next-line no-empty
        } catch (error) {}
      }
      return result;
    },
  },
  created() {
    this.detectBackendBaseUrl()
      .then((baseUrl) => {
        if (baseUrl) {
          console.log(`Backend base URL detected as ${baseUrl}`);

          // Update Axios settings
          axios.defaults.baseURL = baseUrl;
          axios.defaults.headers.common.Authorization = 'THIS_IS_A_TOKEN'; // TODO Add a token after the backend completes authorization mechanism
          console.log('Successfully updated Axios settings according to backend base URL');

          // Add first GUN peer
          // https://gun.eco/docs/DAM#adding-peers
          // this.$gun.back('opt.mesh').say({
          //   dam: 'opt',
          //   opt: {
          //     peers: `${baseUrl}/gun`,
          //   },
          // });
          // FIXME The method above does not seem to work; re-create the gun
          // instance as a workaround
          Vue.prototype.$gun = Gun({
            peers: [
              `${baseUrl}/gun`,
            ],
          });
          console.log(`Added first GUN peer ${baseUrl}/gun`);
        } else {
          console.error('Backend base URL cannot be detected');
        }
      });
  },
}).$mount('#app');

// TODO Replace this storage to a more elegant one, e.g. Vuex
window.storage = {};
