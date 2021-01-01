<template>
    <div class="uploadwindow">
        <!-- <UploadWord></UploadWord> -->

        <div class="left">
          <UploadList></UploadList>
        </div>

        <div class="right">
          <!-- <click-upload></click-upload> -->
          <DragUpload></DragUpload>
          <SetFile></SetFile>
        </div>

        <!-- <CancelAndUpload></CancelAndUpload> -->

    </div>
</template>

<script>
import UploadList from '@/components/UploadList.vue';
import DragUpload from '@/components/DragUpload.vue';
import SetFile from '@/components/SetFile.vue';
// import CancelAndUpload from '@/components/CancelAndUpload.vue';

export default {
  name: 'UploadWindow',

  components: {
    UploadList,
    DragUpload,
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
