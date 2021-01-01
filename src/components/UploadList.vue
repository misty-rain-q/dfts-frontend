<template>
    <div id="iploadlist">
      <a-upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        :default-file-list="defaultFileList">
        <!-- <a-button> <a-icon type="upload" /> Upload </a-button> -->
      </a-upload>
    </div>
</template>

<script>
export default {
  name: 'UploadList',
  data() {
    return {
      defaultFileList: [
        {
          uid: '1',
          name: 'xxx.png',
          status: 'done',
          response: 'Server Error 500', // custom error message to show
          url: 'http://www.baidu.com/xxx.png',
        },
        {
          uid: '2',
          name: 'yyy.png',
          status: 'done',
          url: 'http://www.baidu.com/yyy.png',
        },
        {
          uid: '3',
          name: 'zzz.png',
          status: 'error',
          response: 'Server Error 500', // custom error message to show
          url: 'http://www.baidu.com/zzz.png',
        },
      ],
    };
  },
  methods: {
    handleChange({ file, fileList }) {
      if (file.status !== 'uploading') {
        console.log(file, fileList);
      }
    },
  },
};
</script>

<style scoped>
#iploadlist{
    border:dashed silver;
    height: 100%;
    /* position: relative;
    left:0%;
    top: 20%; */

}

#iploadlist li{
    background: lightblue;
    border: 1px solid solid silver;

}
</style>
