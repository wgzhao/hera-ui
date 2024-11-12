import { http } from "@/utils/http";
export type Task = {
  id: string;
  user: string;
  name: string;
  queue: string;
  state: string;
  finalStatus: string;
  progress: string;
  trackingUI: string;
  trackingUrl: string;
  diagnostics: string;
  clusterId: string;
  applicationType: string;
  applicationTags: string;
  startedTime: string;
  finishedTime: string;
  elapsedTime: string;
  amContainerLogs: string;
  amHostHttpAddress: string;
  allocatedMB: string;
  allocatedVCores: string;
  reservedMB: string;
  reservedVCores: string;
  runningContainers: string;
  memorySeconds: string;
  vcoreSeconds: string;
  preemptedResourceMB: string;
  preemptedResourceVCores: string;
  numNonAMContainerPreempted: string;
  numAMContainerPreempted: string;
  logAggregationStatus: string;
  spendTime: string;
};
export type RtTaskResult = {
  success: boolean;
  data: Array<Task>;
};
export function getRealtimeTasks(params?: object) {
  params = params || {};
  params["taskSv"] = "0";
  params["ateVal"] = "";
  params["userVal"] = "";
  params["page"] = params["page"] || 1;
  params["limit"] = params["limit"] || 10;
  return http.request<RtTaskResult>(
    "get",
    "/hera/offlineTaskMonitoring/taskInfo",
    {
      params
    }
  );
}
