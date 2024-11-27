<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="360px">
        <div>
          <el-row class="mt-2">
            <el-col :span="24">
              <el-input
                v-model="search"
                placeholder="请输入关键词(空格分割,回车搜索)"
                @keyup.enter="searchNode"
              />
            </el-col>
          </el-row>
          <el-tree
            ref="treeRef"
            class="filter-tree"
            style="max-width: 600px"
            :data="scheduleJob"
            :filter-node-method="filterNode"
            :expand-on-click-node="false"
            @node-click="handleNodeClick"
          />
        </div>
      </el-aside>
      <el-main>
        <div class="mb-2">
          <OperateButton :operateMode="operateType" :enableEdit="enableEdit" />
        </div>
        <div>
          <el-card title="基本信息">
            <PlusForm
              v-model="form"
              :hasFooter="false"
              :group="columns"
              :row-props="{ gutter: 10 }"
              :col-props="{ span: 8 }"
              :labelWidth="100"
              @submit="handleSubmit"
              @submit-error="handleSubmitError"
              @reset="handleReset"
            >
              <template #plus-field-focusUser>
                <el-select v-model="form.focusUser" multiple>
                  <el-option
                    v-for="item in allUsers"
                    :key="item.name"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </template>
            </PlusForm>
          </el-card>
          <el-card title="配置项信息">
            <el-row :gutter="10">
              <el-col :span="12">
                <h3 clas="mb-2">配置项信息</h3>
                <ul>
                  <li v-for="(v, k) in form.selfConfigs">
                    <code>{{ k }} = {{ v }}</code>
                  </li>
                </ul>
              </el-col>
              <el-col :span="12">
                <h3 class="mb-2">继承的配置项信息</h3>
                <ul>
                  <li v-for="(v, k) in form.inheritConfig">
                    <code>{{ k }} = {{ v }}</code>
                  </li>
                </ul>
              </el-col>
            </el-row>
          </el-card>
          <el-card>
            <template #header>
              <div class="card-header flex-auto">
                <el-space :size="20">
                  <h3>脚本</h3>
                  <el-button justify="end" type="primary">预览</el-button>
                </el-space>
              </div>
            </template>
            <codemirror
              v-model="form.script"
              :tabSize="2"
              :extensions="extensions"
            />
          </el-card>
          <!-- <JobInfoShow :data="form" jobType="dep" v-if="!enableEdit" /> -->
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue";
import { ElTree } from "element-plus";
import type { PlusColumn, FieldValues } from "plus-pro-components";
import { Codemirror } from "vue-codemirror";
import { useDark } from "@pureadmin/utils";
import { sql } from "@codemirror/lang-sql";
import { initJobTree, getJobMessage } from "@/api/schedule-center";
import type { HeraJob } from "@/api/schedule-center";

import { depColumn, cronColumn } from "./_heraJobColumn";
import OperateButton from "./components/OperateButton.vue";
import { scheduleJob } from "./_data";
import { getAllUser } from "@/api/user";

const allUsers = ref([]);

interface Tree {
  label: string;
  children?: Tree[];
}

// const scheduleOptions = ["我的调度", "全部调度"];
// const schduleSelect = ref("我的调度");
const jobType = ref("dep");
const operateType = ref();
const search = ref("");
const jobId = ref(1);
const enableEdit = ref(false);

const form = ref<FieldValues>({});

const extensions = [sql()];

const columns = computed(() => {
  if (jobType == "dep") {
    return depColumn;
  } else {
    return cronColumn;
  }
});

const treeRef = ref<InstanceType<typeof ElTree>>();

function convertStrtoArray(str: string) {
  // the str like "[ one, two three ]"
  // should convert into ["one", "two", "three"]
  if (str == null || str == "") {
    return [];
  }
  return str
    .slice(1, -1)
    .split(",")
    .map(item => item.trim());
}
function handleNodeClick(data: Tree) {
  if (data.children == undefined || data.children.length == 0) {
    // click leaf node
    operateType.value = "jobOperate";
    jobId.value = parseInt(data.label.split("(")[1].slice(0, -1));

    getJobMessage(jobId.value).then(res => {
      form.value = res;
      // convert focusUser to array
      form.value.focusUser = convertStrtoArray(res.focusUser);
      if (res.scheduleType == 0) {
        jobType.value = "cron";
      } else {
        jobType.value = "dep";
      }
    });
  } else {
    // click inner node
    operateType.value = "groupOperate";
  }
}

function filterNode(value: string, data: Tree) {
  if (!value) return true;
  return data.label.includes(value);
}

function searchNode() {
  //filterNode(search.value, scheduleJob);
  treeRef.value!.filter(search.value);
}

const handleSubmit = (values: FieldValues) => {
  console.log(values, "Submit");
};
const handleSubmitError = (err: any) => {
  console.log(err, "err");
};
const handleReset = () => {
  console.log("handleReset");
};

onMounted(() => {
  getAllUser().then(res => {
    res.data.forEach(item => {
      allUsers.value.push({ value: item.name, label: item.name });
    });
  });
});
</script>
