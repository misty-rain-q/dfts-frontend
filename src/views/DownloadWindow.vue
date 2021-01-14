<template>
    <div class="downloadWindow">
        <div class="left">
          <DownloadList class="list"></DownloadList>
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
  display: grid;
  height: 100%;
  grid-template-columns: repeat(auto-fit, minmax(200px, 2fr));
}

.left {
  margin-left: 5px;
  margin-right: 5px;
  margin-bottom: 5px;
  min-height: 30px;
  max-height: 300px;
}

.right {
  margin-left: 30px;
  text-align: center;
}

.logo {
  width: 30%;
}

.info {
  width: 100%;
}

</style>
