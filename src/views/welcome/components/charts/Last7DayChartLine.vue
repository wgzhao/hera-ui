<template>
  <div></div>
  <div ref="chartRef" style="width: 100%; height: 365px" />
</template>
<script setup lang="ts">
import { useDark, useECharts } from "@pureadmin/utils";
import { type PropType, ref, computed, watch, nextTick } from "vue";

const props = defineProps({
  successJobCount: {
    type: Array as PropType<Array<number>>,
    default: () => []
  },
  failedJobCount: {
    type: Array as PropType<Array<number>>,
    default: () => []
  },
  dayRange: {
    type: Array as PropType<Array<string>>,
    default: () => []
  }
});

const { isDark } = useDark();

const theme = computed(() => (isDark.value ? "dark" : "light"));

const chartRef = ref();
const { setOptions } = useECharts(chartRef, {
  theme
});

watch(
  () => props,
  async () => {
    await nextTick(); // 确保DOM更新完成后再执行
    setOptions({
      container: ".line-card",
      color: ["#41b6ff", "#e85f33"],
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "none"
        }
      },
      grid: {
        top: "40px",
        left: "50px",
        right: "50px"
      },
      legend: {
        data: ["成功任务数", "失败任务数"],
        textStyle: {
          color: "#606266",
          fontSize: "10px"
        },
        top: 0
      },
      xAxis: [
        {
          type: "category",
          data: props.dayRange,
          axisLabel: {
            fontSize: "9px",
            rotate: 25
          },
          axisPointer: {
            type: "shadow"
          }
        }
      ],
      yAxis: [
        {
          type: "value",
          name: "成功数",
          min: 1000,
          max: 10000,
          position: "left",
          axisLabel: {
            fontSize: "0.875rem"
          },
          splitLine: {
            show: false // 去网格线
          }
          // name: "单位: 个"
        },
        {
          type: "value",
          name: "失败数",
          min: 0,
          max: 100,
          position: "right",
          axisLabel: {
            fontSize: "0.875rem"
          },
          splitLine: {
            show: false // 去网格线
          }
          // name: "单位: 个"
        }
      ],
      series: [
        {
          name: "成功任务数",
          type: "line",
          smooth: true,
          yAxisIndex: 0,
          itemStyle: {
            color: "#41b6ff",
            borderRadius: [10, 10, 0, 0]
          },
          label: {
            show: true,
          },
          data: props.successJobCount
        },
        {
          name: "失败任务数",
          type: "line",
          smooth: true,
          yAxisIndex: 1,
          itemStyle: {
            color: "#e86033ce",
            borderRadius: [10, 10, 0, 0]
          },
          label: {
            show: true
          },
          data: props.failedJobCount
        }
      ]
    });
  },
  {
    deep: true,
    immediate: true
  }
);
</script>
