<template>
  <div>
    <pure-table :data="tableDate" :columns="columns" row-key="id" stripe border auto>
      <!-- <template #group="{ row, index }">
        <span>{{ hostGroupList[row.hostGroupId] }}</span>
      </template> -->
      <template #operation="{ row, index }">
        <el-button type="primary" size="small" @click="editWorker(row)">编辑</el-button>
        <el-button type="danger" size="small" @click="deleteWorker(row.id)">删除</el-button>
      </template>
    </pure-table>
    <el-pagination layout="prev, pager, next, total, sizes" :page-sizes="[5, 10, 15, 20, 25, 30, 50]" :total="total"
      @current-change="handleCurrentChange" @size-change="handleSizeChange" :hide-on-single-page="false" />
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { getAllWorkInfo, type WorkInfo } from "@/api/worker";
import { getAllHostGroup, type HostGroup } from "@/api/host-group";

const hostGroupMap = ref({});
const workerList = ref<WorkInfo[]>();
const total = ref(0)
const columns = [ //表头
  { prop: 'id', label: '序号', fixed: 'left', align: 'center' }
  , { prop: 'host', label: 'ip地址', align: 'center' }
  , {
    prop: 'hostGroupId', label: '机器组', align: 'center', formatter: (row: any) => {
      return hostGroupMap.value[row.hostGroupId];
    }
  }
  , { fixed: 'right', label: '操作', align: 'center', slot: 'operation' }
];

const state = ref({
  page: 1,
  limit: 10,
  total: total
});

const editWorker = (row: WorkInfo) => {
  console.log(row);
}
const deleteWorker = (id: number) => {
  console.log(id);
}

const handleCurrentChange = (val: number) => {
  state.value.page = val;
};

const handleSizeChange = (val: number) => {
  state.value.limit = val;
}

const tableDate = computed(() => {
  return workerList.value.filter((item: any, index: number) =>
    index < state.value.page * state.value.limit && index >= (state.value.page - 1) * state.value.limit
  );
});

onMounted(async () => {
  getAllWorkInfo().then(res => {
    workerList.value = res.data;
    total.value = res.count;
  });

  getAllHostGroup().then(res => {
    hostGroupMap.value = res.data.reduce((map, group) => {
      map[group.id] = group.name;
      return map;
    }, {} as { [key: number]: string });
  });
});
</script>
