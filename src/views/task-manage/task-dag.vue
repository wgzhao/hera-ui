<template>
  <div class="mx-1">
    <el-row :gutter="10" class="row-bg flex-auto" justify="start">
      <el-col :span="1"><el-text type="info">任务ID </el-text></el-col>
      <el-col :span="4"><el-input v-model="jobId" style="width: 200px" placholder="jobId" /></el-col>
      <el-col :span="2"><el-button type="primary" @click="getJobDeps(0)">上游任务链</el-button></el-col>
      <el-col :span="2"><el-button type="primary" @click="getJobDeps(1)">下游任务链</el-button></el-col>
      <el-col :span="2"><el-button type="primary" @click="">全部</el-button></el-col>
    </el-row>
    <!-- dependencies display -->
    <div class="graph-card" style="min-width: 600px">
      <JobDepsGraph :data="jobDeps" v-if="showDeps" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { type JobGraphNode, getJobDependencies } from '@/api/task-manage'
import JobDepsGraph from './components/charts/JobDepsGraph.vue';

const jobId = ref(1565);

const showDeps = ref(false)
const jobDeps = ref({});

function getJobDeps(depType: number) {
  getJobDependencies(jobId.value, depType).then(res => {
    jobDeps.value = {...res};
    showDeps.value = true;
  })
}
</script>
