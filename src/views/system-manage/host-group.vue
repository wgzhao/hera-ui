<template>
  <div>
    <pure-table :data="groups" :columns="columns" row-key="id" stripe border style="width: 100%" auto>
      <template #status="{ row, index }">
        <el-tag type="success" size="small" v-if="row.effective == 1">有效</el-tag>
        <el-tag type="danger" size="small" v-else>无效</el-tag>
      </template>
      <template #operation="{ row, index }">
        <el-button type="primary" size="small" @click="editGroup(index)">编辑</el-button>
        <el-button type="danger" size="small" @click="deleteGroup(index)">删除</el-button>
      </template>
    </pure-table>
  </div>
  <PlusDialogForm :visible="showForm" v-model="current" :form="{ columns, rules }" @confirm="handleSubmit"
    @submit-error="handleSubmitError" @cancel="handleReset" />
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import _ from 'lodash';
import { PlusDialogForm } from "plus-pro-components";
import type { FieldValues, PlusColumn } from "plus-pro-components";
import { getAllHostGroup, updateHostGroup, type HostGroup } from "@/api/host-group.ts";
const groups = ref<HostGroup>([]);
const current = ref<FieldValues>({});
const showForm = ref<boolean>(false);

const columns = ref([
  { prop: "id", label: "ID", align: "center" }
  , {
    prop: 'name', label: '名称', align: 'center'
  }
  , { prop: 'effective', label: '状态', align: 'center', slot: "status" }
  , { prop: 'description', label: '描述', align: 'center' }
  , { fixed: 'right', label: '操作', align: 'center', slot: 'operation' }
]);

const rules = {
  name: [
    {
      required: true,
      message: '请输入名称'
    }
  ],
  effective: [
    {
      required: true,
      message: '请选择状态'
    }
  ]
};


const editGroup = (idx: number) => {
  current.value = _.cloneDeep(groups.value[idx]);
  showForm.value = true;
}

const deleteGroup = (idx: number) => {
  console.log("delete = ", idx);
};

const handleSubmit = (values: FieldValues) => {
  console.log("updated data = ", values);
  updateHostGroup(values).then(res => {
    console.log(res, 'res')
  })
    .catch(err => {
      console.log(err, 'err')
    })
  showForm.value = false;
}
const handleSubmitError = (err: any) => {
  console.log(err, 'err')
  showForm.value = false;
}
const handleReset = () => {
  current.value = {};
  console.log('handleReset')
}

onMounted(() => {
  getAllHostGroup()
    .then(res => groups.value = res.data)
})
</script>
