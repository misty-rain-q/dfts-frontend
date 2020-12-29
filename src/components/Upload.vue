<template>
  <div class="upload">
    <a-button @click="turnToUploadPage" type="primary" icon="upload" :size="size">
      上传
    </a-button>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'Upload',
  components: {
  },
  methods: {
    turnToUploadPage() {
      console.log('UploadPage');
    },
  },
};
</script>

<style scoped>

</style>
