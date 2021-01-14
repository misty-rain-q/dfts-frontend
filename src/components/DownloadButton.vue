<template>
  <div class="downloadButton">
    <a-input-search id="ainput" v-model="inputValue"
    placeholder="搜索想要的文件id" style="width: 35%" />
    &nbsp;
    <a-button type="primary" icon="download" @click="turnToDownloadPage">
      下载
    </a-button>
    <a-modal ok-text="确定" cancel-text="取消"
     :maskClosable= "false" v-model="passwordInputVisible" title="下载" @ok="passwordHandleOk">
      <div>请输入提取码：</div>
      <a-input id="passwordInput" v-model="password" placeholder="输入文件提取码"/>
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
      isCorrect: false,
      visible: false,
      passwordInputVisible: false,
      fid: '', // 测试
      password: '',
      extraction: '',
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
      this.$gun.get('gun-dfts').get('transfers').get(this.inputValue).load(function (data) {
        this.extraction = data.extractionCode;
      });
      if (this.password === this.extraction) {
        console.log('提取码正确');
        this.isCorrect = true;
        // this.password = '';
        // this.extraction = '';
        this.visible = true;
        this.passwordInputVisible = false;
        if (this.isCorrect === true) {
          this.fileSet();
        }
      } else {
        this.$message.error('提取码错误');
      }
    },
    fileSet() {
      const tempThis = this;
      this.$gun.get('gun-dfts').get('transfers').get(this.inputValue).get('files')
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

          console.log('fucked');
          this.visible = true;

          Vue.eventBus.$emit('download-file-list-changed', this.fileList);
          console.log('fucker');
        });
    },

    turnToDownloadPage() {
      this.isCorrect = false;
      const downloadFileId = this.inputValue;

      // this.$gun.get('gun-dfts').get('transfers').get(this.inputValue).load(function (data){
      //   filecontent = data;
      //   console.log('filecontent'+filecontent);

      // });

      if (this.inputValue === '') {
        this.$message.error('文件id为空');
      } else {
        this.$gun.get('gun-dfts').get('transfers').get(downloadFileId).not(() => {
          this.$message.error('未找到对应文件');
        })
          .load((data) => {
            if (data) {
              this.filenum = data.total;
              this.datelist = data.effectiveDate;
              this.downset = data.downset;
              this.downnum = data.downloadTime;
              this.uploadtime = new Date(data.uploadtime);
              this.extraction = data.extractionCode;
              if (this.extraction !== '') {
                this.passwordInputVisible = true;
              } else {
                this.visible = true;
                this.fileSet();
              }
            } else {
              this.$message.error('文件已失效');
            }
          });
      }
    },
    getTypeFromMime(mimeType) {
      return mimeType && null;
    },
    download() {
      if (this.datelist !== 'forever') {
        const expireDate = new Date();
        let addition = 1;
        switch (this.datelist) {
          case 'month':
            addition = 30 * 24 * 60 * 60 * 1000;
            break;
          case 'week':
            addition *= 7 * 24 * 60 * 60 * 1000;
            break;
          case 'day':
            addition *= 24 * 60 * 60 * 1000;
            break;
          case 'hour':
            addition *= 60 * 60 * 1000;
            break;
          default:
            console.error(`Invalid expire option ${this.datelist}`);
            console.error('this datelist', this.datelist);
        }
        expireDate.setTime(this.uploadtime + addition);
        const currentDate = new Date();
        if (expireDate < currentDate) {
          this.$message.error('文件已过期');
          this.$gun.get('gun-dfts').get('transfers').get(this.inputValue).put(null);
        }
      }
      const callbackEventName = `checked-file-list-satisfied-${Date.now()}`;
      console.log(callbackEventName);
      Vue.eventBus.$on(callbackEventName, (keys) => {
        console.log('downloading', keys);
        this.fileList.forEach((file) => {
          console.log('file key', file.key);
          if (keys.includes(file.key)) {
            console.log('downloading');
            const element = document.createElement('a');
            element.href = file.address;
            element.download = file.name;
            element.click();
            this.$message.success('正在下载!');
          }
        });
      });
      Vue.eventBus.$emit('checked-file-list-required', callbackEventName);
      console.log('download file list required');
      if (this.downset === 'number') {
        if (this.downnum > 1) {
          this.downnum -= 1;
          this.$gun.get('gun-dfts').get('transfers').get(this.inputValue).get('effectiveDate')
            .put(this.downnum - 1);
          console.log('下载次数已经减一');
        } else {
          this.$gun.get('gun-dfts').get('transfers').get(this.inputValue).put(null);
          this.visible = false;
          this.$message.error('文件下载次数为0');
          console.log('节点已删除');
        }
      }

      // this.visible = false;
    },

  },
  mounted() {
    Vue.eventBus.$on('download-file-list-needed', () => {
      Vue.eventBus.$emit('download-file-list-changed', this.fileList);
      console.log('fuck');
    });
    const params = new URLSearchParams(window.location.search.slice(1));
    const transferId = params.get('fileId');
    if (transferId) {
      console.log(`Detected transfer ID ${transferId}`);
      this.inputValue = transferId;
      this.turnToDownloadPage();
    }
  },

};
</script>

<style scoped>
.ant-input-search {
  min-width: 200px;
}
</style>
