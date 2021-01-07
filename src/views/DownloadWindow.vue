<template>
    <div class="downloadWindow">
        <div class="left">
          <DownloadList></DownloadList>
        </div>

        <div class="right">
          <img class="logo" src="../assets/uploadLogo.jpg" alt="">
          <FileInfo class="info"></FileInfo>
        </div>

    </div>
</template>

<script>
import DownloadList from '@/components/DownloadList.vue';
import FileInfo from '@/components/FileInfo.vue';

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
