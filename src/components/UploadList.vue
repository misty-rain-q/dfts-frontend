<template>
    <div id="iploadlist">
      <a-upload class="drag-upload-list" action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        :file-list="defaultFileList"
        @change="handleChange">
        <!-- <a-button> <a-icon type="upload" /> Upload </a-button> -->
      </a-upload>
    </div>
</template>

<script>
export default {
  name: 'UploadList',
  props: {
    defaultFileList: Array,
  },
  methods: {
    handleChange({ fileList }) {
      const newFileList = fileList;
      this.defaultFileList.splice(0, this.defaultFileList.length);
      newFileList.forEach((newFile) => {
        this.defaultFileList.push(newFile);
      });
    },
  },
};
</script>

<style scoped>
#iploadlist{
    border:1px solid silver;
    height: 100%;
    width: 280px;
    /* position: relative;
    left:0%;
    top: 20%; */

}

.drag-upload-list >>> .ant-upload-list-item {
  width: 280px;
}
</style>
