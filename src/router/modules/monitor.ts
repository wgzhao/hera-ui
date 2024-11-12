const Layout = () => import("@/layout/index.vue");

export default {
  path: "/monitor",
  name: "Monitor",
  component: Layout,
  redirect: "/monitor/index",
  meta: {
    icon: "ep:monitor",
    title: "监控中心",
    rank: 2
  },
  children: [
    {
      path: "/monitor/machineGroup",
      name: "MachineGroup",
      component: () => import("@/views/monitor/machine-group.vue"),
      meta: {
        icon: "ep:folder",
        title: "机器组监控",
        showParent: true
      }
    },
    {
      path: "/monitor/offline-task",
      name: "OfflineTasks",
      component: () => import("@/views/monitor/offline-task.vue"),
      meta: {
        icon: "ep:folder",
        title: "离线任务监控"
      }
    },
    {
      path: "/monitor/realtime-task",
      name: "RealtimeTasks",
      component: () => import("@/views/monitor/realtime-task.vue"),
      meta: {
        icon: "ep:folder",
        title: "实时任务监控"
      }
    }
  ]
} satisfies RouteConfigsTable;
