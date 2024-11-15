<template>
  <div>
    <pure-table :data="workerList" :columns="columns" row-key="id" stripe border style="width: 100%" auto>
      <!-- <template #group="{ row, index }">
        <span>{{ hostGroupList[row.hostGroupId] }}</span>
      </template> -->
      <template #operation="{ row, index }">
        <el-button type="primary" size="small" @click="editWorker(row)">编辑</el-button>
        <el-button type="danger" size="small" @click="deleteWorker(row.id)">删除</el-button>
      </template>
    </pure-table>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getAllWorkInfo, type WorkInfo } from "@/api/worker";
import { getAllHostGroup, type HostGroup } from "@/api/host-group";

const hostGroupMap = ref({});
const workerList = ref<WorkInfo[]>();
const count = ref(0)
const columns = [ //表头
  { prop: 'id', label: '序号', fixed: 'left', align: 'center' }
  , { prop: 'host', label: 'ip地址', align: 'center' }
  , {
    prop: 'hostGroupId', label: '机器组', align: 'center', formatter: (row: any) => {
      return hostGroupMap.value[row.hostGroupId];
    }
  }
  , { fixed: 'right', label: '操作', align: 'center', slot: 'operation' }
]

const editWorker = (row: WorkInfo) => {
  console.log(row);
}
const deleteWorker = (id: number) => {
  console.log(id);
}

onMounted(async () => {
  getAllWorkInfo().then(res => {
    workerList.value = res.data;
    count.value = res.count;
  });

  getAllHostGroup().then(res => {
    hostGroupMap.value = res.data.reduce((map, group) => {
        map[group.id] = group.name;
        return map;
    }, {} as { [key: number]: string });
  });
});
</script>
