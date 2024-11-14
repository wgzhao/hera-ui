import { http } from "@/utils/http";

export type TopJob = {
  jobId: string;
  actionId: string;
  jobTime: number;
  yesterdayTime: number;
  jobName: string;
};

export type TopJobResult = {
  success: boolean;
  message: string;
  data: Array<TopJob>;
};

export type JobSummary = {
  name: string;
  count: number;
  link: string;
};

export type AllJobStatusDetailResult = BaseResult<{
  xAxis: Array<string>;
  runSuccess: Array<Map<string, any>>;
  runFailed: Array<Map<string, any>>;
}>;

export const getJobRunTimeTop10 = () => {
  return http.request<TopJobResult>("get", "/homePage/findJobRunTimeTop10");
};

export const getAllJobStatus = () => {
  return http.request<any>("get", "/homePage/findAllJobStatus");
};

export const getAllJobStatusDetail = () => {
  return http.get("/homePage/findAllJobStatusDetail");
};

export const getUserJobInfo = (owner: string) => {
  return http.request<any>("get", "/homePage/getUserJobInfo", {
    owner: owner
  });
};
