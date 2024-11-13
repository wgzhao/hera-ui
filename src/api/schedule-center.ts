import { http } from "@/utils/http";

export enum JobRunTypeEnum = {
  Shell = "shell",
  Hive = "hive",
  Impala = "impala"
}；

export type Processor = {
  jobId: string;
  config: Map<string, string>;
}；

export type HeraJob = {
  id: int;
  auto: String;
  configs: Map<String, String>;
  cronExpression: String;
  cycle: String;
  dependencies: String;
  description: String;
  gmtCreate: Date;
  gmtModified: Date;
  groupId: Integer;
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
  scheduleType: Integer;
  script: String;
  startTime: Date;
  startTimestamp: Long;
  statisticEndTime: Date;
  statisticStartTime: Date;
  status: String;
  timezone: String;
  hostGroupId: int;
  hostGroupName: String;
  mustEndMinute: Long;
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
  repeatRun: short;
};

export type  HeraJobTree = {
  id: String;
  parent: String;
  name: String;
  directory: Integer;
  jobName: String;
  jobId: Integer;
  jobDescription: String;
  owner: String;
  dependence: String;
  isParent: boolean;
};


export const initJobTree = () => {
  return http.request<Map<String, Array<HeraJobTree>>("post", "/scheduleCenter/init")
}
