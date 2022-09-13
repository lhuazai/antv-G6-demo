<template>
  <div id="wrapper">
    <div style="width: 20%;height: 100vh;border: 1px solid #000;overflow-y: scroll;">
      <div style="border: 1px solid red;padding: 10px;margin-top: 10px;">
        <p>布局</p>
        <select v-model="layoutType" @change="changeLayout">
          <option value ="force">force</option>
          <option value ="forceAtlas2">forceAtlas2</option>
          <option value="force2">force2</option>
          <option value="gForce">gForce</option>
        </select>
      </div>
      <div style="border: 1px solid red;padding: 10px;margin-top: 10px;">
        <button @click="fnDetectDirectedCycle">检查是否包含圈</button>
        <p>{{allCycles ? '包含有向环' : '不包含有向环'}}</p>
        <div  v-if="allCycles">
          <p v-for="(val, key) in allCycles" :key="key" >{{key}} : {{val}}</p>
        </div>
      </div>
      <div style="border: 1px solid red;padding: 10px;margin-top: 10px;">
        <p>路径查找</p>
        <p>起始节点</p>
        <select v-model="shortestPathStart.id" @change="changeStart">
          <option v-for="item in originNodes" :key="item.id" :value ="item.id">{{item.id}}</option>
        </select>
        <p>终节点</p>
        <select v-model="shortestPathEnd.id" @change="changeEnd">
          <option v-for="item in originNodes" :key="item.id" :value ="item.id">{{item.id}}</option>
        </select>
        <button @click="lookupShortestPath">查找两点之间的最短路径</button>
        <div>
          <p>共有{{shortestPath.allPath.length}}条路径  ， 最短路径长度 {{shortestPath.length}}</p>
          <p>最短路径：</p>
          <span v-for="(path, index) in shortestPath.path" :key="path" >{{path}} {{index === shortestPath.path.length-1 ? '' : '=> '}}</span>
        </div>
      </div>
      <div style="border: 1px solid red;padding: 10px;margin-top: 10px;">
        <h3>节点详情</h3>
        <div  v-if="nodeDegree" style="width: 100%;border-bottom: 1px solid #666">
          <p >总度数 : {{nodeDegree.degree}}</p>
          <p >入度 : {{nodeDegree.inDegree}}</p>
          <p >出度 : {{nodeDegree.outDegree}}</p>
        </div>
        <div  v-if="clickNode">
          <p v-for="(val, key) in clickNode" :key="key" >{{key}} : {{val}}</p>
        </div>

        <h3>边详情</h3>
        <div  v-if="edgeDetail">
          <p v-for="(val, key) in edgeDetail" :key="key" >{{key}} : {{val}}</p>
        </div>
      </div>
      <div style="border: 1px solid red;padding: 10px;margin-top: 10px;">
        <p>切换行为模式</p>
        <select v-model="model" @change="changeModel">
          <option value="default">默认</option>
          <option value="addEdge">添加边</option>
        </select>

        <h3>新增节点</h3>
        <button @click="addNodePrototype">新增节点属性</button>
        <button @click="cleanNodePrototype">清空节点属性</button>
        <div>
          <p v-for="(val, index) in newNode" :key="index"><input v-model="val.key" @input="inputNodeKey($event, index)" />:<input v-model="val.value" @input="inputNodeVal($event, index)" /></p>
        </div>
        <button @click="addNode">添加节点</button>
      </div>
      <div>
        <p>重要性算法</p>
        <p><input value="PageRank" type="radio"/>PageRank网页排序(使用PageRank网页排序算法计算)</p>
        <p><input value="PageRank" type="radio"/>度中心性(根据实体的出入度大小计算)</p>
        <button @click="analysisMap">分析</button>
        <table border="1" width="300" bgcolor="aqua" cellspacing="0">
          <caption>节点重要度</caption>
          <tr bgcolor="#f1f1f1" height="30">
            <th>节点</th>
            <th>重要性</th>
          </tr>
          <tr v-for="(val, key) in nodeRank" :key="key">
            <td width="100">{{key}}</td>
            <td width="100">{{val}}</td>
          </tr>
        </table>
      </div>
    </div>
    <div style="width: 80%;height: 100vh" id="content">
      <div id="mountNode"></div>
    </div>
  </div>
   
</template>

<script>
import G6, { Algorithm } from '@antv/g6';
import { dataJson, layouts } from './data'
import { tooltip, menu } from './tooltip'
import { toolbar } from './tool_bar'
import './register_node'
import event from './event'
let graph = null
export default {
  mixins: [],
  components: {},
  watch: {},
  computed: {},
  data () {
    return {
      layoutType: 'force',
      nodeTypes: [],
      edgeTypes: [],
      originNodes: [],
      originEdges: [],
      shortestPathStart: {
        id: ''
      },
      shortestPathEnd: {
        id: ''
      },
      shortestPath: {
        length: '',
        path: [],
        allPath: []
      },
      allCycles: null,
      clickNode: {},
      edgeDetail: {},
      newNode: [],
      model: 'default',
      nodeRank: {},
      nodeDegree: {},
      timeBarData: []
    }
  },
  methods: {
    changeLayout (val) {
      const value = val.target.value
      const layoutOjb = layouts[value]
      graph.updateLayout(layoutOjb);
    },
    async load () {
      let _that = this;
      const parentHeight = document.getElementById('content').scrollHeight
      const parentWidth = document.getElementById('content').scrollWidth
      const grid = new G6.Grid();
      const remoteData = await Promise.resolve(dataJson);
      // const timebar = new G6.TimeBar({
      //   x: 50,
      //   y: 50,
      //   width: 400,
      //   height: 150,
      //   padding: 10,
      //   type: 'simple',
      //   trend: {
      //     data: this.timeBarData,
      //   },
      // });
      // const constrainBox = { x: 10, y: 10, width: 1000, height: 800 };
      // const nodeSize = 40;
      // const onTick = () => {
      //   let minx = 99999999;
      //   let maxx = -99999999;
      //   let miny = 99999999;
      //   let maxy = -99999999;
      //   remoteData.nodes.forEach((node) => {
      //     if (minx > node.x) {
      //       minx = node.x;
      //     }
      //     if (maxx < node.x) {
      //       maxx = node.x;
      //     }
      //     if (miny > node.y) {
      //       miny = node.y;
      //     }
      //     if (maxy < node.y) {
      //       maxy = node.y;
      //     }
      //   });
      //   const scalex = (constrainBox.width - nodeSize / 2) / (maxx - minx);
      //   const scaley = (constrainBox.height - nodeSize / 2) / (maxy - miny);
      //   remoteData.nodes.forEach((node) => {
      //     node.x = (node.x - minx) * scalex + constrainBox.x;
      //     node.y = (node.y - miny) * scaley + constrainBox.y;
      //   });
      // };

      graph = new G6.Graph({
        container: 'mountNode',
        width: parentWidth,
        height: parentHeight,
        fitView: true,
        // 节点默认配置
        defaultNode: {
          type: 'circle',
          size: 20,
          style: {
            fill: '#9EC9FF',
            stroke: '#5B8FF9',
            lineWidth: 3,
          },
          labelCfg: {
            position: 'center',
            style: {
              fontSize: 12,
              fill: '#000',
              fontWeight: 500
            }
          },
        },
        // 边默认配置
        defaultEdge: {
          labelCfg: {
            autoRotate: true,
            style: {
              fontSize: 12,
              fill: '	#696969',
              fontWeight: 400
            }
          },
        },
        // 节点在各状态下的样式
        nodeStateStyles: {
          // hover 状态为 true 时的样式
          hover: {
            fill: 'red',
          },
          // click 状态为 true 时的样式
          click: {
            stroke: '#000',
            lineWidth: 3,
          },
        },
        // 边在各状态下的样式
        edgeStateStyles: {
          // click 状态为 true 时的样式
          click: {
            stroke: 'steelblue',
            lineWidth: 10,
          },
          hover: {
            fill: 'red',
            lineWidth: 15,
          },
        },
        linkCenter: true,
        // 布局
        layout: {
          type: 'force',
          linkDistance: 60,
          preventOverlap: true,
          nodeStrength: -20,
          edgeStrength: 0.1,
          collideStrength: 1,
          // onTick
        },
        animate: true,
        animateCfg: {
          duration: 2000,
          easing: 'linearEasing',
          repeat: true
        },
        plugins: [toolbar, grid, menu],
        // plugins: [timebar],
        // 内置交互
        modes: {
          default: ['drag-canvas', 'zoom-canvas', 'drag-node', "click-select"],
          addEdge: ["click-add-edge", "click-select"]
          // addNode: ['click-add-node', 'click-select'],
          // dragLasso: [
          //   {
          //     type: 'lasso-select',
          //     delegateStyle: {
          //       fill: '#f00',
          //       fillOpacity: 0.05,
          //       stroke: '#f00',
          //       lineWidth: 1,
          //     },
          //     onSelect: (nodes, edges) => {
          //       console.log('onSelect', nodes, edges);
          //     },
          //     trigger: 'drag',
          //   },
          //   'drag-node',
          // ],
        },
      });
      
      
      const {louvain } = Algorithm;
      // const clusteredData = louvain(remoteData, false, 'weight');
      // console.log('clusteredData', clusteredData)
      const nodes = remoteData.nodes;
      
      const edges = remoteData.edges;
      this.originNodes = nodes;
      this.originEdges = edges;
      // 分组
      const combos = []
      nodes.forEach((node, index) => {
        if (!node.style) {
          node.style = {};
        }
        // node.date = `2022${index}`
        // node.value = Math.round(Math.random() * 300)
        let dataType = node.data.dataType;
        node.comboId =  dataType
        if (!this.nodeTypes.includes(dataType)) {
          this.nodeTypes.push(dataType)
          combos.push({id: dataType})
        }
        if (node.data.dataType === 'country') {
          node.backgroundConfig = {
            fill: '#00FF00'
          }
        }
        node.style.lineWidth = 1;
        node.style.stroke = '#000080';
        node.style.fill = '#87CEFA';
        // node.label = node.data.id
        
        if (dataType === 'file') {
          node.type = 'circle-animate';
          node.size = 30;

        } else if (dataType === 'country') {
          node.type = 'iconfont';
          node.color = '#40a9ff';
          node.text = '\ue785';
          node.style.fill = '#40a9ff';
          node.size = 20;
          node.label = node.data.id
        } else if (dataType === 'firmware') {
          node.type = 'ellipse';
          node.size = [50, 20];
        } else if (dataType === 'manu') {
          node.type = 'rect';
          node.size = [70, 20];
          node.label = node.data.id
        } else if (dataType === 'cve') {
          node.type = 'rect';
          node.size = [100, 30];
          node.style.stroke = '#191970';
          node.style.fill = '#1E90FF';
          node.label = node.id
        } else if (dataType === 'asset') {
          node.style.fill = '#66CDAA';
        }
      });

      edges.forEach((edge) => {
        if (!edge.style) {
          edge.style = {
            endArrow: {
              path: 'M 0,0 L 8,4 L 8,-4 Z',
              fill: '#e2e2e2',
            },
          };
        }
        if (!this.edgeTypes.includes(edge.data.edgeType)) {
          this.edgeTypes.push(edge.data.edgeType)
        }
        edge.style.lineWidth = edge.weight || 2;
        edge.style.opacity = 0.6;
        edge.style.stroke = '#FFD700';
        // edge.label = edge.edgeType
        switch (edge.edgeType) {
          case 'assets_to_country': {
            edge.style.stroke = '#FF4500';
            break;
          }
          case 'firmware_to_assets': {
            edge.style.stroke = '#4169E1';
            edge.style.endArrow.path = 'M 0,0 L 8,4 L 8,-4 Z';
            edge.style.endArrow.fill = '#32CD32';
            break;
          }
          case 'manu_to_country': {
            edge.style.stroke = '#00CED1';
            break;
          }
          case 'firmware_to_manu': {
            edge.style.stroke = '#FF00FF';
            break;
          }
        }
      });
      // 节点间 多条边
      const offsetDiff = 10;
      const multiEdgeType = 'quadratic';
      const singleEdgeType = 'line';
      const loopEdgeType = 'loop';
      G6.Util.processParallelEdges(remoteData.edges, offsetDiff, multiEdgeType, singleEdgeType, loopEdgeType);

      console.log('remoteData', remoteData);
      // remoteData.combos = combos;
      graph.data(remoteData);
      graph.render();
      // 实例事件
      event(_that, graph);
      
    },
    // 开始节点
    changeStart (val) {
      // const value = val.target.value;
      // let node = this.originNodes.find(item => item.id === value)
      // this.shortestPathStart = {
      //   ...this.shortestPathStart,
      //   ...node
      // }
    },
    //终节点
    changeEnd (val) {
      const value = val.target.value;
      let node = this.originNodes.find(item => item.id === value)
      this.shortestPathEnd = {
        ...this.shortestPathEnd,
        ...node
      }
    },
    // 修改模式
    changeModel (val) {
      graph.setMode(val.target.value);
    },
    loookupChildMap () {

    },
    // 清除新增节点属性
    cleanNodePrototype () {
      this.newNode = []
    },
    inputNodeKey (e, index) {
      this.newNode[index].key = e.target.value
    },
    inputNodeVal (e, index) {
      this.newNode[index].value = e.target.value
    },
    // 新增节点属性
    addNodePrototype () {
      let len = this.newNode.length
      const data = {
        key: `key${len+1}`,
        value: '',
      }
      this.newNode.push(data)
    },
    // 新增节点
    addNode () {
      let model = {}
      let id = new Date().getTime()
      model = {
          id: String(id),
          nodeType: 'newNode',
          x: 600,
          y: 400,
          type: 'rect',
          size: [100, 20],
          style: {
            fill: '#000',
          },
          data: {
            id: String(id),
            nodeType: 'newNode',
            dataType: 'botnet'
          }
        }
      this.newNode.forEach(item => {
        model.data[item.key] = item.value
      })
      graph.addItem('node', model)
      this.newNode = []
    },
    // 检查环
    async fnDetectDirectedCycle () {
      const { detectDirectedCycle } = Algorithm;
      const remoteData = await Promise.resolve(dataJson);
      let result = detectDirectedCycle(remoteData, true);
      this.allCycles = result;
    },
    async analysisMap () {
      const { pageRank } = Algorithm;
      const remoteData = await Promise.resolve(dataJson);
      let result = pageRank(remoteData);
      this.nodeRank = result;
      console.log('result', result);
    },
    lookupShortestPath () {
      const { findShortestPath } = Algorithm;
      // 不考虑边的方向性，查找节点 A 和 节点 C 之间的最短路径
      const { length, path, allPath } = findShortestPath(dataJson, this.shortestPathStart.id, this.shortestPathEnd.id);
      // console.log('length, path, allPath', length, path, allPath);
      this.shortestPath = {
        length, path, allPath
      }
    },
    clear () {}
  },
  mounted () {
    for (let i = 0; i < 216; i++) {
      this.timeBarData.push({
        date: `2022${i}`,
        value: Math.round(Math.random() * 300),
      });
    }
    this.load()
  },
  destroyed () {
    this.clear()
  }
}
</script>
<style>
#wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
#content {
  border: 1px solid red;
  position: relative;
}
p{
  margin: 0;
  padding: 0;
  line-height: 26px;
}
</style>