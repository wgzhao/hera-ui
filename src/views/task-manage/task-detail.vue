<template>
<div>
<el-row :gutter="2">
  <el-col :span="4"><el-button :icon="Refresh" type="primary" circle /></el-col>
  <el-col :span="6"><el-input v-model="search" placeholder="Search..." /></el-col>
  <el-col :span="5">
    <el-select v-model="taskStatus" placeholder="任务状态">
      <el-option v-for="item in allStatus"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </el-col>
  <el-col :span="4">
  <el-date-picker
        v-model="selectDate"
        type="date"
        placeholder="选择日期"
        format="YYYY-MM-DD"
        value-format="YYYY-MM-DD"
        editable="true"
      />
  </el-col>
</el-row>
<!-- <pure-table :data="tasks" :columns="columns" /> -->
</div>
</template>
<script>
import { ref, onMounted, computed } from "vue";
import {Refresh} from "@element-plus/icons-vue";
import { getAllTasks } from "@/api/task-manage";

const tasks = ref([]);

const columns =  ref([
    {
        prop: '',
        label: '序号',
        formatter: function (val, row, index) {
            return index + 1;
        },
        width: "1%"
    }, {
        prop: 'jobId',
        label: '任务ID',
        formatter: function (val) {
            return '<a href = "#">' + val + '</a>';
        },
        width: "1%",
        sortable: true
    }, {
        prop: 'jobName',
        label: '任务名称',
        sortable: true
    }, {
        prop: 'description',
        label: '任务描述',
        sortable: true
    }, {
        prop: 'startTime',
        label: '开始时间',
        formatter: function (val) {
            return getLocalTime(val);
        },
        width: "10%",
        sortable: true
    }, {
        prop: 'endTime',
        label: '结束时间',
        formatter: function (val) {
            return getLocalTime(val);
        },
        width: "10%",
        sortable: true
    },
    {
        prop: 'runTime',
        label: '运行时间',
        sortable: true,
        formatter: function (val) {
            var longFloat = parseFloat(val);
            if (longFloat >= 3600) {
                var h = Math.floor(longFloat / 3600);
                var m = Math.floor(longFloat % 3600 / 60);
                var s = (longFloat % 60) == 0 ? "" : (longFloat % 60) + "秒";
                if (m == 0 && s == 0) {
                    return h + '时';
                } else {
                    return h + '时' + m + '分' + s;
                }
            } else if (3600 > longFloat && longFloat > 60) {
                var mm = Math.floor(longFloat % 3600 / 60);
                var ss = (longFloat % 60) == 0 ? "" : (longFloat % 60) + "秒";
                return mm + '分' + ss;
            } else if (longFloat <= 60) {
                return longFloat + '秒';
            } else {
                return val;
            }
        },
        width: "6%",
        sortable: true,
    },
    {
        prop: 'times',
        label: '执行次数',
        sortable: true,
        width: "5%"
    }, {
        prop: 'executeHost',
        label: '执行服务器',
        sortable: true,
    }, {
        prop: 'status',
        label: '执行状态',
        sortable: true
    }, {
        prop: 'operator',
        label: '执行人',
        sortable: true
    }
]);

const search = ref();
const taskStatus = ref("all");
// set today
const selectDate = ref('')

const allStatus = [
  { value: "all", label: "全部"}
  ,{ value: "failed", label: "失败"}
  ,{ value: "success", label: "成功"}
  ,{ value: "running", label: "运行中"}
  ,{ value: "wait", label: "等待"}
];

const currentPage=ref(1)
const pageSize=ref(10)
const total=ref(0)

const tableData = computed(() => {
  return tasks.slice((currentPage.value - 1) * pageSize.value, currentPage.value * pageSize.value);
});

function getTodayString() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
  const day = String(today.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

onMounted(() => {
    getAllTasks().then((res) => {
        tasks.value = res.data;
        total.value = res.data.length;
    });
});
</script>
