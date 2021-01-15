<template>
    <div id="SetFile">
      <br>
      <div class="extraction">
        添加提取码：
        <a-input-password placeholder="不添加则不写" v-model="password" />
      </div>

        <br>
        <div>
          <span>有&nbsp;效&nbsp;日&nbsp;期：&nbsp;&nbsp;</span>
          <a-select class="date" default-value="forever"
            style="width: 120px"
            @change="handleChange"

            v-model="datelist">
            <a-select-option value="forever">
              永久
            </a-select-option>
            <a-select-option value="month">
              1个月
            </a-select-option>
            <a-select-option value="week">
              1星期
            </a-select-option>
            <a-select-option value="day">
              1天
            </a-select-option>
            <a-select-option value="hour">
              1小时
            </a-select-option>
          </a-select>
        </div>

        <br>
        <span>可下载次数：&nbsp;&nbsp;</span>
        <a-select class="counter" default-value="max"
         style="width: 90px" @change="downloadCountChange" v-model="downlist">
          <a-select-option value="max" >
            无限次
          </a-select-option>
          <a-select-option value="number" >
            有限次
          </a-select-option>
        </a-select>
        <a-input-number :disabled="disabled"
        id="inputNumber" :min="1" @change="onChange" v-model="downnum" />

    </div>
</template>

<script>
import Vue from 'vue';

export default {
  name: 'SetFile',

  data() {
    return {
      disabled: true,
      password: '',
      datelist: 'day',
      downlist: 'max',
      downnum: 0,

    };
  },

  watch: {
    password() {
      this.$emit('changeECode', this.password);
    },
    datelist() {
      this.$emit('changeEDate', this.datelist);
    },
    downlist() {
      this.$emit('changeDset', this.downlist);
    },
    downnum() {
      this.$emit('changeDTime', this.downnum);
    },

  },

  methods: {
    handleChange() {
      console.log('handleChange');
    },
    onChange(value) {
      console.log('changed', value);
    },
    downloadCountChange() {
      if (this.downlist === 'max') this.disabled = true;
      else this.disabled = false;
    },
    clearData() {
      this.disabled = true;
      this.password = '';
      this.datelist = 'day';
      this.downlist = 'max';
      this.downnum = 0;
    },
  },
  mounted() {
    Vue.eventBus.$on('upload-window-closed', this.clearData);
  },
};

</script>

<style scoped>
#SetFile{
    /* text-align: left;
    position: absolute; */
    bottom: 20%;
    right:13%;

}

.counter {
  margin-right: 10px;
}

.extraction .ant-input-password {
  width: 150px;
}

.ant-input-number {
  width: 80px;
}

</style>
