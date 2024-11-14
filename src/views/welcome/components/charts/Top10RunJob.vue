<template>
  <div ref="chartRef" style="width: 100%; height: 365px" />
</template>
<script setup lang="ts">
import { useDark, useECharts } from "@pureadmin/utils";
import { type PropType, ref, computed, watch, nextTick } from "vue";

const props = defineProps({
  currDayJobTimes: {
    type: Array as PropType<Array<number>>,
    default: () => []
  },
  lastDayJobTimes: {
    type: Array as PropType<Array<number>>,
    default: () => []
  },
  jobNames: {
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
      container: ".bar-card",
      color: ["#41b6ff", "#e85f33"],
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "none"
        }
      },
      grid: {
        top: "20px",
        left: "50px",
        right: 0
      },
      legend: {
        data: ["今日", "昨日"],
        textStyle: {
          color: "#606266",
          fontSize: "0.875rem"
        },
        top: 0,
        right: 10,
        orient: "vertical"
      },
      xAxis: [
        {
          type: "category",
          data: props.jobNames,
          axisLabel: {
            fontSize: "9px",
            rotate: 45
          },
          axisPointer: {
            type: "shadow"
          }
        }
      ],
      yAxis: [
        {
          type: "value",
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
          name: "今日",
          type: "bar",
          barWidth: 10,
          itemStyle: {
            color: "#41b6ff",
            borderRadius: [10, 10, 0, 0]
          },
          data: props.currDayJobTimes
        },
        {
          name: "昨日",
          type: "bar",
          barWidth: 10,
          itemStyle: {
            color: "#e86033ce",
            borderRadius: [10, 10, 0, 0]
          },
          data: props.lastDayJobTimes
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
