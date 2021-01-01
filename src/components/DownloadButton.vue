<template>
  <div class="downloadButton">
    <a-input-search id="ainput" placeholder="搜索想要的文件id" style="width: 600px" @search="onSearch" />
    &nbsp;
    <a-button type="primary" icon="download" @click="turnToDownloadPage">
      下载
    </a-button>
    <a-modal ok-text="下载" cancel-text="取消"
     :maskClosable= "false" v-model="visible" title="下载" @ok="handleOk">
      <download-window></download-window>
    </a-modal>
  </div>
</template>

<script>
import DownloadWindow from '../views/DownloadWindow.vue';
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'DownloadButton',
  components: {
    DownloadWindow,
  },
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    onSearch(value) {
      console.log(value);
      this.visible = true;
    },
    turnToDownloadPage() {
      const inputElement = document.getElementById('ainput');
      console.log(inputElement.value);
      this.visible = true;
    },
    handleOk() {
      this.visible = false;
    },
  },
};
</script>

<style scoped>

</style>
