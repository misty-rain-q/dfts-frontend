<template>
  <div>
    <a-table
      :row-selection="rowSelection"
      :columns="columns"
      :data-source="data">
      <span slot="action">
        <a @click="handleEdit()">预览</a>
      </span>
    </a-table>
  </div>
</template>

<script>
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    scopedSlots: { customRender: 'name' },
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: '30%',
    scopedSlots: { customRender: 'action' },
    align: 'center',
  },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
  },
  {
    key: '2',
    name: 'Jim Green',
  },
];

export default {
  data() {
    return {
      data,
      columns,
    };
  },
  computed: {
    rowSelection() {
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record) => ({
          props: {
            disabled: record.name === 'Disabled User',
            name: record.name,
          },
        }),
      };
    },
  },
  methods: {
    handleEdit() {
      console.log('1111');
    },
  },
};
</script>

<style scoped>

</style>
