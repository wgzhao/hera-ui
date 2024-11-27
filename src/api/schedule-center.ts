import { http } from "@/utils/http";

export enum JobRunTypeEnum  {
  Shell = "shell",
  Hive = "hive",
  Impala = "impala"
};

export type Processor = {
  jobId: string;
  config: Map<string, string>;
};

export type HeraJob = {
  id: number;
  auto: String;
  configs: Map<String, String>;
  cronExpression: String;
  cycle: String;
  dependencies: String;
  description: String;
  gmtCreate: Date;
  gmtModified: Date;
  groupId: number;
  historyId: String;
  host: String;
  lastEndTime: Date;
  lastResult: String;
  name: String;
  offset: String;
  owner: String;
  postProcessors: Array<Processor>;
  preProcessors: Array<Processor>;
  readyDependency: String;
  resources: Array<Map<String, String>>;
  runType: JobRunTypeEnum;
  scheduleType: number;
  script: String;
  startTime: Date;
  startTimestamp: number;
  statisticEndTime: Date;
  statisticStartTime: Date;
  status: String;
  timezone: String;
  hostGroupId: number;
  hostGroupName: String;
  mustEndMinute: number;
  rollBackTimes: String;
  rollBackWaitTime: String;
  runPriorityLevel: String;
  selfConfigs: String;
  resource: String;
  inheritConfig: Map<String, String>;
  focus: boolean;
  uIdS: String;
  areaId: String;
  focusUser: String;
  repeatRun: number;
};

export type  HeraJobTree = {
  id: String;
  parent: String;
  name: String;
  directory: number;
  jobName: String;
  jobId: number;
  jobDescription: String;
  owner: String;
  dependence: String;
  isParent: boolean;
};


export const initJobTree = () => {
  return http.request<Map<String, Array<HeraJobTree>>("post", "/scheduleCenter/init")
}

export const getJobMessage = (jobId: number) => {
  return http.request("get", `/scheduleCenter/getJobMessage?jobId=${jobId}`);
}

export const getJobOperators = (jobId: number) => {
  return http.request("get", `/scheduleCenter/getJobOperator?jobId${jobId}&type=false`)
}