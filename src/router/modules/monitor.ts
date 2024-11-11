const Layout = () => import("@/layout/index.vue");

export default {
  path: "/monitor",
  name: "Monitor",
  component: Layout,
  redirect: "/monitor/index",
  meta: {
    icon: "ep:home-filled",
    title: "监控中心",
    rank: 2
  },
  children: [
    {
      path: "/monitor/machineGroup",
      name: "MachineGroup",
      component: () => import("@/views/monitor/machine-group.vue"),
      meta: {
        title: "机器组监控",
        showParent: true
      }
    },
    {
      path: "/monitor/offline-tasks",
      name: "OfflineTasks",
      component: () => import("@/views/monitor/machine-group.vue"),
      meta: {
        title: "离线任务监控"
      }
    }
  ]
} satisfies RouteConfigsTable;
