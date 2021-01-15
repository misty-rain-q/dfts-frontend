<template>
  <div class="uploadButton">
    <a-button @click="turnToUploadPage" type="primary" icon="upload">
      上传
    </a-button>
    <a-modal
    @ok="uploadToGundb"

    ok-text="上传" cancel-text="取消"
     :maskClosable= "false" v-model="visible" title="上传">
      <upload-window
      @changeExtractionCode = "changeCode"
      @changeEffectiveDate = 'changeDate'
      @changeDownloadTime = 'changeTime'
      @changeDownset = 'changeSet'
      @file-list-changed="handleFileListChange"></upload-window>
    </a-modal>
    <a-modal ok-text="确定" cancel-text="取消" :centered="true"
     :maskClosable= "false" v-model="linkVisible" title="上传成功" @ok="linkPageHandleOk">
      <link-page></link-page>
    </a-modal>
  </div>
</template>

<script>
import Vue from 'vue';

import UploadWindow from '../views/UploadWindow.vue';

import LinkPage from '../views/LinkPage.vue';
// @ is an alias to /src

export default {
  name: 'UploadButton',
  components: {
    UploadWindow,
    LinkPage,
  },
  data() {
    return {
      visible: false,
      fileList: [],
      extractionCode: '',
      effectiveDate: 'day',
      downloadTime: 1,
      downset: 'max',
      linkVisible: false,
    };
  },
  watch: {
    visible(val) {
      if (!val) {
        Vue.eventBus.$emit('upload-window-closed');
      }
    },
  },
  methods: {
    turnToUploadPage() {
      this.visible = true;
      // console.log('UploadPage');
    },
    linkPageHandleOk() {
      this.linkVisible = !this.linkVisible;
    },
    handleFileListChange(newFileList) {
      this.fileList = newFileList;
    },
    changeCode(code) {
      this.extractionCode = code;
      console.log(this.extractionCode);
    },
    changeDate(datelist) {
      this.effectiveDate = datelist;
      console.log(this.effectiveDate);
    },
    changeTime(downnum) {
      this.downloadTime = downnum;
      console.log(this.downloadTime);
    },
    changeSet(downlist) {
      this.downset = downlist;
      console.log(this.downset);
    },
    uuid(len, radix) {
      const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
      const uuid = []; let
        i;
      const adoptedRadix = radix || chars.length;
      if (len) {
        for (i = 0; i < len; i += 1) uuid[i] = chars[Math.floor(Math.random() * adoptedRadix)];
      } else {
        let r;
        uuid[8] = '-';
        uuid[13] = '-';
        uuid[18] = '-';
        uuid[23] = '-';
        uuid[14] = '4';
        for (i = 0; i < 36; i += 1) {
          if (!uuid[i]) {
            r = Math.floor(Math.random() * 16);
            // eslint-disable-next-line no-bitwise
            uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r];
          }
        }
      }

      return uuid.join('');
    },

    getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        let fileResult = '';
        reader.readAsDataURL(file);
        reader.onload = () => {
          fileResult = reader.result;
        };
        reader.onerror = (error) => {
          reject(error);
        };
        reader.onloadend = () => {
          resolve(fileResult);
        };
      });
    },

    uploadToGundb() {
      if (this.fileList.length === 0) {
        this.$message.error('上传错误，文件列表为空');
      } else {
        const tempThis = this;
        const fileNum = this.fileList.length;
        const uid = this.uuid(8, 16);
        window.gun = tempThis.$gun;
        const nowtime = new Date().toISOString();// 获取当前时间（0时区）
        if (this.downloadTime === null) {
          this.$message.error('有效日期格式错误!');
        } else {
          tempThis.$gun.get('gun-dfts').get('transfers').get(uid).get('total')
            .put(fileNum);
          tempThis.$gun.get('gun-dfts').get('transfers').get(uid).get('extractionCode')
            .put(this.extractionCode);
          tempThis.$gun.get('gun-dfts').get('transfers').get(uid).get('effectiveDate')
            .put(this.effectiveDate);
          tempThis.$gun.get('gun-dfts').get('transfers').get(uid).get('downloadTime')
            .put(this.downloadTime);
          tempThis.$gun.get('gun-dfts').get('transfers').get(uid).get('downset')
            .put(this.downset);
          tempThis.$gun.get('gun-dfts').get('transfers').get(uid).get('uploadtime')
            .put(nowtime);

          // console.log('original data', {
          //   extractionCode: this.extractionCode,
          //   downloadTime: this.downloadTime,
          //   effectiveDate: this.effectiveDate,
          //   downset: this.downset,
          // });

          for (let i = 0; i < fileNum; i += 1) {
            const fileUid = this.uuid(8, 16);
            // tempThis.$gun.get('gun-dfts').get('transfers').get(uid).get('files')
            //   .put(fileUid);
            this.getBase64(this.fileList[i].originFileObj).then((str) => {
              tempThis.$gun.get('gun-dfts').get('transfers').get(uid).get('files')
                .get(fileUid)
                .put({
                  content: str,
                  filename: this.fileList[i].name,
                });
              tempThis.$gun.get('gun-dfts').get('transfers').get(uid).get('files')
                .get(fileUid)
                .on((obj) => console.log('file', obj));
            });
          }

          tempThis.$gun.get('gun-dfts').get('transfers').get(uid).once((data) => {
            console.log('uploaded transfer', data);
          });
          this.$message.success('上传成功！');
          this.visible = !this.visible;

          this.linkVisible = !this.linkVisible;
          window.storage.currentFile = {
            fileId: uid,
            fileLink: `${window.location.origin}/?fileId=${uid}`,
          };
          if (window.storage.vm && window.storage.vm.linkPage) {
            window.storage.vm.linkPage.updateFileInformation(
              window.storage.currentFile.fileId,
              window.storage.currentFile.fileLink,
            );
          }
        }// 上传
      }
    },
  },
};
</script>

<style scoped>
/deep/ .ant-modal {
  width: 40rem !important;

}

/deep/ .ant-modal-body {
  min-height: 300px;
  max-height: 650px;
}
</style>
