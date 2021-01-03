<template>
  <div     class="dragupload">
  <a-upload-dragger
    :showUploadList="false"
    name="file"
    :multiple="true"
    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
    @change="handleChange"
  >
    <p class="upload-drag-icon">
      <img class="file-icon" src="../assets/file.png" alt="">
    </p>
    <p class="upload-text">
      Click or drag file to this area to upload
    </p>
    <p class="upload-hint">
      Support for a single or bulk upload. Strictly prohibit from uploading company data or other
      band files
    </p>
  </a-upload-dragger>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    handleChange(info) {
      this.$emit('filelist-changed', info.fileList);
    },
  },
};
</script>

<style>

.file-icon{
  width:10%;

}

.upload-text{
  font-size: 16px;
}

.upload-hint{
  color: dashed silver;
  font-size: 12px;
}
</style>
