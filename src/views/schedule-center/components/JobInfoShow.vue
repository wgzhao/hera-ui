<script setup lang="ts">
import { computed } from "vue";
import { depColumn, cronColumn } from "../_heraJobColumn.ts";

const { data, jobType = "dep" } = defineProps(["data", "jobType"]);
defineOptions({
  name: "JobInfoShow"
});

const columns = computed(() => {
  if (jobType == "dep") {
    return depColumn;
  } else {
    return cronColumn;
  }
});
</script>

<template>
  <div>
    <el-row :gutter="10">
      <template v-for="col in columns[0].columns">
        <el-col :span="2"
          ><span class="text-right text-sm font-medium text-gray-500"
            >{{ col.label }}:</span
          ></el-col
        >
        <el-col :span="6">
          <el-text>{{ data[col.prop] }}</el-text></el-col
        >
      </template>
    </el-row>
  </div>
</template>

<style lang="scss" scoped></style>
