<script setup lang="ts">
import { ref, onMounted } from "vue";
import {
  getJobRunTimeTop10,
  getAllJobStatus,
  getAllJobStatusDetail,
  getUserJobInfo
} from "@/api/dashboard";
import type { TopJob, TopJobResult, JobSummary } from "@/api/dashboard";
import ReCol from "@/components/ReCol";
defineOptions({
  name: "Welcome"
});

const result = ref([]);

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
</template>
<style scoped>
:global(h2#card-usage ~ .example .example-showcase) {
  background-color: var(--el-fill-color) !important;
}

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
