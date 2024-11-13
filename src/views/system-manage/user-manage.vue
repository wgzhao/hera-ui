<template>
  <div>
    <pure-table :data="users" :columns="columns" row-key="name" stripe border style="width: 100%" auto>
      <template #status="{ row, index }">
        <el-tag type="success" size="small" v-if="row.isEffective == 1">通过</el-tag>
        <el-tag type="danger" size="small" v-else>未审核</el-tag>
      </template>
      <template #operation>
        <el-button type="success" size="small">审核通过</el-button>
        <el-button type="warning" size="small">审核拒绝</el-button>
        <el-button type="danger" size="small">删除</el-button>
      </template>
    </pure-table>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getAllUser } from "@/api/user";
const users = ref([]);
const columns = [ //表头
  { prop: 'name', label: '用户', align: 'center' }
  , { prop: 'email', label: '邮箱', align: 'center', width: 180 }
  , { prop: 'phone', label: '手机号', align: 'center', width: 115 }
  , { prop: 'isEffective', label: '审核状态', align: 'center', width: 90, slot: "status" }
  , { prop: 'createTime', label: '申请时间', align: 'center', width: 170 }
  , { prop: 'opTime', label: '更新时间', align: 'center', width: 170 }
  , { prop: 'right', label: '操作', align: 'center', slot: 'operation' }
];
onMounted(() => {
  getAllUser()
    .then(data => users.value = data.data)
})
</script>
