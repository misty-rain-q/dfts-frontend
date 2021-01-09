<template>
  <div     class="dragupload">
  <a-upload-dragger
    :showUploadList="false"
    name="file"
    :multiple="true"
    :before-upload="() => false"
    @change="handleChange"
  >
    <p class="upload-drag-icon">
      <img class="file-icon" src="../assets/file.png" alt="">
    </p>
    <p class="upload-text">
      点击或将文件拖拽到这里上传
    </p>
    <p class="upload-hint">
      支持扩展名：.rar .zip .doc .docx .pdf .jpg
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
