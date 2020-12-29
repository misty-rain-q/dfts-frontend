<template>
  <div class="home">
    <img class="logo" src="../assets/pageLogo.png" alt="">
    <br/>
    <br/>
    <download></download>
    <br/>
    <br/>
    <upload></upload>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';
import Download from '@/components/Download.vue';
import Upload from '@/components/Upload.vue';

export default {
  name: 'Home',
  components: {
    Download,
    Upload,
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
}
</style>
