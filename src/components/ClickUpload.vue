// 拖拽上传功能，研究

<template>
  <a-upload-dragger class="clickUpload"
    name="file"
    :multiple="true"
    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
    @change="handleChange"
  >
    <!-- <img class="file" src="../assets/file.png" alt=""> -->
    <p id="sentence1">点击或将文件拖拽到这里上传</p>
    <p id="sentence2">支持扩展名：.rar .zip .doc .docx .pdf .jpg</p>
  </a-upload-dragger>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    handleChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        this.$message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`);
      }
    },
  },
};
</script>

<style scoped>
.clickUpload {
    height: 100px;
}
</style>
