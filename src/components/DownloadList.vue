<template>
  <div>
    <a-table class="downlist"
      :row-selection="rowSelection" :pagination="false"
      :columns="columns" size="small"
      :data-source="data">
      <span slot="action" slot-scope="text,record">
        <a @click="preview(record.address)"><a-icon type="eye" title="预览" /></a>
      </span>
    </a-table>
    <a-drawer
      title="预览"
      :placement="placement"
      :closable="false"
      :visible="visible"
      :width = '900'
      @close="onClose">
      <video-player  class="video-player vjs-custom-skin"
        ref="videoPlayer"
        :playsinline="true"
        :options="playerOptions"
        v-show="video_visible">
      </video-player>
      <viewer v-show="photo_visible">
        <img :src= "photo_content"/>
      </viewer>
      <pdf v-for="i in numPages" :key="i"  :page="i" :src= "pdf_content" v-show="pdf_visible"></pdf>
    </a-drawer>
  </div>
</template>

<script>
import Vue from 'vue';
import pdf from 'vue-pdf';
import img from '../assets/temple2.jpg';

const columns = [
  {
    title: '文件',
    dataIndex: 'name',
    ellipsis: true,
    align: 'center',
  },
  {
    title: '',
    dataIndex: 'action',
    width: '10%',
    scopedSlots: { customRender: 'action' },
    align: 'center',
  },
];

export default {
  data() {
    return {
      numPages: 20,
      photo_content: img,
      pdf_content: '',
      selectedItemKeys: [],
      data: [],
      columns,
      visible: false,
      placement: 'left',
      draw_visible: false,
      photo_visible: false,
      video_visible: false,
      pdf_visible: false,
      playerOptions: {
        playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选择的播放速度
        autoplay: false, // 如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          type: 'video/mp4',
          src: '', // url地址
        }],
        poster: '', // 你的封面地址
        // width: document.documentElement.clientWidth,
        notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true, // 当前时间和持续时间的分隔符
          durationDisplay: true, // 显示持续时间
          remainingTimeDisplay: false, // 是否显示剩余时间功能
          fullscreenToggle: true, // 全屏按钮
        },
      },
    };
  },

  computed: {
    rowSelection() {
      return {
        getCheckboxProps: (record) => ({
          props: {
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
          },
        }),
        onChange: (selectedRowKeys) => {
          this.selectedItemKeys = selectedRowKeys;
          console.log(this.selectedItemKeys);
        },
      };
    },
  },

  methods: {
    preview(address) {
      // 初始化
      this.photo_visible = false;
      this.video_visible = false;
      this.pdf_visible = false;

      const str = address.match(/^data:(.*);/)[1];
      const judge = str.substring(0, str.indexOf('/'));
      if (judge === 'video') {
        this.visible = true;
        this.video_visible = true;
        console.log(str);
        this.playerOptions.sources[0].src = address;
        this.playerOptions.sources[0].type = str;
      } else if (judge === 'image') {
        this.visible = true;
        this.photo_visible = true;
        this.photo_content = address;
      } else if (judge === 'application') {
        if (str === 'application/pdf') {
          this.visible = true;
          this.pdf_visible = true;
          this.pdf_content = address;
          this.$options.methods.getNumPages(address);
        }
      }
    },

    // 计算PDF的页码数
    getNumPages(url) {
      const loadingTask = pdf.createLoadingTask(url);
      loadingTask.promise.then((pdf1) => {
        this.numPages = pdf1.numPages;
      }).catch((err) => {
        console.error('pdf 加载失败', err);
      });
    },
    onClose() {
      this.visible = false;
    },
  },
  mounted() {
    Vue.eventBus.$on('download-file-list-changed', (fileList) => {
      this.data = fileList;
    });
    Vue.eventBus.$emit('download-file-list-needed');
    Vue.eventBus.$on('checked-file-list-required', (callbackEventName) => {
      console.log('signal received');
      Vue.eventBus.$emit(callbackEventName, this.selectedItemKeys);
    });
  },
  components: {
    pdf,
  },
};
</script>

<style>
.downlist {

}

.ant-table {
  overflow: auto;
  max-height: 300px;
  min-height: 20px;
}

.pdf{
  position: fixed;
  height: 100%;
  width: 900px;
  margin: 0;
}
.ant-drawer-body{
  padding: 0;
}
</style>
