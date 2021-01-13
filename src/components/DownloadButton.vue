<template>
  <div class="downloadButton">
    <a-input-search id="ainput" v-model="inputValue"
    placeholder="搜索想要的文件id" style="width: 35%" @search="onSearch" />
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
    <a-modal ok-text="下载"  cancel-text="取消"
     :maskClosable= "false" v-model="visible" title="下载" @ok="download">
      <download-window></download-window>
    </a-modal>

  </div>
</template>

<script>
import Vue from 'vue';
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
      password: '',
      inputValue: '',
      fileIsDownloading: false,
      filenum: 0,
      datelist: '',
      downset: '',
      downnum: '',
      uploadtime: '',
      fileList: [],
    };
  },
  methods: {
    passwordHandleOk() {
      this.visible = true;
      this.passwordInputVisible = false;
    },
    onSearch(value) {
      const downloadFileId = value;
      this.$gun.get('gun-dfts').get('transfers').get(downloadFileId).load(function (data) {
        this.password = data.extractionCode;
      });
      console.log(`password:${this.password}`);
      this.passwordInputVisible = true;
      this.turnToDownloadPage();
    },

    turnToDownloadPage() {
      const downloadFileId = this.inputValue;
      // 添加一个输入提取码的对话框
      const tempThis = this;
      if (this.inputValue === '') {
        this.$message.error('文件id为空');
      } else {
        this.$gun.get('gun-dfts').get('transfers').get(downloadFileId).not(() => {
          this.$message.error('未找到对应文件');
        })
          .load((data) => {
            this.filenum = data.total;
            this.datelist = data.effectiveDate;
            this.downset = data.downset;
            this.downnum = data.downloadTime;
            this.uploadtime = data.uploadtime;
            this.$gun.get('gun-dfts').get('transfers').get(downloadFileId).get('files')
              .load((files) => {
                this.fileList = [];
                Object.keys(files).forEach((id) => {
                  const fileMessage = files[id];
                  this.fileList.push({
                    key: id,
                    type: tempThis.getTypeFromMime(fileMessage.content),
                    name: fileMessage.filename,
                    address: fileMessage.content,
                  });
                });
                this.visible = true;
                Vue.eventBus.$emit('download-file-list-changed', this.fileList);
              });
          });
      }
    },
    getTypeFromMime(mimeType) {
      return mimeType && null;
    },
    download() {
      this.visible = false;
    },

  },
  mounted() {
    Vue.eventBus.$on('download-file-list-needed', () => {
      Vue.eventBus.$emit('download-file-list-changed', this.fileList);
    });
  },
};
</script>

<style scoped>
.ant-input-search {
  min-width: 200px;
}
</style>
