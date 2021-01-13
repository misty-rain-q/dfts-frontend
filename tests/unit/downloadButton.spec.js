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
  it('matches snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should not show download dialog when files do not exist', () => {
    const button = wrapper.find('button');
    button.trigger('click');
    expect(wrapper.vm.visible).toBe(false);
  });

  it('passwordHandleOk function', () => {
    wrapper.vm.extraction = '123';
    wrapper.vm.password = '123';
    // wrapper.vm.passwordHandleOk();
    const mockFn1 = jest.fn();
    wrapper.vm.$on('passwordHandleOk', mockFn1);
    // expect(wrapper.vm.passwordInputVisible).toBe(true);
  });

  // it.skip('should show download dialog when files exist', () => {
  //   // TODO
  // });

  // it.skip('should show password dialog when downloading files with password', () => {
  //   // TODO
  // });

  // it('a-input event', () => {
  //   const button = wrapper.find('Input');
  //   // button.trigger('click');
  //   console.log(button);
  //   // expect(wrapper.vm.visible).toBe(true);
  // });
});
