<template>
  <div class="home">
    <img class="logo" src="../assets/pageLogo.png" alt="">
    <br/>
    <br/>
    <downloadButton></downloadButton>
    <br/>
    <br/>
    <uploadButton></uploadButton>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';
import DownloadButton from '@/components/DownloadButton.vue';
import UploadButton from '@/components/UploadButton.vue';

export default {
  name: 'Home',
  components: {
    DownloadButton,
    UploadButton,
  },
};
</script>

<style scoped>
.home{
  background-image: url('../assets/bgc.jpg');
  width: 100%;
  height: 750px;
}
.logo {
  margin-top: 100px;
  width: 25%;
  min-width: 200px;
}
</style>
