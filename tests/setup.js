import Vue from 'vue';
import { message } from 'ant-design-vue';

Vue.eventBus = new Vue({});
Vue.prototype.$message = message;
