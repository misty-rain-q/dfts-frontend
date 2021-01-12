<template>
  <div class="downloadButton">
    <a-input-search id="ainput" placeholder="搜索想要的文件id" style="width: 35%" @search="onSearch" />
    &nbsp;
    <a-button type="primary" icon="download" @click="turnToDownloadPage">
      下载
    </a-button>
    <a-modal ok-text="确定" cancel-text="取消"
     :maskClosable= "false" v-model="passwordInputVisible" title="下载" @ok="passwordHandleOk">
      <div>请输入提取码：</div>
      <a-input id="passwordInput" placeholder="输入文件提取码"/>
      &nbsp;
    </a-modal>
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
      passwordInputVisible: false,
    };
  },
  methods: {
    passwordHandleOk() {
      this.visible = true;
      this.passwordInputVisible = false;
    },
    turnToDownloadPage() {
      // const inputElement = document.getElementById('ainput');
      // console.log(inputElement.value); //该行会影响unit test
      this.passwordInputVisible = true;
    },
    onSearch(value) {
      console.log(value);
      this.turnToDownloadPage();
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
