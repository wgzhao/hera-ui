import { http } from "@/utils/http";
import { toRaw } from "@vue/reactivity";

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
  message: string;
  success: boolean;
  data: Array<HistoryTask>;
};

export const getAllTasks = (params?: map<any>) => {
  // status=all&dt=2024-11-15&operator=&_=1731654456641
  // current date
  return http.request<taskResults>("get", "/jobManage/findJobHistoryByStatus", {
    params
  });
};

export type JobHistoryResult = {
  rows: Array<any>;
  total: number;
};

export const getJobHistory = (
  jobId: number | string,
  pageSize: number,
  pageOffset: number
) => {
  return http.request<JobHistoryResult>(
    "get",
    `/scheduleCenter/getJobHistory`,
    {
      params: {
        pageSize: pageSize || 10,
        offset: pageOffset || 0,
        jobId: jobId
      }
    }
  );
};

export const getJobLog = (id: number) => {
  return http.request("get", `/scheduleCenter/getLog?id=${id}`);
};

export const cancelSpecifiedTask = (id: number, jobId: number) => {
  return http.request(
    "get",
    `/scheduleCenter/cancelTask?id=${id}&jobId=${jobId}`
  );
};

export type JobNode = {
  name: number;
  remark: string;
  auto: number | null;
};

export type JobDepsResult = {
  success: boolean;
  message: string;
  data: {
    headNode: JobNode;
    edges: [
      {
        nodeA: JobNode;
        nodeB: JobNode;
      }
    ];
  };
};
export type JobGraphNode = {
  nodes: JobNode[];
  links: [
    {
      source: number;
      target: number;
    }
  ];
  categories: [];
};
interface Coordinate {
  x: number;
  y: number;
}

const xRange: [number, number] = [0, 1000];
const yRange: [number, number] = [-10, 600];

function getRandomInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function generateRandomCoordinate(xRange: [number, number], yRange: [number, number]): Coordinate {
  const x = getRandomInRange(xRange[0], xRange[1]);
  const y = getRandomInRange(yRange[0], yRange[1]);
  return { x, y };
}

export const getJobDependencies = async (jobId: number, depType: number) => {
  // depType: 0 - impact, 1 - progress
  const resp = await http.request<JobDepsResult>(
    "post",
    `/scheduleCenter/getJobImpactOrProgress`,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      },
      data: {
        jobId: jobId,
        type: depType
      }
    }
  );
  if (resp.success) {
    const graphResult = {
      nodes: [],
      links: [],
      categories: []
    };
    const ids: Set<number> = new Set<number>();
    ids.add(0);
    graphResult.nodes.push({ id: 0, name: "start" });
    resp.data.edges.forEach(edge => {
      // judge if the node is already in the nodes
      // if not, add it to the nodes
      if (!ids.has(edge.nodeA.nodeName)) {
        const randomCoordinate = generateRandomCoordinate(xRange, yRange);
        graphResult.nodes.push({
          name: `${edge.nodeA.nodeName}`,
          x: randomCoordinate.x,
          y: randomCoordinate.y
        });
        ids.add(edge.nodeA.nodeName);
      }
      if (!ids.has(edge.nodeB.nodeName)) {
        const randomCoordinate = generateRandomCoordinate(xRange, yRange);
        graphResult.nodes.push({
          name: `${edge.nodeB.nodeName}`,
          x: randomCoordinate.x,
          y: randomCoordinate.y
        });
        ids.add(edge.nodeB.nodeName);
      }
      // add category
     if (graphResult.categories.indexOf(edge.nodeA.nodeName) === -1) {
        graphResult.categories.push(edge.nodeA.nodeName);
      }
     if (graphResult.categories.indexOf(edge.nodeB.nodeName) === -1){
       graphResult.categories.push(edge.nodeB.nodeName);
     }
      // graphResult.nodes.push(edge.nodeA, edge.nodeB);
      if (depType == 0) {
      graphResult.links.push({
        source: `${edge.nodeA.nodeName}`,
        target: `${edge.nodeB.nodeName}`
      })
      } else {
        graphResult.links.push({
          target: `${edge.nodeA.nodeName}`,
          source: `${edge.nodeB.nodeName}`
        })
      }
    });
    // graphResult.categories = [{
    //   name: "headNode"
    // }];
    return graphResult;
  } else {
    return null;
  }
  return null;
};
