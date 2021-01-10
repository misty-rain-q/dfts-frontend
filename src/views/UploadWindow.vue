<template>
    <div class="uploadwindow">
      <div class="left">
        <UploadList class="list"
        :default-file-list="currentFileList"
        ></UploadList>
      </div>

        <div class="right">
          <!-- <click-upload></click-upload> -->
          <ClickUpload
          @filelist-changed="fileListChanged"
          ></ClickUpload>
          <SetFile
          @changeECode = 'cgcode'
          @changeEDate = 'cgdate'
          @changeDset = 'cgds'
          @changeDTime = 'cgdt'
          @changeExtractionCode="extractionCodeChanged">
          </SetFile>
        </div>

        <!-- <CancelAndUpload></CancelAndUpload> -->

    </div>
</template>

<script>
import UploadList from '@/components/UploadList.vue';
import ClickUpload from '@/components/ClickUpload.vue';
import SetFile from '@/components/SetFile.vue';

export default {
  name: 'UploadWindow',
  data() {
    return {
      currentFileList: [],
    };
  },
  methods: {
    fileListChanged(val) {
      this.currentFileList = val;
      this.$emit('file-list-changed', this.currentFileList);
    },
    extractionCodeChanged(val) {
      this.$emit('changeExtractionCode', val);
    },
    // setfile值传递中介
    cgcode(password) {
      this.$emit('changeExtractionCode', password);
    },
    cgdate(datelist) {
      this.$emit('changeEffectiveDate', datelist);
    },
    cgds(downlist) {
      this.$emit('changeDownset', downlist);
    },
    cgdt(downnum) {
      this.$emit('changeDownloadTime', downnum);
    },

  },
  components: {
    UploadList,
    ClickUpload,
    SetFile,
  },

};
</script>

<style scoped>
.uploadwindow {
  display: grid;
  height: 100%;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

.left {
  margin-left: 5px;
  margin-right: 5px;
  margin-bottom: 5px;
  min-height: 30px;
  max-height: 300px;
}

.list {
  overflow: auto;
}

.right {
  margin-left: 5px;
  margin-right: 5px;
  margin-bottom: 5px;
}

</style>
