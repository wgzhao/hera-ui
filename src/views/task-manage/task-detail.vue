<template>
  <!-- <MyTable :data="jobHistory" :columns="columns" /> -->
  <pure-table
    border
    fixed
    row-key="id"
    alignWhole="center"
    showOverflowTooltip
    size="default"
    :data="jobHistory"
    :columns="columns"
  >
    <template #status="{ row }">
      <el-tag v-if="row.status == 'running'" type="primary">运行中</el-tag>
      <el-tag v-else-if="row.status == 'success'" type="success">成功</el-tag>
      <el-tag v-else-if="row.status == 'failed'" type="danger">失败</el-tag>
      <el-tag v-else-if="row.status == 'wait'" type="warning">等待</el-tag>
      <el-tag v-else>{{ row.status }}</el-tag>
    </template>
  </pure-table>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getJobHistory } from "@/api/task-manage";
// import MyTable from "@/components/MyTable.vue";
import { useDetail } from "@/utils/tagHook";

defineOptions({
  name: "TaskDetail"
});

const { initToDetail, getParameter } = useDetail();

const jobHistory = ref([]);
const columns = [
  {
    prop: "id",
    label: "id",
    width: "100px"
  },
  {
    prop: "actionId",
    label: "版本号",
    width: "200px"
  },
  {
    prop: "jobId",
    label: "任务ID",
    width: "80px"
  },
  {
    prop: "executeHost",
    label: "执行机器ip",
    width: "130px"
  },
  {
    prop: "status",
    label: "执行状态",
    width: "80px",
    slot: "status"
  },
  {
    prop: "operator",
    label: "执行人",
    width: "100px"
  },
  {
    prop: "startTime",
    label: "开始时间",
    width: "100px"
  },
  {
    prop: "endTime",
    label: "结束时间",
    width: "100px"
  },
  {
    prop: "runTime",
    label: "运行时间",
    sortable: true,
    width: "70px"
  },

  {
    prop: "illustrate",
    label: "说明"
  },
  {
    prop: "triggerType",
    label: "触发类型",
    formatter: (row: any) => {
      if (row.triggerType == 1) {
        return "自动调度";
      }
      if (row.triggerType == 2) {
        return "手动触发";
      }
      if (row.triggerType == 3) {
        return "手动恢复";
      }
      return row.triggerType;
    }
  },
  {
    prop: "status",
    label: "操作",
    formatter: (row: any) => {
      var html = `<el-button @click='cancelJob($row.id)'>取消任务</el-button>`;
      if (row["status"] == "running") {
        return html;
      }
    }
  }
];

onMounted(() => {
  initToDetail();
  getJobHistory(getParameter.id).then(res => {
    jobHistory.value = res.rows;
  });
});
</script>
