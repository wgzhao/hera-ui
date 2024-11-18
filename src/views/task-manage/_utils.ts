import type { PaginationProps } from "@pureadmin/table";
import { ref } from "vue";

export const pagination = ref<PaginationProps>({
  pageSize: 10,
  currentPage: 1,
  total: 0,
  align: "right",
  background: false,
  size: "default"
});

export const TriggerTypeList = ["", "自动调度", "手动触发", "手动恢复"];

export const taskStatus = [
  { value: "all", text: "全部" },
  { value: "failed", text: "失败" },
  { value: "success", text: "成功" },
  { value: "running", text: "运行中" },
  { value: "wait", text: "等待" }
];
