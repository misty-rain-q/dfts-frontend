<template>
  <div class="uploadButton">
    <a-button @click="turnToUploadPage" type="primary" icon="upload" :size="size">
      上传
    </a-button>
    <a-modal ok-text="上传" cancel-text="取消"
     :maskClosable= "false" v-model="visible" title="上传" @ok="handleOk">
      <upload-window></upload-window>
    </a-modal>
  </div>
</template>

<script>
import UploadWindow from '../views/UploadWindow.vue';
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'UploadButton',
  components: {
    UploadWindow,
  },
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    turnToUploadPage() {
      this.visible = true;
      // console.log('UploadPage');
    },
    handleOk() {
      this.visible = false;
    },
  },
};
</script>

<style scoped>

</style>
