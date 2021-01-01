<template>
    <div class="downloadWindow">
        <div class="left">
          <DownloadList></DownloadList>
        </div>

        <div class="right">
          <img class="logo" src="../assets/uploadLogo.jpg" alt="">
          <!-- <click-upload></click-upload> -->
          <!-- <DragUpload></DragUpload> -->
          <FileInfo class="info"></FileInfo>
        </div>

        <!-- <CancelAndUpload></CancelAndUpload> -->

    </div>
</template>

<script>
import DownloadList from '@/components/DownloadList.vue';
import FileInfo from '@/components/FileInfo.vue';
// import CancelAndUpload from '@/components/CancelAndUpload.vue';

export default {
  name: 'DownloadWindow',

  components: {
    DownloadList,
    FileInfo,
  },

};
</script>

<style scoped>
.downloadWindow {
  display: flex;
  height: 300px;
  /* background-color: red; */
}

.left {
  width: 100%;
  margin-right: 10px;
}

.right {
  text-align: center;
}

.logo {
  width: 30%;
}

.info {
  width: 100%;
}

</style>
