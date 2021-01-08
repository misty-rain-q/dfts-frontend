<template>
  <div class="downloadButton">
    <a-input-search id="ainput" placeholder="搜索想要的文件id" style="width: 35%" @search="onSearch" />
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
      // const inputElement = document.getElementById('ainput');
      // console.log(inputElement.value); //该行会影响unit test
      this.visible = true;
    },
    handleOk() {
      this.visible = false;
    },
  },
};
</script>

<style scoped>
.ant-input-search {
  min-width: 200px;
}
</style>
