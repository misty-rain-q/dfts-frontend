import { mount } from '@vue/test-utils';
import DownloadButton from '@/components/DownloadButton.vue';
import Vue from 'vue';
import Button from 'ant-design-vue/lib/button';
import Modal from 'ant-design-vue/lib/modal';
import Input from 'ant-design-vue/lib/input';
import CheckBox from 'ant-design-vue/lib/checkbox';
import Table from 'ant-design-vue/lib/table';
import Drawer from 'ant-design-vue/lib/drawer';
import Upload from 'ant-design-vue/lib/upload';
import Select from 'ant-design-vue/lib/select';
import InputNumber from 'ant-design-vue/lib/input-number';

// Vue.use(ant);
Vue.use(Button);
Vue.use(Modal);
Vue.use(Input);
Vue.use(CheckBox);
Vue.use(Table);
Vue.use(Drawer);
Vue.use(Upload);
Vue.use(Select);
Vue.use(InputNumber);

const wrapper = mount(DownloadButton);

describe('DownloadButton.vue', () => {
  it('click event', () => {
    const button = wrapper.find('button');
    button.trigger('click');
    console.log(wrapper.vm.passwordInputVisible);
    expect(wrapper.vm.passwordInputVisible).toBe(true);
  });

  it('a-input event', () => {
    const button = wrapper.find('AInput');
    // button.trigger('click');
    console.log(button);
    // expect(wrapper.vm.visible).toBe(true);
  });
});
