const Layout = () => import("@/layout/index.vue");

export default {
  path: "/schedule-center/",
  name: "ScheduleCenter",
  redirect: "/schedule-center/schedule-list",
  meta: {
    icon: "ep:watch",
    title: "调度中心",
    rank: 5,
  },
  children: [{
    path: "/schedule-center/schedule-list",
    name: "ScheduleList",
    component: () => import("@/views/schedule-center/schedule-list.vue"),
    meta: {
      icon: "ep:watch",
      title: "调度中心",
      rank: 5,
      showParent: true
    }
    }
  ]
}
