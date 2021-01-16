<template>
  <div class="home">
    <div class="node" v-show="false">
      <span>后端节点控制：</span><a-switch @change="changeBackendState" />
    </div>
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
import DownloadButton from '../components/DownloadButton.vue';
import UploadButton from '../components/UploadButton.vue';

export default {
  name: 'Home',
  components: {
    DownloadButton,
    UploadButton,
  },
  methods: {
    changeBackendState(newValue) {
      if (newValue) {
        window.location.href = 'dfts://';
        console.log('Attempted to launch helper client');
        this.$message.info('如果客户端未能自动启动，请手动安装启动客户端并刷新页面', 10);
      } else {
        this.$message.error('目前暂不支持通过前端关闭客户端；请手动操作');
        // TODO Revert the state to on
      }
    },
  },
  data() {
    return {
      backendUp: true,
    };
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
.node {
  position: fixed;
  right: 10px;
  bottom: 10px;
}
</style>
