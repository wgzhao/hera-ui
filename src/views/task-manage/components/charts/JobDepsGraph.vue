<template>
  <div ref="chartRef" style="width: 100%; height: 365px" />
</template>
<script setup lang="ts">
import { useDark, useECharts } from "@pureadmin/utils";
import type { GraphSeriesOption } from 'echars/charts'
import { type PropType, ref, computed, watch, nextTick } from "vue";
import { type JobGraphNode, getJobDependencies } from '@/api/task-manage'
const props = defineProps({ jobId: Number, depType: Number });

const { isDark } = useDark();

const theme = computed(() => (isDark.value ? "dark" : "light"));

const chartRef = ref();

const { setOptions } = useECharts(chartRef, {
  theme
});

const jobDeps = {} as JobGraphNode;

watch(
  () => props,
  async () => {
    await nextTick(); // 确保DOM更新完成后再执行
    getJobDependencies(props.jobId, props.depType).then(res => {
      jobDeps.value = res;
    });
    console.log("jobDeps = ",jobDeps.value.categories);
    const options: GraphSeriesOption = {
      container: ".graph-card",
      color: ["#41b6ff", "#e85f33"],
      title: {
        text: '任务依赖关系图',
        subtext: '任务ID: ${props.jobId}',
        top: 'bottom',
        left: 'right'
      },
      tooltip: {},
      legend: [ ],
      animationDuration: 1500,
      animationEasingUpdate: 'quinticInOut',
      series: [
        {
          name: "任务依赖关系图",
          layout: "none",
          type: "graph",
          data: jobDeps.value.nodes,
          links: jobDeps.value.links,
          categories: [],
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
    }; // end options
    setOptions<GraphSeriesOption>(options.value,
    {
      deep: true,
      immediate: true
    });
  } // end async
); // end watch
</script>
