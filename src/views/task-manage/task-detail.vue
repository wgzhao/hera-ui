<template>
  <!-- <MyTable :data="jobHistory" :columns="columns" /> -->
  <pure-table
    border
    auto
    row-key="id"
    alignWhole="center"
    showOverflowTooltip
    size="default"
    :data="jobHistory"
    :columns="columns"
  />
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

initToDetail();

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
    width: "80px"
    // formatter: function (val) {
    //     if (val === 'running') {
    //         return '<a class="layui-btn layui-btn-xs" style="width: 100%;">' + val + '</a>';
    //     }
    //     if (val === 'success') {
    //         return '<a class="layui-btn layui-btn-xs" style="width: 100%;background-color:#2f8f42" >' + val + '</a>';
    //     }
    //     if (val === 'wait') {
    //         return '<a class="layui-btn layui-btn-xs layui-btn-warm" style="width: 100%;">' + val + '</a>';
    //     }
    //     return '<a class="layui-btn layui-btn-xs layui-btn-danger" style="width: 100%;" >' + val + '</a>'
    // },
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
    formatter: function (index, row) {
      var html =
        "<a href=\"javascript:cancelJob('" +
        row["id"] +
        "','" +
        row["jobId"] +
        "')\">取消任务</a>";
      if (row["status"] == "running") {
        return html;
      }
    }
  }
];
onMounted(() => {
  console.log(getParameter.id);
  getJobHistory(getParameter.id).then(res => {
    jobHistory.value = res.rows;
  });
});
</script>
