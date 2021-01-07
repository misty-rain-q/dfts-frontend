<template>
    <div id="SetFile">
         <!-- <button id="selectfile">选择文件</button> -->
      <br>
      <div class="extraction">
        添加提取码：
        <a-input-password placeholder="不添加则不写" />
      </div>
      <br>
      <div>
        <span>有效日期：&nbsp;&nbsp;</span>
        <a-select class="date" default-value="forever"
          style="width: 120px" @change="handleChange">
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
        style="width: 85px" @change="downloadCountChange">
        <a-select-option value="max">
          无限次
        </a-select-option>
        <a-select-option value="number">
          有限次
        </a-select-option>
      </a-select>
      <a-input-number :disabled="disabled" id="inputNumber" :min="1" @change="onChange" />

    </div>
</template>

<script>
export default {
  name: 'SetFile',
  data() {
    return {
      disabled: true,
    };
  },
  methods: {
    handleChange() {
      console.log('handleChange');
    },
    onChange(value) {
      console.log('changed', value);
    },
    downloadCountChange() {
      this.disabled = !this.disabled;
      console.log(this.disabled);
    },
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
