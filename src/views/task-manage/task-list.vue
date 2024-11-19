<template>
  <div class="mt-2">
    <el-row class="mb-1">
      <el-col :span="2"><el-button :icon="Refresh" type="primary" @click="fetchData" /></el-col>
      <el-col :span="4">
        <el-input v-model="search" placeholder="Search..." style="width: 200px" />
      </el-col>
      <el-col :span="5">
        <el-text class="primary flex-auto">开始日期</el-text>
        <el-date-picker v-model="selectDate" type="date" placeholder="选择日期" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
          size="default" :editable="true" @change="fetchData" />
      </el-col>
      <el-col :span="5">
        <el-text class="primary flex-auto pr-2">任务状态</el-text>
        <el-select style="width: 100px" v-model="selectedStatus" placeholder="选择任务状态" size="default" @change="fetchData">
          <el-option v-for="item in taskStatus" :key="item.value" :value="item.value" :label="item.text" />
        </el-select>
      </el-col>
    </el-row>
    <pure-table border row-key="id" alignWhole="center" showOverflowTooltip size="default"
      :height="pagination.pageSize * 45 + 20" :data="filterData.slice(
        (pagination.currentPage - 1) * pagination.pageSize,
        pagination.currentPage * pagination.pageSize
      )
        " :columns="columns" :pagination="pagination" @page-size-change="onSizeChange"
      @page-current-change="onCurrentChange">
      <template #jobId="{ row }">
        <el-link type="primary" @click="toDetail(row.jobId)">{{
          row.jobId
        }}</el-link>
      </template>
    </pure-table>
  </div>

  <el-dialog v-model="showDialog" align-center destroy-on-close draggable title="信息日志" width="80%">
    <TaskDetail :jobId="jobId" />
  </el-dialog>
</template>
<script setup lang="ts">
import { ref, onMounted, computed, watch, reactive } from "vue";
import { Refresh } from "@element-plus/icons-vue";
import { getAllTasks } from "@/api/task-manage";
import TaskDetail from "./task-detail.vue";
import { pagination, taskStatus } from "./_utils";

const tasks = ref([]);
const jobId = ref();

const showDialog = ref(false);

const search = ref();
const selectedStatus = ref("all");
// set today
const selectDate = ref(getTodayString());

const columns = [
  {
    prop: "jobId",
    label: "ID",
    width: "60px",
    slot: "jobId"
  },
  {
    prop: "jobName",
    label: "任务名称"
  },
  {
    prop: "description",
    label: "任务描述"
  },
  {
    prop: "startTime",
    label: "开始时间"
  },
  {
    prop: "endTime",
    label: "结束时间"
  },
  {
    prop: "runTime",
    label: "耗时",
    width: "60px"
  },
  {
    prop: "times",
    label: "执行次数",
    width: "90px"
  },
  {
    prop: "executeHost",
    label: "执行服务器",
    width: "110px"
  },
  {
    prop: "status",
    label: "执行状态",
    width: "100px",
    formatter: (row: any) => {
      return (
        taskStatus.find(item => item.value === row.status)?.text || row.status
      );
    }
  },
  {
    prop: "operator",
    label: "执行人",
    width: "100px"
  }
];

function getTodayString() {
  return new Date().toLocaleDateString("en-CA");
}

function onChange(val) {
  pagination.value.size = val;
}

function onSizeChange(val) {
  pagination.value.pageSize = val;
}

function onCurrentChange(val) {
  console.log(val);
}

const filterData = computed(() => {
  if (!search.value) {
    return tasks.value;
  } else {
    const result = tasks.value.filter((item: any) => {
      return (
        item.jobName.includes(search.value) ||
        item.description.includes(search.value)
      );
    });
    pagination.value.total = result.length;
    return result;
  }
});

type jobParams = {
  status: string;
  dt: string;
  operator: string;
};

function toDetail(val: number) {
  console.log("toDetail", val);
  jobId.value = val;
  showDialog.value = true;
}
function fetchData() {
  //status=all&dt=2024-11-15&operator=&_=1731654456641
  const params: jobParams = {
    status: selectedStatus.value || "all",
    dt: selectDate.value || getTodayString(),
    operator: ""
  };
  getAllTasks(params).then(res => {
    tasks.value = res.data;
    pagination.value.total = res.data.length;
  });
}

onMounted(() => {
  fetchData();
});
</script>
