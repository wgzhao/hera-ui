const Layout = () => import("@/layout/index.vue");

export default {
  path: "/task-manage",
  name: "TaskManage",
  component: Layout,
  redirect: "/task-manage/task-list",
  meta: {
    icon: "ep:menu",
    title: "任务管理",
    rank: 1
  },
  children: [
    {
      path: "/task-manage/task-list",
      name: "TaskList",
      component: () => import("@/views/task-manage/task-list.vue"),
      meta: {
        icon: "ep:memo",
        title: "任务列表",
        showParent: true
      }
    },
    // {
    //   path: "/task-manage/task-detail/:id",
    //   name: "TaskDetail",
    //   component: () => import("@/views/task-manage/task-detail.vue"),
    //   meta: {
    //     icon: "ep:memo",
    //     title: "任务详情",
    //     showParent: false,
    //     showLink: false,
    //     activePath: "/task-manage/task-list"
    //   }
    // },
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
