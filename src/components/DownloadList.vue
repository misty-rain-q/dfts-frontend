<template>
  <div>
    <div :style="{ borderBottom: '1px solid silver' }">
      <a-checkbox :indeterminate="indeterminate" :checked="checkAll" @change="onCheckAllChange">
        全选
      </a-checkbox>
    </div>
    <br />
    <div class="file">
      <a-checkbox-group v-model="checkedList" :options="plainOptions" @change="onChange" />
    </div>

  </div>
</template>

<script>
const plainOptions = ['文件一', '文件二', '文件三'];
const defaultCheckedList = ['文件一', '文件二', '文件三'];
export default {
  data() {
    return {
      checkedList: defaultCheckedList,
      indeterminate: true,
      checkAll: false,
      plainOptions,
    };
  },
  methods: {
    onChange(checkedList) {
      this.indeterminate = !!checkedList.length && checkedList.length < plainOptions.length;
      this.checkAll = checkedList.length === plainOptions.length;
    },
    onCheckAllChange(e) {
      Object.assign(this, {
        checkedList: e.target.checked ? plainOptions : [],
        indeterminate: false,
        checkAll: e.target.checked,
      });
    },
  },
};
</script>

<style scoped>
/deep/ .ant-checkbox-group-item{
    display: block;
    margin-bottom: 10px;
}
</style>
