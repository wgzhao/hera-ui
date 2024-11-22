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
        <JobTree />
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

import type { PlusColumn, FieldValues } from "plus-pro-components";
import { Codemirror } from "vue-codemirror";
import { useDark } from "@pureadmin/utils";
import { sql } from "@codemirror/lang-sql";
import { initJobTree, getJobMessage } from "@/api/schedule-center";
import type { HeraJob } from "@/api/schedule-center";

import { depColumn, cronColumn } from "./_heraJobColumn";
import JobInfoShow from "./components/JobInfoShow.vue";
import OperateButton from "./components/OperateButton.vue";
import JobTree from "./components/JobTree.vue";

const scheduleOptions = ["我的调度", "全部调度"];
const schduleSelect = ref("我的调度");
const jobType = ref("dep");
const operateType = ref();
const enableEdit = ref(false);
const search = ref("");

const form = ref<FieldValues>({});

const extensions = [sql()];

const columns = computed(() => {
  if (jobType == "dep") {
    return depColumn;
  } else {
    return cronColumn;
  }
});

onMounted(() => {
  // initJobTree().then(res => {
  //   zNodes.value = res.data;
  // })
});
</script>
