import { http } from "@/utils/http";

export type WorkInfo = {
  id: number;
  host: string;
  hostGroupId: number;
  hostGroupName?: string | null;
};


type Resp = {
  code: number,
  count: number,
  data: Array<WorkInfo>
}

export const getAllWorkInfo = () => {
  return http.request<Resp>("get", "/workManage/list");
}
