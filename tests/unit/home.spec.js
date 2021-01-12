import { mount } from '@vue/test-utils';
import Home from '@/views/Home.vue';
import Vue from 'vue';
import VueQr from 'vue-qr';
import Button from 'ant-design-vue/lib/button';
import Modal from 'ant-design-vue/lib/modal';
import Input from 'ant-design-vue/lib/input';
import CheckBox from 'ant-design-vue/lib/checkbox';
import Upload from 'ant-design-vue/lib/upload';
import Select from 'ant-design-vue/lib/select';
import InputNumber from 'ant-design-vue/lib/input-number';

// Vue.use(ant);
Vue.use(VueQr);
Vue.use(Button);
Vue.use(Modal);
Vue.use(Input);
Vue.use(CheckBox);
Vue.use(Upload);
Vue.use(Select);
Vue.use(InputNumber);

const wrapper = mount(Home);

describe('Home.vue', () => {
  it('has a img', () => {
    const imgs = wrapper.findAll('img');
    expect(imgs.length).toBe(1);
  });

  it('has two button', () => {
    const buttons = wrapper.findAll('button');
    expect(buttons.length).toBe(2);
  });

  it('has a input', () => {
    const inputs = wrapper.findAll('input');
    expect(inputs.length).toBe(1);
  });
});
