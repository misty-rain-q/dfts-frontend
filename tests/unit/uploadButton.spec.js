import { mount } from '@vue/test-utils';
import UploadButton from '@/components/UploadButton.vue';
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

const wrapper = mount(UploadButton);

describe('UploadButton.vue', () => {
  it('click event', () => {
    const button = wrapper.find('button');
    button.trigger('click');
    console.log(wrapper.vm.visible);
    expect(wrapper.vm.visible).toBe(true);
  });
});
