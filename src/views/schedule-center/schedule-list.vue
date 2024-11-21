<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="360px">
        <div class="flex flex-col items-start gap-4">
          <el-segmented
            v-model="schduleSelect"
            :options="scheduleOptions"
            size="default"
          />
        </div>
        <el-row class="mt-2">
          <el-col :span="24">
            <el-input
              v-model="search"
              placeholder="请输入关键词(空格分割,回车搜索)"
              @keyup.enter="searchNode"
            />
          </el-col>
        </el-row>
        <div>
          <el-tree
            ref="treeRef"
            class="filter-tree"
            style="max-width: 600px"
            :data="scheduleJob"
            :props="defaultProps"
            :filter-node-method="filterNode"
            :expand-on-click-node="false"
            @node-click="handleNodeClick"
          />
        </div>
      </el-aside>
      <el-main>
        <div class="mb-2">
          <OperateButton />
        </div>
        <div>
          <PlusForm
            v-model="form"
            v-if="enableEdit"
            :hasFooter="false"
            :group="columns"
            :row-props="{ gutter: 10 }"
            :col-props="{ span: 8 }"
            :size="small"
            :labelWidth="100"
          >
            <template #plus-field-script>
              <codemirror
                v-model="form.script"
                :tabSize="2"
                :extensions="extensions"
              />
            </template>
            <template #plus-field-inheritConfig>
              <ul>
                <li v-for="(k, v) in form.inheritConfig">
                  <code> {{ k }}={{ v }}</code>
                </li>
              </ul>
            </template>
          </PlusForm>
          <JobInfoShow :data="form" jobType="dep" v-if="!enableEdit" />
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
import { scheduleJob } from "./_data";
import { depColumn, cronColumn } from "./_heraJobColumn";
import JobInfoShow from "./components/JobInfoShow.vue";
import OperateButton from "./components/OperateButton.vue";
interface Tree {
  label: string;
  children?: Tree[];
}

const scheduleOptions = ["我的调度", "全部调度"];
const schduleSelect = ref("我的调度");
const jobType = ref("dep");
const operateType = ref();
const enableEdit = ref(false);
const search = ref("");

const defaultProps = {
  children: "children",
  label: "label"
};

const form = ref<FieldValues>({});

const zNodes = ref({});

const treeRef = ref<InstanceType<typeof ElTree>>();

const extensions = [sql()];

function filterNode(value: string, data: Tree) {
  if (!value) return true;
  return data.label.includes(value);
}

function searchNode() {
  //filterNode(search.value, scheduleJob);
  treeRef.value!.filter(search.value);
}
// watch(search, val => {
//   treeRef.value!.filter(val);
// });

const columns = computed(() => {
  if (jobType == "dep") {
    return depColumn;
  } else {
    return cronColumn;
  }
});

function handleNodeClick(data: Tree) {
  if (data.children?.length == 0) {
    // click leaf node
    operateType.value = "jobOperate";
    const jobId = parseInt(data.label.split("(")[1].slice(0, -1));
    getJobMessage(jobId).then(res => {
      form.value = res;
      if (res.scheduleType == 0) {
        jobType.value = "cron";
      } else {
        jobType.value = "dep";
      }
    });
    console.log(form.value);
  } else {
    // click inner node
    operateType.value = "groupOperate";
  }
}
onMounted(() => {
  // initJobTree().then(res => {
  //   zNodes.value = res.data;
  // })
});
</script>
