import { http } from "@/utils/http";
import { useUserStoreHook } from "@/store/modules/user";

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

export const getUserJobInfo = () => {
  const owner = useUserStoreHook().username;
  return http.get(`/homePage/getUserJobInfo?owner=${owner}`);
};
