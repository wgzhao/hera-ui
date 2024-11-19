<template>
  <div>
    <svg class="dagre" width="100%" height="700">
      <g class="container"></g>
    </svg>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, h } from "vue";
import { http } from "@/utils/http";
import dagreD3 from "dagre-d3";
import * as d3 from "d3";
import { ElMessageBox } from "element-plus";

const { jobId, graphType } = defineProps(["jobId", "graphType"]);

const nodeIndex = {};
const shape = "circle"; // 节点形状, 默认'circle',可取值'circle'、'ellipse'、'rect'、'diamond'、'roundrect'
const g = new dagreD3.graphlib.Graph()
  .setGraph({
    rankdir: "TB" // 流程图从下向上显示,默认'TB',可取值'TB'、'BT'、'LR'、'RL'
  })
  .setDefaultEdgeLabel(function () {
    return {};
  });

const currentNode = ref({
  id: null,
  nodeName: ""
});

function addNode(node, color: string = "#73c0de") {
  if (g.node(node.nodeName) == undefined) {
    g.setNode(node.nodeName, {
      label: node.nodeName,
      style: "fill: " + color + ";" + node.remark,
      shape: shape,
      rx: 5,
      ry: 5,
      paddingBottom: 15,
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 15,
      labelStyle: "fill: #000;font-weight:bold"
    });
  }
}

function addEdge(nodeA, nodeB, label) {
  g.setEdge(nodeA, nodeB, {
    label: label,
    style: "stroke: #70baff; fill: none; stroke-width: 2px", // 连线样式
    arrowheadStyle: "fill: #70baff;stroke: #70baff;", //箭头样式,可以设置箭头颜色
    arrowhead: "vee" //箭头形状,可以设置 normal,vee,undirected 三种样式,默认为 normal
  });
}
function initDate(data) {
  const edges = data.edges;
  const headNode = data.headNode;
  const len = edges.length;
  const currIndex = 0;
  addNode(headNode);

  var nodeName;

  for (var i = 0; i < len; i++) {
    nodeName = edges[i].nodeA.nodeName;
    //alert("nodeName :" + nodeName);
    if (
      nodeIndex[nodeName] == null ||
      nodeIndex[nodeName] == undefined ||
      nodeIndex[nodeName] == 0
    ) {
      nodeIndex[nodeName] = i + 1;
    }
    addEdgeToTableGraph(edges[i]);
    addEdgeToGraph(edges[i]);
  }
}

//重新加载界面
function redraw() {
  var render = new dagreD3.render();
  const container = d3.select("svg.dagre").select("g.container");
  // const svg = d3.select("svg");
  render(container, g);

  // 拖拽缩放
  const svg = d3.select("svg.dagre");
  let zoom = d3
    .zoom()
    .scaleExtent([0.5, 2])
    .on("zoom", current => {
      container.attr("transform", current.transform);
    });
  svg.call(zoom);

  // 鼠标悬停显示隐藏tooltip
  // container.on("click", e => {
  //   console.log(e.target);
  // });

  d3.selectAll(".node").on("click", e => {
    if (e.target.nodeName === shape) {
      console.log(e.target.getAttribute("style"));
      ElMessageBox({
        title: "节点信息",
        message: h("pre", null, e.target.getAttribute("style").split(";")[1])
      });
    }
  });

  // Center the graph
  var xCenterOffset = (svg.attr("width") - g.graph().width) / 2;
  container.attr("transform", "translate(" + xCenterOffset + ", 20)");
  svg.attr("height", g.graph().height + 40);
}

//根据状态获得颜色
function getColor(auto, status) {
  console.log(auto, status);
  if (
    status.split("任务名称")[0].split("ID：")[1].replace(/\s*/g, "") ==
    jobId.value
  ) {
    //alert("当前节点")
    return "#00FFFF";
  } else if (auto == 0) {
    return "#919191"; //灰色
  } else if (auto == 2) {
    return "#919191"; //灰色
  } else if (status.indexOf("success") >= 0) {
    //alert("success...") ;
    return "#37b55a"; //绿色
  } else if (status.indexOf("running") >= 0) {
    //alert("running...") ;
    return "#f0ab4e"; //黄色
  } else if (status.indexOf("failed") >= 0) {
    //failed
    return "#f77"; //红色
  } else {
    //alert("其他...")
    return "#66B3FF"; //未运行显示蓝色
  }
}

function addEdgeToGraph(edge) {
  var target = edge.nodeA;
  var src = edge.nodeB;

  if (g.node(src.nodeName) == undefined) {
    var srcRemarkColor = getColor(src.auto, src.remark);
    addNode(src), srcRemarkColor;
  }
  if (g.node(target.nodeName) == undefined) {
    var targetRemarkColor = getColor(target.auto, target.remark);
    addNode(target, targetRemarkColor);
  }
  if (nodeIndex[target.nodeName] == 0) {
    return false;
  }
  if (graphType == 0) {
    addEdge(src.nodeName, target.nodeName, "");
  } else {
    addEdge(target.nodeName, src.nodeName, "");
  }

  return true;
}

/** 绘制表节点信息 */
function addEdgeToTableGraph(edge) {
  var target = edge.nodeA;
  var src = edge.nodeB;
  addNode(src);
  addNode(target);

  if (nodeIndex[target.nodeName] == 0) {
    return false;
  }
  if (graphType == 0) {
    addEdge(src.nodeName, target.nodeName, "");
  } else {
    addEdge(target.nodeName, src.nodeName, "");
  }

  return true;
}
onMounted(() => {
  console.log("jobId", jobId);
  console.log("graphType", graphType);
  http
    .request("post", "/scheduleCenter/getJobImpactOrProgress", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      },
      data: {
        jobId: jobId,
        type: graphType
      }
    })
    .then(res => {
      initDate(res.data);
      redraw();
    });
  redraw();
});
</script>
<style>
h1,
svg {
  text-align: center;
}

svg {
  display: block;
  margin: auto;
  border: 1px solid #ccc;
}

.node rect {
  stroke: #333;
  fill: #fff;
}

.edgePath path {
  stroke: #333;
  fill: #333;
  stroke-width: 1.5px;
}
</style>
