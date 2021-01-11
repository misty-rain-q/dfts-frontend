<template>
    <div id="iploadlist">
      <vue-scroll :ops="ops" style="width:100%;height:100%">
      <a-upload class="drag-upload-list"
        :file-list="defaultFileList"
        :before-upload="() => false"
        @change="handleChange">
        <!-- <a-button> <a-icon type="upload" /> Upload </a-button> -->
      </a-upload>
      </vue-scroll>
    </div>
</template>

<script>
export default {
  name: 'UploadList',
  props: {
    defaultFileList: Array,
  },

  data() {
    return {
      ops: {
        vuescroll: {},
        scrollPanel: {},
        rail: {
          keepShow: true,
        },
        bar: {
          hoverStyle: true,
          onlyShowBarOnScroll: false,
          background: '#F5F5F5',
          opacity: 0.5,
          'overflow-x': 'hidden',
        },
      },

    };
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

}

.drag-upload-list >>> .ant-upload-list-item {
  width: 100%;
}

/deep/.__bar-is-vertical {
  right: -1px !important;
}

/deep/.__bar-is-horizontal {
  display: none !important;
}
</style>
