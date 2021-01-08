import { mount } from '@vue/test-utils';
import UploadWindow from '@/views/UploadWindow.vue';
import Vue from 'vue';
import Button from 'ant-design-vue/lib/button';
import Modal from 'ant-design-vue/lib/modal';
import Input from 'ant-design-vue/lib/input';
import CheckBox from 'ant-design-vue/lib/checkbox';
import Upload from 'ant-design-vue/lib/upload';
import Select from 'ant-design-vue/lib/select';
import InputNumber from 'ant-design-vue/lib/input-number';

// Vue.use(ant);
Vue.use(Button);
Vue.use(Modal);
Vue.use(Input);
Vue.use(CheckBox);
Vue.use(Upload);
Vue.use(Select);
Vue.use(InputNumber);

const wrapper = mount(UploadWindow);

describe('UploadWindow.vue', () => {
  it('has inputs', () => {
    const inputs = wrapper.findAll('input');
    console.log(inputs.length);
    expect(inputs.length).toBe(4);
  });
});
