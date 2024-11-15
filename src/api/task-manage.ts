import { http } from "@/utils/http"

/**
{
    "runTime": null,
    "jobId": "362",
    "actionId": null,
    "startTime": "2024-11-15 15:07:27",
    "endTime": null,
    "executeHost": "188.166.1.83",
    "status": "running",
    "operator": "wangq",
    "description": "实时-分渠道新增注册统计",
    "dependencies": "757",
    "type": "依赖调度",
    "jobName": "t_channel_new_login_cnt",
    "times": 22
}
*/
export type HistoryTask = {
  runTime: string | null;
  jobId: string;
  actionId: string | null;
  startTime: string;
  endTime: string | null;
  executeHost: string;
  status: string;
  operator: string;
  description: string;
  dependencies: string;
  type: string;
  jobName: string;
  times: number;
};

type taskResults = {
  message: string,
  success: boolean,
  data: Array<HistoryTask>
};

export const getAllTasks = (params?: map<any>) => {
  // status=all&dt=2024-11-15&operator=&_=1731654456641
  // current date
  return http.request<taskResults>("get", "findJobHistoryByStatus", {params})
}
