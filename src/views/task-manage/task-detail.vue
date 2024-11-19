<template>
  <div class="mb-2">
    <el-row>
      <el-col>
        <el-input
          v-model="search"
          placeholder="Search..."
          style="width: 200px"
        />
      </el-col>
    </el-row>
  </div>
  <pure-table
    border
    fixed
    row-key="id"
    showOverflowTooltip
    alignWhole="center"
    size="default"
    :data="filterData"
    :columns="columns"
    :pagination="pagination"
    @page-current-change="onCurrentChange"
    @page-size-change="onSizeChange"
  >
  <template #log="{row}">
      <el-link :icon="Plus" @click="getLog(row.id)"> </el-link>
    </template>
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
import { ref, onMounted, computed } from "vue";
import { getJobHistory, getJobLog } from "@/api/task-manage";
import { pagination, TriggerTypeList } from "./_utils";
import { Plus } from '@element-plus/icons-vue';

defineOptions({
  name: "TaskDetail"
});
const { jobId } = defineProps({
    type: Number,
  jobId: {
    required: true
  }

});
const search = ref("");

const jobHistory = ref([]);
const columns = [
  {
    prop: "",
    label: "",
    width: "50px",
    slot: "log"
  {
  },
    prop: "id",
    label: "id",
    width: "100px",
    cellRenderer: ({row: any}j) => (
      <el-link @click=getLog(row.id)>{row.id}</el-link>
      )
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
    width: "200px"
  },
  {
    prop: "endTime",
    label: "结束时间",
    width: "200px"
  },
  {
    prop: "runTime",
    label: "运行时间",
    sortable: true,
    width: "70px"
  },

  {
    prop: "illustrate",
    label: "说明",
    width: "100px"
  },
  {
    prop: "triggerType",
    label: "触发类型",
    width: "100px",
    formatter: (row: any) => {
      return TriggerTypeList[row.triggerType] || row.triggerType;
    }
  },
  {
    label: "操作",
    width: "100px",
    formatter: (row: any) => {
      var html = `<el-button @click='cancelJob($row.id)'>取消任务</el-button>`;
      if (row["status"] == "running") {
        return html;
      }
    }
  }
];
function onChange(val) {
  pagination.value.size = val;
  fetchData();
}

function onSizeChange(val) {
  pagination.value.pageSize = val;
  fetchData();
}

function onCurrentChange(val) {
  fetchData();
}

const filterData = computed(() => {
  if (search.value === "") {
    return jobHistory.value;
  } else {
    return jobHistory.value.filter((item: any) => {
      return (
        item.id.toString().includes(search.value) ||
        item.actionId.toString().includes(search.value) ||
        item.jobId.toString().includes(search.value) ||
        item.executeHost.includes(search.value) ||
        item.operator.includes(search.value) ||
        item.startTime.includes(search.value) ||
        item.endTime.includes(search.value)
      );
    });
  }
});

function fetchData() {
  const pageOffset =
    (pagination.value.currentPage - 1) * pagination.value.pageSize;
  getJobHistory(jobId, pagination.value.pageSize, pageOffset).then(res => {
    jobHistory.value = res.rows;
    pagination.value.total = res.total;
  });
};

function getLog(id: number) {
  getJobLog(id).then(res => alert(res.log)) ;
};
onMounted(() => {
  fetchData();
});
</script>
