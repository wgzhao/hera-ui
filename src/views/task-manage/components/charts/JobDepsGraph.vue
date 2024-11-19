<template>
  <div ref="chartRef" style="width: 100%; height: 365px" />
</template>
<script setup lang="ts">
import { useDark, useECharts } from "@pureadmin/utils";
import type { GraphSeriesOption } from 'echarts/charts';
import { ref, computed, watch, nextTick } from "vue";
import { graph } from './les-miserables';

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
      container: ".graph-card",
      title: {
        text: '任务依赖关系图',
        subtext: '任务ID:',
        top: 'bottom',
        left: 'right'
      },
      tooltip: {},
      legend: [],
      animationDuration: 1500,
      animationEasingUpdate: 'quinticInOut',
      series: [
        {
          name: "任务依赖关系图",
          layout: "none",
          type: "graph",
          data: [{ id: 0, name: "start", value: 1 }, { id: 848, name: "任务名称:dwd_applet_log_behavior_di", value: 1 },
          { id: 6, name: "任务名称:cleanBuryLog", value: 30 }, { id: 28, name: "任务名称:start_01_30", value: 20 }],
          links: [{ source: 0, target: 848 }, { source: 848, target: 6 }, { source: 6, target: 28 }],
          // categories: [{ name: "任务名称:dwd_applet_log_behavior_di" }, { name: "任务名称:cleanBuryLog" }, { name: "任务名称:start_01_30" }],
          roam: true,
          label: {
            position: 'right',
            formatter: '{b}'
          },
          lineStyle: {
            color: 'source',
            curveness: 0.3
          },
          emphasis: {
            focus: 'adjacency',
            lineStyle: {
              width: 10
            }
          }
        }
      ]
    };
    setOptions({
      container: ".graph-card",
      title: {
        text: '任务依赖关系图',
        subtext: '任务ID:',
        top: 'bottom',
        left: 'right'
      },
      tooltip: {},
      legend: [],
      animationDuration: 1500,
      animationEasingUpdate: 'quinticInOut',
      series: [
        {
          name: "任务依赖关系图",
          layout: "circular",
          type: "graph",
          data: [{ id: 0, name: "start", value: 1 }, { id: 848, name: "任务名称:dwd_applet_log_behavior_di", value: 1 }, { id: 6, name: "任务名称:cleanBuryLog", value: 30 }, { id: 28, name: "任务名称:start_01_30", value: 20 }],
          links: [{ source: 0, target: 848 }, { source: 848, target: 6 }, { source: 6, target: 28 }],
          // categories: [{ name: "任务名称:dwd_applet_log_behavior_di" }, { name: "任务名称:cleanBuryLog" }, { name: "任务名称:start_01_30" }],
          roam: true,
          label: {
            position: 'right',
            formatter: '{b}'
          },
          lineStyle: {
            color: 'source',
            curveness: 0.3
          },
          emphasis: {
            focus: 'adjacency',
            lineStyle: {
              width: 10
            }
          }
        }
      ]
    });
  },
  {
    deep: true,
    immediate: true
  });
</script>
