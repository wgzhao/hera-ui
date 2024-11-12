<template>
  <div>
    <el-table :data="rtTasks" strip style="width: 100%">
      <!-- foreach for columns -->
      <el-table-column
        v-for="column in columns"
        :key="column.field"
        :prop="column.field"
        :label="column.title"
        :align="column.align"
        :sortable="column.sort"
        :fixed="column.fixed"
      />
    </el-table>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getRealtimeTasks } from "@/api/monitor/realtime-task";

const rtTasks = ref([]); //表格数据
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

onMounted(() => {
  //模拟数据
  getRealtimeTasks().then(res => {
    rtTasks.value = res.data;
  });
});
</script>
