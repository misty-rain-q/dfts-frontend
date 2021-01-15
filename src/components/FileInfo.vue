<template>
    <div class="fileInfo">
        <p>剩余下载时间：{{remaining_time}}</p>
        <p>剩余下载次数：{{remaining_num}}</p>
        <p>文件上传时间：{{upload_time}}</p>
    </div>
</template>
<script>
import Vue from 'vue';

export default {
  data() {
    return {
      data: [],
      remaining_time: '',
      remaining_num: '',
      upload_time: '',
    };
  },
  mounted() {
    const callbackEventName = 'file-info-satisfied';
    Vue.eventBus.$on(callbackEventName, (info) => {
      if (info.remaining_time === 'forever') {
        this.remaining_time = '永久';
      } else {
        let addition = 1;
        switch (info.remaining_time) {
          case 'month':
            addition = 30 * 24 * 60 * 60 * 1000;
            break;
          case 'week':
            addition *= 7 * 24 * 60 * 60 * 1000;
            break;
          case 'day':
            addition *= 24 * 60 * 60 * 1000;
            break;
          case 'hour':
            addition *= 60 * 60 * 1000;
            break;
          default:
            console.error('remaining_time error');
        }
        const currentDate = new Date();
        let remainDate = info.upload_time.getTime() + addition - currentDate.getTime();
        if (remainDate / (24 * 60 * 60 * 1000) !== 0) {
          this.remaining_time = `${parseInt(this.remaining_time + remainDate / (24 * 60 * 60 * 1000), 10)}天`;
          remainDate %= (24 * 60 * 60 * 1000);
        }
        this.remaining_time += `${parseInt(remainDate / (60 * 60 * 1000), 10)}小时`;
      }

      this.remaining_num = info.remaining_num;
      if (info.down_set === 'max') {
        this.remaining_num = '无限次';
      }

      this.upload_time = `${info.upload_time.getFullYear()}年${
        String(info.upload_time.getMonth() + 1)}月${
        info.upload_time.getDate()}日${
        String(info.upload_time.getHours() + 1)}点`;
    });
    Vue.eventBus.$emit('file-info-needed');
  },
};
</script>
<style scoped>
.fileInfo {
    text-align: left;
    margin-top: 20px;
}
</style>
