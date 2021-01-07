<template>
    <div class="uploadwindow">
      <div class="left">
        <UploadList
        :default-file-list="currentFileList"
        ></UploadList>
      </div>

      <div class="right">
        <ClickUpload
        @filelist-changed="fileListChanged"
        ></ClickUpload>
        <SetFile></SetFile>
      </div>

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
  height: 300px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

.left {
  margin-left: 5px;
  margin-right: 5px;
  margin-bottom: 5px;
}

.right {
  margin-left: 5px;
  margin-right: 5px;
  margin-bottom: 5px;
}

</style>
