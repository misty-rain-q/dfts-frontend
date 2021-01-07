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
  display: grid;
  height: 300px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  /* background-color: red; */
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
