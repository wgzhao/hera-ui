<template>
  <div>
    <el-table :data="tableDate" stripe style="width: 100%" auto>
      <template #header>
        <el-input v-model="search" size="small" placeholder="Type to search" />
      </template>
      <el-table-column v-for="column in columns" :key="column.field" :prop="column.field" :label="column.title"
        :align="column.align" :sortable="column.sort" :fixed="column.fixed" />
    </el-table>
    <el-pagination layout="prev, pager, next, total, sizes" :total="total" @current-change="handleCurrentChange"
      @size-change="handleSizeChange" :hide-on-single-page="false" />
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { getRealtimeTasks } from "@/api/monitor/realtime-task";

const search = ref(""); //搜索框
const rtTasks = ref([]); //表格数据
const total = ref(0); //总数
const state = ref({
  page: 1,
  limit: 10,
  total: rtTasks.value.length
});
const columns = [
  //表头
  { field: "id", title: "任务id", fixed: "left", align: "center" },
  { field: "user", title: "用户名称", align: "center" },
  { field: "name", title: "任务名称", align: "center" },
  { field: "applicationType", title: "任务类型", align: "center" },
  { field: "startedTime", title: "开始时间", align: "center" },
  { field: "allocatedVCores", title: "使用核数", align: "center", sort: true },
  { field: "allocatedMB", title: "使用内存", align: "center", sort: true },
  { field: "progress", title: "进程", align: "center" }
];

const handleCurrentChange = (val: number) => {
  state.value.page = val;
};

const handleSizeChange = (val: number) => {
  state.value.limit = val;
}

const tableDate = computed(() => {
  return rtTasks.value.filter((item: any, index: number) =>
    index < state.value.page * state.value.limit && index >= (state.value.page - 1) * state.value.limit
  );
});

onMounted(() => {
  //模拟数据
  getRealtimeTasks().then(res => {
    total.value = res.count;
    rtTasks.value = res.data;
  });
});
</script>
