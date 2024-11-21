import type { PlusColumn, FieldValues, PlusFormGroupRow } from 'plus-pro-components'
// 任务基本信息字段
export const baseColumn: PlusFormGroupRow[] = [
  {
    title: "基本信息",
    columns:[
  { label: "任务id", prop: "id"},
  { label: "调度类型", prop: "scheduleType"},
    { label: "所有人", prop: "owner"},
      { label: "名称", prop: "name"},
        { label: "关注人员", prop: "focusUser"},
        { label: "任务类型", prop: "runType"},
        { label: "重试次数", prop: "configs['roll.back.times']"},
        { label: "管理员", prop: "uIdS"},
        { label: "自动调度", prop: "auto"},
         { label: "重复执行", prop: "repeatRun"},
         { label: "任务优先级", prop: "configs['run.priority.level']"},
           { label: "预计时长", prop: "jobDurationTime"},
             { label: "机器组", prop: "hostGroupName"},
               { label: "描述", prop: "description"},
                 { label: "区域", prop: "areaId"},
    ]
  },
    {
      title:"脚本",
      columns: [
         { label: "脚本"， prop: "script"},
      ]
    },
    {
      title: "配置项信息",
      columns: [

     {label: "配置项信息", prop: "selfConfigs"},

      { label: "继承的配置项信息", prop: "inheritConfig"}
    }
]
// 定时调度任务字段
export const cronColumn: PlusColumn[] = [
   { label: "定时表达式", prop: "cronExpression"},
]
// 依赖任务字段
export const depColumn: PlusColumn[] = [
    { label: "依赖任务", prop: "dependencies"},
    { label: "依赖周期", prop: "heraDependencyCycle"},
]
