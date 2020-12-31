<template>
  <div class="downloadButton">
    <a-input-search id="ainput" placeholder="搜索想要的文件id" style="width: 600px" @search="onSearch" />
    &nbsp;
    <a-button type="primary" icon="download" :size="size" @click="turnToDownloadPage">
      下载
    </a-button>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'DownloadButton',
  components: {
  },
  methods: {
    onSearch(value) {
      console.log(value);
    },
    turnToDownloadPage() {
      const inputElement = document.getElementById('ainput');
      console.log(inputElement.value);
    },
  },
};
</script>

<style scoped>

</style>
