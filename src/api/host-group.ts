import { http } from "@/utils/http";

export type HostGroup = {
  id: number;
  name: string;
  effective: boolean;
  description: string;
}

export const getAllHostGroup = () => {
  return http.request<HostGroup>("get", "/hostGroup/list")
}

export const updateHostGroup = (data?: HostGroup) => {
  return http.request<any>("post", "/hostGroup/update", { data });
}
