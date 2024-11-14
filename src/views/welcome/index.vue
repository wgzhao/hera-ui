<script setup lang="ts">
import { ref, onMounted } from "vue";
import {
  getJobRunTimeTop10,
  getAllJobStatusDetail,
  getUserJobInfo
} from "@/api/dashboard";
import type { TopJob, TopJobResult, JobSummary, AllJobStatusDetailResult } from "@/api/dashboard";
import ReCol from "@/components/ReCol";
import { Last7DayChartLine, Top10RunJob } from "./components/charts";
import Segmented, { type OptionsType } from "@/components/ReSegmented";
import { useDark } from "@pureadmin/utils";
defineOptions({
  name: "Welcome"
});

const result = ref([]);
const last7DaysJobInfo = ref({});
const top10RunJobs = ref([]);

const { isDark } = useDark();
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
  console.log("last7DaysJobInfo: => ", last7DaysJobInfo.value);
});
</script>

<template>
  <div>
    <div class="bottom-10">数据监测</div>
    <el-row :gutter="24" justify="space-around">
      <re-col v-for="(item, index) in result" :key="index" v-motion class="mb-[18px]" :value="6" :md="12" :sm="12"
        :xs="24">
        <el-card class="line-card" shadow="never">
          <div class="flex justify-between">
            <span class="text-md font-medium">
              {{ item.name }}
            </span>
            <div class="w-8 h-8 flex justify-center items-center rounded-md" :style="{
              backgroundColor: isDark ? 'transparent' : '#effaff'
            }">
            </div>
          </div>

          <div class="flex justify-between items-start mt-3">
            <div class="w-1/2">
              <p class="font-medium text-green-500">{{ item.count }}</p>
            </div>
          </div>
        </el-card>

      </re-col>


      <re-col class="mb-[18px]" :value="18" :xs="24">
        <el-card shadow="never">
          <div class="flex justify-between">
            <span class="text-md font-medium">任务执行情况</span>
          </div>
          <div class="flex justify-between items-start mt-3">
            <Last7DayChartLine :dayRange="last7DaysJobInfo.xAxis"
              :successJobCount="last7DaysJobInfo.runSuccess.map(item => item.num)"
              :failedJobCount="last7DaysJobInfo.runFailed.map(item => item.num)" />
          </div>
        </el-card>
      </re-col>
    </el-row>

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
  </div>
</template>
<style lang="scss" scoped>
:deep(.el-card) {
  --el-card-border-color: none;

  /* 解决概率进度条宽度 */
  .el-progress--line {
    width: 85%;
  }

  /* 解决概率进度条字体大小 */
  .el-progress-bar__innerText {
    font-size: 15px;
  }

  /* 隐藏 el-scrollbar 滚动条 */
  .el-scrollbar__bar {
    display: none;
  }

  /* el-timeline 每一项上下、左右边距 */
  .el-timeline-item {
    margin: 0 6px;
  }
}

.main-content {
  margin: 20px 20px 0 !important;
}
</style>
