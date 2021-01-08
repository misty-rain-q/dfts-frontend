import { mount } from '@vue/test-utils';
import LinkPage from '@/views/LinkPage.vue';
import Vue from 'vue';
import Button from 'ant-design-vue/lib/button';
import Modal from 'ant-design-vue/lib/modal';
import Input from 'ant-design-vue/lib/input';
import CheckBox from 'ant-design-vue/lib/checkbox';
import Upload from 'ant-design-vue/lib/upload';
import Select from 'ant-design-vue/lib/select';
import InputNumber from 'ant-design-vue/lib/input-number';
import Progress from 'ant-design-vue/lib/progress';

// Vue.use(ant);
Vue.use(Button);
Vue.use(Modal);
Vue.use(Input);
Vue.use(CheckBox);
Vue.use(Upload);
Vue.use(Select);
Vue.use(InputNumber);
Vue.use(Progress);

const wrapper = mount(LinkPage);

describe('LinkPage.vue', () => {
  it('has two button', () => {
    const button = wrapper.findAll('button');
    expect(button.length).toBe(2);
  });
});
