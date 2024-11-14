<script setup lang="ts">
import { ref, onMounted } from "vue";
import {
  getJobRunTimeTop10,
  getAllJobStatusDetail,
  getUserJobInfo
} from "@/api/dashboard";
import type {
  TopJob,
  TopJobResult,
  JobSummary,
  AllJobStatusDetailResult
} from "@/api/dashboard";
import ReCol from "@/components/ReCol";
import { Last7DayChartLine, Top10RunJob } from "./components/charts";
import Segmented, { type OptionsType } from "@/components/ReSegmented";
import { useDark } from "@pureadmin/utils";
defineOptions({
  name: "Welcome"
});

const result = ref([]);
const top10RunJobs = ref([]);

const successJobs = ref<number[]>([]);
const failedJobs = ref<number[]>();
const dayRange = ref<string[]>([]);

const isLoading = ref(true);
const { isDark } = useDark();

function fetchData() {
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
  getAllJobStatusDetail().then(res => {
    successJobs.value = res.data.runSuccess.map(item => item.num);
    failedJobs.value = res.data.runFailed.map(item => item.num);
    dayRange.value = res.data.xAxis;
  });
  getJobRunTimeTop10().then(res => (top10RunJobs.value = res.data));
  isLoading.value = false;
}

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div>
    <div class="bottom-10">数据监测</div>
    <el-row :gutter="24" justify="space-around">
      <re-col
        v-for="(item, index) in result"
        :key="index"
        v-motion
        class="mb-[18px]"
        :value="6"
        :md="12"
        :sm="12"
        :xs="24"
      >
        <el-card class="line-card" shadow="never">
          <div class="flex justify-between">
            <span class="text-md font-medium">
              {{ item.name }}
            </span>
          </div>

          <div class="flex justify-between items-start mt-3">
            <div class="w-1/2">
              <p class="font-medium text-green-500">{{ item.count }}</p>
            </div>
          </div>
        </el-card>
      </re-col>

      <re-col class="mb-[18px]" :value="12" :xs="12">
        <el-card class="line-card" shadow="never">
          <div class="flex justify-between">
            <span class="text-md font-medium">任务执行情况</span>
          </div>
          <div v-if="isLoading">Loading...</div>
          <div v-else class="flex justify-between items-start mt-3">
            <Last7DayChartLine
              :dayRange="dayRange"
              :successJobCount="successJobs"
              :failedJobCount="failedJobs"
            />
          </div>
        </el-card>
      </re-col>

      <re-col class="mb-[18px]" :value="12" :xs="24">
        <el-card class="bar-card" shadow="never">
          <template #header>
            <div class="card-header">
              <span>任务耗时 Top 10</span>
            </div>
          </template>
          <div class="flex justify-between items-start mt-3">
            <Top10RunJob
              :jobNames="
                top10RunJobs.map(item => item.jobId + '(' + item.jobName + ')')
              "
              :currDayJobTimes="top10RunJobs.map(item => item.jobTime)"
              :lastDayJobTimes="top10RunJobs.map(item => item.yesterdayTime)"
            />
          </div>
        </el-card>
      </re-col>
    </el-row>
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
