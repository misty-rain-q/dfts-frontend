<template>
    <div class="uploadwindow">
        <!-- <UploadWord></UploadWord> -->

        <div class="left">
          <UploadList
          :default-file-list="currentFileList"
          ></UploadList>
        </div>

        <div class="right">
          <!-- <click-upload></click-upload> -->
          <ClickUpload
          @filelist-changed="fileListChanged"
          ></ClickUpload>
          <SetFile></SetFile>
        </div>

        <!-- <CancelAndUpload></CancelAndUpload> -->

    </div>
</template>

<script>
import UploadList from '@/components/UploadList.vue';
import ClickUpload from '@/components/ClickUpload.vue';
import SetFile from '@/components/SetFile.vue';
// import CancelAndUpload from '@/components/CancelAndUpload.vue';

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
  display: flex;
  height: 300px;
  /* background-color: red; */
}

.left {
  width: 80%;
  margin-right: 10px;
}

</style>
