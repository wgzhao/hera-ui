const Layout = () => import("@/layout/index.vue");

export default {
  path: "/system-manage",
  name: "SystemManage",
  component: Layout,
  redirect: "/system-manage/user-manage",
  meta: {
    icon: "ep:tools",
    title: "系统管理",
    rank: 1
  },
  children: [
    {
      path: "/system-manage/user-manage",
      name: "UserManage",
      component: () => import("@/views/system-manage/user-manage.vue"),
      meta: {
        icon: "ep:user",
        title: "用户管理",
        showParent: true
      }
    },
    {
      path: "/system-manage/host-group",
      name: "HostGroup",
      component: () => import("@/views/system-manage/host-group.vue"),
      meta: {
        icon: "ep:group",
        title: "机器组管理",
        showParent: true
      }
    }
  ]
} satisfies RouteConfigsTable;
