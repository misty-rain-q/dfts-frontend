<template>
    <div class="linkPage">
        <a-progress class="successIcon"
        type="circle"
        :stroke-color="{
            '0%': '#108ee9',
            '100%': '#87d068',
        }"
        :percent="100" :width="80"
        />
        <div class="linkAdress">
          <p class="fontLink">文件ID</p>
          <p class="address">{{fileId}}</p>
          <a-button class="copy" @click="copyfileid" type="primary" icon="copy">复制</a-button>
        </div>
        <div class="linkAdress">
          <p class="fontLink">复制链接</p>
          <p class="address">{{fileLink}}</p>
          <a-button class="copy" @click="copyfilelink" type="primary" icon="copy">复制</a-button>
        </div>
        <p class="codeTitle">二维码</p>
        <div>
        <vue-qr
          :size="100"
          :margin="0"
          :auto-color="true"
          :dot-scale="1"
          :text="fileLink" />
        </div>

    </div>
</template>
<script>

import VueQr from 'vue-qr';
import { copy } from 'iclipboard';

export default {
  name: 'LinkPage',

  components: {
    VueQr,
  },

  data() {
    return {
      fileId: '',
      fileLink: '',
    };
  },

  methods: {
    copyfileid() {
      copy(this.fileId);
      this.$message.success('复制文件id成功！');
    },

    copyfilelink() {
      this.$message.success('复制文件链接成功！');
      copy(this.fileLink);
    },

    updateFileInformation(fileId, fileLink) {
      this.fileId = fileId;
      this.fileLink = fileLink;
    },

  },

  mounted() {
    this.updateFileInformation(
      window.storage.currentFile.fileId,
      window.storage.currentFile.fileLink,
    );
    if (window.storage.vm === undefined) {
      window.storage.vm = {};
    }
    window.storage.vm.linkPage = this;
  },
};
</script>

<style scoped>
.linkPage {
    text-align: center;
    /* display: flex; */
}

.successIcon {
    margin-bottom: 20px;
}
.linkAdress {
    display: flex;
    align-items: center;
}

.fontLink {
    font-size: 16px;
    margin-right: 20px;
    width: 80px;
}

.address {
    border: 1px solid silver;
    width: 60%;
    padding: 4px 2px;
}

.copy {
    margin-right: 10px;
    margin-left: auto;
}

.codeTitle {
    margin: 5px auto;
}

</style>
