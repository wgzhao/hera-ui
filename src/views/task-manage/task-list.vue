<template>
  <div>
    <el-row class="mb-1">
      <el-col :span="2"
        ><el-button :icon="Refresh" type="primary" @click="fetchData"
      /></el-col>
      <el-col :span="4">
        <el-input
          v-model="search"
          placeholder="Search..."
          style="width: 200px"
        />
      </el-col>
      <el-col :span="5">
        <el-text class="primary flex-auto">开始日期: </el-text>
        <el-date-picker
          v-model="selectDate"
          type="date"
          placeholder="选择日期"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
          size="default"
          :editable="true"
          @change="fetchData"
        />
      </el-col>
    </el-row>
    <!-- <MyTable :tableData="tasks" :columns="columns" :isEditable="false" /> -->
    <pure-table
      border
      row-key="id"
      alignWhole="center"
      showOverflowTooltip
      size="default"
      :height="pagination.pageSize * 45 + 20"
      :data="
        filterData.slice(
          (pagination.currentPage - 1) * pagination.pageSize,
          pagination.currentPage * pagination.pageSize
        )
      "
      :columns="columns"
      :pagination="pagination"
      @page-size-change="onSizeChange"
      @page-current-change="onCurrentChange"
    >
      <template #jobId="{ row }">
        <el-link
          type="primary"
          @click="
            toDetail(
              { id: row.jobId },
              '`/task-manage/task-detail/:id`',
              'TaskDetail',
              '历史任务详情'
            )
          "
          >{{ row.jobId }}</el-link
        >
      </template>
    </pure-table>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, computed, watch, reactive } from "vue";
import { Refresh } from "@element-plus/icons-vue";
import { getAllTasks } from "@/api/task-manage";
import MyTable from "@/components/MyTable/index.vue";
import type { PaginationProps } from "@pureadmin/table";
import { useDetail } from "@/utils/tagHook";

const tasks = ref([]);
const pagination = ref<PaginationProps>({
  pageSize: 10,
  currentPage: 1,
  total: 0,
  align: "right",
  background: false,
  size: "default"
});

const allStatus = [
  { value: "all", text: "全部" },
  { value: "failed", text: "失败" },
  { value: "success", text: "成功" },
  { value: "running", text: "运行中" },
  { value: "wait", text: "等待" }
];

const { toDetail, router } = useDetail();

// const last7days = Array.from({ length: 7 }, (_, i) => {
//   const date = new Date();
//   date.setDate(date.getDate() - i);
//   return {
//     value: date.toLocaleDateString("en-CA"),
//     text: date.toLocaleDateString("en-CA")
//   };
// });

const search = ref();
const taskStatus = ref("all");
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
      return row.status === "success"
        ? "成功"
        : row.status === "failed"
          ? "失败"
          : row.status === "running"
            ? "运行中"
            : "等待";
    },
    filters: allStatus,
    filterMethod: (value, row) => {
      return row.status === value;
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

function fetchData() {
  //status=all&dt=2024-11-15&operator=&_=1731654456641
  const params: jobParams = {
    status: taskStatus.value || "all",
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
