<template>
  <div ref="chartRef" style="width: 100%; height: 1000px" />
</template>
<script setup lang="ts">
import { useDark, useECharts } from "@pureadmin/utils";
import type { GraphSeriesOption } from "echarts/charts";
import { ref, computed, watch, nextTick } from "vue";
const props = defineProps(["data"]);

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
    const options = {
      title: {
        text: "任务依赖关系图",
        subtext: "任务ID:",
        top: "bottom",
        left: "right"
      },
      tooltip: {},
      legend: [],
      animationDuration: 1500,
      animationEasingUpdate: "quinticInOut",
      series: [
        {
          name: "任务依赖关系图",
          type: "graph",
          layout: "none",
          symbolSize: 20,
          edgeSymbol: ["circle", "arrow"],
          edgeSymbolSize: [4, 10],
          data: props.data.nodes,
          links: props.data.links,
          categories: props.data.categories,
          roam: true,
          labelLayout: {
            hideOverlap: true
          },
          scaleLimit: {
            min: 0.4,
            max: 2
          },
          label: {
            position: "right",
            formatter: "{b}",
            show: true
          },
          lineStyle: {
            color: "source",
            curveness: 0.3,
            width: 1
          },
          emphasis: {
            focus: "adjacency",
            lineStyle: {
              width: 10
            }
          }
        }
      ]
    };
    console.log(options);
    setOptions(options);
  },
  {
    deep: true,
    immediate: true
  }
);
</script>
