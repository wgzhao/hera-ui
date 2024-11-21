<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="400px">
        <div class="flex flex-col items-start gap-4">
          <el-segmented v-model="schduleSelect" :options="scheduleOptions" size="default" />
        </div>
        <el-row class="mt-2">
          <el-col :span="24">
            <el-input v-model="search" placeholder="请输入关键词(空格分割,回车搜索)" />
          </el-col>
        </el-row>
        <div>
          <p id="searchInfo" style="display: none">查找中，请稍候...</p>
          <el-tree ref="treeRef" class="filter-tree" style="max-width: 600px" :data="scheduleJob" :props="defaultProps"
            :filter-node-method="filterNode" @node-click="handleNodeClick" />
        </div>
      </el-aside>
      <el-main>
        <el-card>
          <template #header>
            <div class="card-header">
              <h3 class="text-center">基本信息</h3>
            </div>
          </template>
          <el-form :model="form" label-width="auto" v-if="form.id">
            <el-row>
              <el-col :span="8">
                <el-form-item label="任务id:">
                  <el-input v-model="form.id"></el-input> </el-form-item></el-col>
              <el-col :span="8">
                <el-form-item label="调度类型:">
                  <el-input v-model="form.scheduleType" :formatter="value => scheduleTypeOptions[value]"></el-input>
                </el-form-item></el-col>
              <el-col :span="8">
                <el-form-item label="所有人:">
                  <el-input v-model="form.owner"></el-input> </el-form-item></el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="名称:">
                  <el-input v-model="form.name"></el-input> </el-form-item></el-col>
              <el-col :span="8">
                <el-form-item label="依赖任务:" v-if="form.scheduleType == 1">
                  <el-input v-model="form.dependencies"></el-input>
                </el-form-item>
                <el-form-item label="定时表达式" v-else>
                  <el-input v-model="form.cronExpression"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="关注人员:">
                  <el-input v-model="form.focusUser"></el-input> </el-form-item></el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="任务类型:">
                  <el-input v-model="form.runType"></el-input> </el-form-item></el-col>
              <el-col :span="8">
                <el-form-item label="依赖周期:" v-if="form.scheduleType == 1">
                  <el-input v-model="form.heraDependencyCycle"></el-input>
                </el-form-item>
                <el-form-item label="重试次数:" v-else>
                  <el-input v-model="form.configs['roll.back.times']"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="管理员:">
                  <el-input v-model="form.uidS"></el-input> </el-form-item></el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="自动调度:">
                  <el-switch v-model="form.auto" active-value="开启" inactive-value="1"></el-switch>
                </el-form-item></el-col>
              <el-col :span="8"><el-form-item label="重试次数:" v-if="form.schduleType == 0">
                  <el-input v-model="form.configs['roll.back.times']"></el-input> </el-form-item></el-col>
              <el-col :span="8">
                <el-form-item label="重复执行:">
                  <el-switch v-model="form.repeatRun"></el-switch> </el-form-item></el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="任务优先级:">
                  <el-input v-model="form.configs['run.priority.level']"></el-input> </el-form-item></el-col>
              <el-col :span="8">
                <el-form-item label="重试间隔:">
                  <el-input v-model="form.configs['roll.back.wait.time']"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="机器组:">
                  <el-input v-model="form.hostGroupName"></el-input> </el-form-item></el-col>
            </el-row>

            <el-row>
              <el-col :span="16">
                <el-form-item label="描述:">
                  <el-input v-model="form.description"></el-input> </el-form-item></el-col>
              <el-col :span="8">
                <el-form-item label="预计时长:">
                  <!-- <el-input v-model="form.estimatedTime"></el-input> -->
                </el-form-item></el-col>
            </el-row>

            <el-row>
              <el-col :span="24">
                <!-- <el-input v-model="form.script" autosize type="area" /> -->
                <codemirror v-model="form.script" :tabSize="2" :extensions="extensions" />
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { ElTree } from "element-plus";
import type { PlusColumn, FieldValues } from 'plus-pro-components'
import { Codemirror } from "vue-codemirror";
import { useDark } from "@pureadmin/utils";
import { sql } from "@codemirror/lang-sql";
import { initJobTree, getJobMessage } from "@/api/schedule-center";
import type { HeraJob } from "@/api/schedule-center";
import { scheduleJob } from "./_data";


interface Tree {
  label: string;
  children?: Tree[];
}

const scheduleOptions = ["我的调度", "全部调度"];
const scheduleTypeOptions = ["定时调度", "依赖调度"];
const schduleSelect = ref("我的调度");
const search = ref("");

const defaultProps = {
  children: "children",
  label: "label"
};

const form = ref<FieldValues>({});

const zNodes = ref({});

const treeRef = ref<InstanceType<typeof ElTree>>();

const { isDark } = useDark();

const extensions = [sql()];
function filterNode(value: string, data: Tree) {
  if (!value) return true;
  return data.label.includes(value);
}
watch(search, val => {
  treeRef.value!.filter(val);
});

function handleNodeClick(data: Tree) {
  if (data.children?.length == 0) {
    const jobId = parseInt(data.label.split("(")[1].slice(0, -1));
    getJobMessage(jobId).then(res => {
      form.value = res;
    });
    console.log(form.value);
  }
}
onMounted(() => {
  // initJobTree().then(res => {
  //   zNodes.value = res.data;
  // })
});
</script>
