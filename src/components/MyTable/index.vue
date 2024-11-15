<template>
  <div>
    <pure-table :data="filterData" :columns="columns" stripe border auto>
      <slot />
      <el-table-column fixed="right" label="操作" min-width="120">
        <template #default="{ row, index }">
          <el-button type="primary" size="small" @click="$emit('editItem', row)">编辑</el-button>
          <el-button type="danger" size="small" @click="$emit('delItem', row)">删除</el-button>
        </template>
      </el-table-column>
    </pure-table>
    <el-pagination layout="prev, pager, next, total, sizes" :page-sizes="pageSize" :total="total"
      @current-change="handleCurrentChange" @size-change="handleSizeChange" :hide-on-single-page="false" />
  </div>
</template>
<script setup lang="ts">
import { ref, defineProps, computed } from 'vue';

const { tableData, columns } = defineProps<{
  tableData: any[],
  columns: any[]
}>();

const total = columns.value.length;

const pageSize = [5, 10, 15, 20, 25, 30, 50];

const state = ref({
  page: 1,
  limit: 10,
  total: total
});

const handleCurrentChange = (val: number) => {
  state.value.page = val;
};

const handleSizeChange = (val: number) => {
  state.value.limit = val;
}

const filterData = computed(() => {
  return tableData.value.filter((item: any, index: number) =>
    index < state.value.page * state.value.limit && index >= (state.value.page - 1) * state.value.limit
  );
});
</script>
