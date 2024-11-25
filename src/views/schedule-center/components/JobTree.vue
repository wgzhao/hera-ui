<script setup lang="ts">
import { ref } from "vue";
import { ElTree } from "element-plus";
import { scheduleJob } from "./_data";
interface Tree {
  label: string;
  children?: Tree[];
}

defineOptions({
  name: "JobTree"
});

const operateType = defineModel();

const defaultProps = {
  children: "children",
  label: "label"
};
const zNodes = ref({});

const treeRef = ref<InstanceType<typeof ElTree>>();

function handleNodeClick(data: Tree) {
  if (data.children?.length == 0) {
    // click leaf node
    operateType.value = "jobOperate";
    const jobId = parseInt(data.label.split("(")[1].slice(0, -1));
    $emit(updateForm, jobId);
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
</script>

<template>
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
      :props="defaultProps"
      :filter-node-method="filterNode"
      :expand-on-click-node="false"
      @node-click="handleNodeClick"
    />
  </div>
</template>

<style lang="scss" scoped></style>
