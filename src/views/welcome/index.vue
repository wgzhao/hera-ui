<script setup lang="ts">
import { ref, onMounted } from "vue";
import {
  getJobRunTimeTop10,
  getAllJobStatusDetail,
  getUserJobInfo
} from "@/api/dashboard";
import type { TopJob, TopJobResult, JobSummary } from "@/api/dashboard";
import ReCol from "@/components/ReCol";
import { Last7DayChartLine, Top10RunJob } from "./components/charts";
import Segmented, { type OptionsType } from "@/components/ReSegmented";

defineOptions({
  name: "Welcome"
});

const result = ref([]);
const last7DaysJobInfo = ref([]);
const top10RunJobs = ref([]);

const currDay = ref(1); // 0 昨日; 1 今日
const optionsBasis: Array<OptionsType> = [
  { label: "今日", value: 1 },
  { label: "昨日", value: 0 }
];

onMounted(() => {
  getUserJobInfo("hz_admin").then(res => {
    result.value = [
      {
        name: "离线任务开启数",
        count: res.data.jobStartCount,
        link: ""
      },
      {
        name: "创建任务数",
        count: res.data.jobCount,
        link: ""
      },
      {
        name: "正在运行任务数",
        count: res.data.manJobCount,
        link: ""
      },
      {
        name: "失败任务数",
        count: res.data.failedJobCount,
        link: ""
      }
    ];
  });

  getAllJobStatusDetail().then(res => last7DaysJobInfo.value = res.data);
  getJobRunTimeTop10().then(res => top10RunJobs.value = res.data);
});
</script>

<template>
  <div>
    <div class="card-header bottom-3">数据监测</div>
    <el-row :gutter="24">
      <template v-for="info in result">
        <re-col :value="6" :xs="24" :sm="24">
          <div class="statistic-card">
            <el-statistic :value="info.count" :title="info.name" />
            <el-link class="mt-2" :to="info.link" target="_blank">
              查看详情
            </el-link>
          </div>
        </re-col>
      </template>
    </el-row>
  </div>
  <el-card style="max-width: 600px" class="line-card" shadow="never">
    <template #header>
      <div class="card-header">
        <span>任务执行情况</span>
      </div>
    </template>
    <div class="flex justify-between items-start mt-3">
      <Last7DayChartLine :dayRange="last7DaysJobInfo.xAxis"
        :successJobCount="last7DaysJobInfo.runSuccess.map(item => item.num)"
        :failedJobCount="last7DaysJobInfo.runFailed.map(item => item.num)" />
    </div>
  </el-card>

  <!-- <el-card style="max-width: 600px" class="bar-card" shadow="never">
    <template #header>
      <div class="card-header">
        <span>任务耗时 Top 10</span>
        <Segmented v-model="currDay" :options="optionsBasis" />
      </div>
    </template>
    <div class="flex justify-between items-start mt-3">
      <Top10RunJob :joNames="top10RunJobs.map(item => item.jobId + '(' + item.jobName + ')')"
        :currDayJobTimes="top10RunJobs.map(item => item.jobTime)"
        :lastDayJobTimes="top10RunJobs.map(item => item.yesterdayTime)" />
    </div>
  </el-card> -->
</template>
<style scoped>
.el-statistic {
  --el-statistic-content-font-size: 28px;
}

.statistic-card {
  height: 100%;
  padding: 20px;
  border-radius: 4px;
  background-color: var(--el-bg-color-overlay);
}

.statistic-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  font-size: 12px;
  color: var(--el-text-color-regular);
  margin-top: 16px;
}

.statistic-footer .footer-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.statistic-footer .footer-item span:last-child {
  display: inline-flex;
  align-items: center;
  margin-left: 4px;
}
</style>
