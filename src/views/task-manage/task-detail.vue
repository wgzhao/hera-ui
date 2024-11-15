<template>
  <div>
    <el-row class="mb-2">
      <el-col :span="2"
        ><el-button :icon="Refresh" type="primary" @click="fetchData"
      /></el-col>
      <el-col :span="2"
        ><el-input
          v-model="search"
          placeholder="Search..."
          style="width: 200px"
          @change="fetchData"
      /></el-col>
      <el-col :span="2" :offset="8"
        ><el-text class="mx-1 justify-center text-center"
          >任务状态</el-text
        ></el-col
      >
      <el-col :span="5">
        <el-select
          v-model="taskStatus"
          placeholder="任务状态"
          @change="fetchData"
        >
          <el-option
            v-for="item in allStatus"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>
      <el-col :span="5">
        <el-date-picker
          v-model="selectDate"
          type="date"
          placeholder="选择日期"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
          :editable="true"
          @change="fetchData"
        />
      </el-col>
    </el-row>
    <pure-table :data="tasks" :columns="columns" />
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import { Refresh } from "@element-plus/icons-vue";
import { getAllTasks } from "@/api/task-manage";

const tasks = ref([]);

const columns = [
  {
    prop: "jobId",
    label: "任务ID",
    sortable: true
  },
  {
    prop: "jobName",
    label: "任务名称",
    sortable: true
  },
  {
    prop: "description",
    label: "任务描述",
    sortable: true
  },
  {
    prop: "startTime",
    label: "开始时间",
    sortable: true,
    formatter: (row: any) => {
      return new Date(row.endTime).toLocaleTimeString();
    }
  },
  {
    prop: "endTime",
    label: "结束时间",
    sortable: true,
    formatter: (row: any) => {
      return new Date(row.endTime).toLocaleTimeString();
    }
  },
  {
    prop: "runTime",
    label: "运行时间",
    sortable: true
  },
  {
    prop: "times",
    label: "执行次数",
    sortable: true
  },
  {
    prop: "executeHost",
    label: "执行服务器",
    sortable: true
  },
  {
    prop: "status",
    label: "执行状态",
    sortable: true
  },
  {
    prop: "operator",
    label: "执行人",
    sortable: true
  }
];

const search = ref();
const taskStatus = ref("all");
// set today
const selectDate = ref(getTodayString());

const allStatus = [
  { value: "all", label: "全部" },
  { value: "failed", label: "失败" },
  { value: "success", label: "成功" },
  { value: "running", label: "运行中" },
  { value: "wait", label: "等待" }
];

const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0);

const tableData = computed(() => {
  if (search.value != "") {
    return tasks.value.filter(task => task.jobName.includes(search.value));
  }
  return tasks.value.slice(
    (currentPage.value - 1) * pageSize.value,
    currentPage.value * pageSize.value
  );
});

function getTodayString() {
  return new Date().toLocaleDateString("en-CA");
}

function getLocalTime(timestamp) {
  if (timestamp == null) {
    return "";
  }
  return new Date(timestamp).toLocaleString("zh-CN").replaceAll("/", "-");
}

function fetchData() {
  //status=all&dt=2024-11-15&operator=&_=1731654456641
  const params = {};
  params.status = taskStatus.value || "all";
  params.dt = selectDate.value || getTodayString();
  params.operator = "";
  getAllTasks(params).then(res => {
    tasks.value = res.data.slice(0, 10);
    total.value = res.data.length;
  });
}

onMounted(() => {
  fetchData();
});
</script>
