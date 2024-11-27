<script setup lang="ts">
const { operateMode = "groupOperate" } = defineProps<{
  operateMode: string;
}>();
</script>

<template>
  <div>
    <el-row :gutter="5" v-if="operateMode == 'groupOperate'">
      <el-col :span="3">
        <el-button type="primary" id="showAllBtn"> 任务总览 </el-button>
      </el-col>

      <el-col :span="3">
        <el-button type="primary" name="showRunning"> 正在运行 </el-button>
      </el-col>

      <el-col :span="3">
        <el-button type="primary" name="showFaild"> 失败记录 </el-button>
      </el-col>

      <el-col :span="3">
        <el-button type="primary" name="addGroup"> 添加组 </el-button>
      </el-col>

      <el-col :span="3">
        <el-button type="primary" name="edit"> 编辑 </el-button>
      </el-col>

      <el-col :span="3">
        <el-button type="primary" name="addJob"> 添加任务 </el-button>
      </el-col>

      <el-col :span="3">
        <el-button type="primary" name="delete"> 删除 </el-button>
      </el-col>

      <el-col :span="3">
        <el-button type="primary" name="addAdmin"> 配置管理员 </el-button>
      </el-col>
    </el-row>

    <el-row :gutter="1" v-else-if="operateMode == 'jobOperate'">
      <el-col :span="1 / 2">
        <el-button type="primary" name="runningLog"> 运行日志 </el-button>
      </el-col>

      <el-col :span="1 / 2">
        <el-button type="primary" name="version">版本生成 </el-button>
      </el-col>
      <el-col :span="1 / 2">
        <el-button type="primary" name="jobDag" data-toggle="modal"
          >依赖图
        </el-button>
      </el-col>
      <el-col :span="1 / 2">
        <el-button type="primary" name="lineageDag" data-toggle="modal"
          >血缘图
        </el-button>
      </el-col>
      <el-col :span="1 / 2">
        <el-button type="primary" data-toggle="modal"> 手动执行 </el-button>
      </el-col>
      <el-col :span="1 / 2">
        <el-button type="primary"> 手动恢复 </el-button>
      </el-col>
      <el-col :span="1 / 2">
        <el-button type="primary"> 恢复下游 </el-button>
      </el-col>

      <el-col :span="1 / 2">
        <el-button type="primary" name="switch"> 开启/关闭 </el-button>
      </el-col>
      <el-col :span="1 / 2">
        <el-button type="primary" name="invalid"> 失效 </el-button>
      </el-col>
      <el-col :span="1 / 2">
        <el-button type="primary" name="delete">删除 </el-button>
      </el-col>
      <el-col :span="1 / 2">
        <el-button type="primary" name="addAdmin"> 配置管理员 </el-button>
      </el-col>
      <el-col :span="1 / 2">
        <el-button type="primary" name="monitor"> 关注该任务 </el-button>
      </el-col>

      <el-col :span="1 / 2">
        <el-button type="primary" name="AddMonitor"> 配置关注者 </el-button>
      </el-col>
    </el-row>
    <el-row :gutter="5" v-else-if="operateMode == 'editOperator'">
      <el-col :span="3">
        <el-button type="primary" name="back">返回 </el-button>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" name="upload"> 上传资源文件 </el-button>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" name="editUploadFile">
          编辑资源文件
        </el-button>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" name="save">保存 </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped></style>
