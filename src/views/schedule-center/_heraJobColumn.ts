import type {
  PlusColumn,
  FieldValues,
  PlusFormGroupRow
} from "plus-pro-components";
function deepCopy<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}
// 任务基本信息字段
const baseColumn: PlusFormGroupRow[] = [
  {
    title: "基本信息",
    columns: [
      { label: "任务id", prop: "id" },
      {
        label: "调度类型",
        prop: "scheduleType",
        valueType: "select",
        options: [
          { label: "定时调度", value: 0 },
          { label: "依赖调度", value: 1 }
        ]
      },
      { label: "所有人", prop: "owner" },
      { label: "名称", prop: "name" },
      { label: "关注人员", prop: "focusUser" },
      { label: "任务类型", prop: "runType" },
      { label: "管理员", prop: "uIdS" },
      {
        label: "自动调度",
        prop: "auto",
        valueType: "switch",
        fieldProps: {
          activeValue: "开启"
        }
      },
      { label: "重试次数", prop: "configs['roll.back.times']" },
      { label: "重复执行", prop: "repeatRun", valueType: "switch" },
      {
        label: "任务优先级",
        prop: "configs['run.priority.level']",
        valueType: "select",
        options: [
          { label: "low", value: 1 },
          { label: "middle", value: 2 },
          { label: "hight", value: 3 }
        ]
      },
      { label: "重试间隔", prop: "form.configs['roll.back.wait.time']" },
      { label: "机器组", prop: "hostGroupName" },
      { label: "描述", prop: "description", colProps: { span: 12 } },
      { label: "预计时长", prop: "jobDurationTime" }
    ]
  },
  {
    title: "配置项信息",
    columns: [
      {
        label: "配置项信息",
        prop: "selfConfigs",
        labelWidth: "120px",
        colProps: { span: 24 }
      },

      {
        label: "继承的配置项信息",
        prop: "inheritConfig",
        labelWith: "200px",
        colProps: {
          span: 24,
          labelWidth: "200px"
        }
      }
    ]
  },
  {
    title: "脚本",
    columns: [{ label: "脚本", prop: "script" }]
  }
];
// 定时调度任务字段
const cronColumn: PlusFormGroupRow[] = deepCopy(baseColumn);
cronColumn[0].columns.splice(4, 0, {
  label: "定时表达式",
  prop: "cronExpression"
});

// 依赖任务字段
const depColumn: PlusFormGroupRow[] = deepCopy(baseColumn);
depColumn[0].columns.splice(4, 0, { label: "依赖任务", prop: "dependencies" });
depColumn[0].columns.splice(7, 0, {
  label: "依赖周期",
  prop: "heraDependencyCycle"
});

console.log(depColumn);

export { baseColumn, cronColumn, depColumn };
