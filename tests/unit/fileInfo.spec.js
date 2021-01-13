import { mount } from '@vue/test-utils';
import FileInfo from '@/components/FileInfo.vue';
import Vue from 'vue';
import Button from 'ant-design-vue/lib/button';
import Modal from 'ant-design-vue/lib/modal';
import Input from 'ant-design-vue/lib/input';
import CheckBox from 'ant-design-vue/lib/checkbox';
import Table from 'ant-design-vue/lib/table';
import Drawer from 'ant-design-vue/lib/drawer';
import VideoPlayer from 'vue-video-player';
import Viewer from 'v-viewer';
import Upload from 'ant-design-vue/lib/upload';
import Select from 'ant-design-vue/lib/select';
import InputNumber from 'ant-design-vue/lib/input-number';

// Vue.use(ant);
Vue.use(Table);
Vue.use(Drawer);
Vue.use(Viewer);
Vue.use(VideoPlayer);
Vue.use(Button);
Vue.use(Modal);
Vue.use(Input);
Vue.use(CheckBox);
Vue.use(Upload);
Vue.use(Select);
Vue.use(InputNumber);

const wrapper = mount(FileInfo);

describe('FileInfo.vue', () => {
  it('matches snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
