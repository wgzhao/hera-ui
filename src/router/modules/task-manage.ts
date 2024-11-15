const Layout = () => import("@/layout/index.vue");

export default {
  path: "/task-manage",
  name: "TaskManage",
  component: Layout,
  redirect: "/task-manage/task-detail",
  meta: {
    icon: "ep:menu",
    title: "任务管理",
    rank: 1
  },
  children: [
    {
      path: "/task-manage/task-detail",
      name: "TaskDetail",
      component: () => import("@/views/task-manage/task-detail.vue"),
      meta: {
        icon: "ep:memo",
        title: "任务详情",
        showParent: true
      }
    },
    {
      path: "/task-manage/task-dag",
      name: "TaskDag",
      component: () => import("@/views/task-manage/task-dag.vue"),
      meta: {
        icon: "ep:document-copy",
        title: "任务依赖图",
        showParent: true
      }
    }
  ]
} satisfies RouteConfigsTable;
