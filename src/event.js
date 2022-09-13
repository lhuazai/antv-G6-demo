import insertCss from 'insert-css';
insertCss(`
  .g6-component-tooltip {
    border: 1px solid #e2e2e2;
    border-radius: 4px;
    font-size: 12px;
    color: #000;
    background-color: rgba(255, 255, 255, 0.9);
    padding: 10px 8px;
    box-shadow: rgb(174, 174, 174) 0px 0px 10px;
  }
`);
function clearAllStats (graph) {
  graph.setAutoPaint(false);
  graph.getNodes().forEach(function (node) {
    graph.clearItemStates(node);
  });
  graph.getEdges().forEach(function (edge) {
    graph.clearItemStates(edge);
  });
  graph.paint();
  graph.setAutoPaint(true);
}

export default (_that, graph) => {
  // 监听鼠标进入节点
  graph.on('node:mouseenter', (e) => {
    // const nodeItem = e.item;
    // 设置目标节点的 hover 状态 为 true
    // graph.setItemState(nodeItem, 'hover', true);

    const item = e.item;
    graph.setAutoPaint(false);
    graph.getNodes().forEach(function (node) {
      graph.clearItemStates(node);
      graph.setItemState(node, 'dark', true);
    });
    graph.setItemState(item, 'dark', false);
    graph.setItemState(item, 'highlight', true);
    
    graph.getEdges().forEach(function (edge) {
      if (edge.getSource() === item) {
        graph.setItemState(edge.getTarget(), 'dark', false);
        graph.setItemState(edge.getTarget(), 'highlight', true);
        graph.setItemState(edge, 'highlight', true);
        edge.toFront();
      } else if (edge.getTarget() === item) {
        graph.setItemState(edge.getSource(), 'dark', false);
        graph.setItemState(edge.getSource(), 'highlight', true);
        graph.setItemState(edge, 'highlight', true);
        edge.toFront();
      } else {
        graph.setItemState(edge, 'highlight', false);
      }
    });
    graph.paint();
    graph.setAutoPaint(true);

  });

  // graph.on('node:mouseleave', clearAllStats);
  graph.on('canvas:click', (ev) => {
    clearAllStats(graph)
    // const self = this;
    // const graph = self.graph;
    // let t = new Date().getTime()
    // graph.addItem('node', {
    //   x: ev.canvasX,
    //   y: ev.canvasY,
    //   type: 'rect',
    //   style: {
    //     size: 100,
    //     fill: '#000',
    //   },
    //   id: t // Generate the unique id
    // });
    // graph.on('canvas:click', clearAllStats);
  });
  graph.on("node:contextmenu", (evt) => {
    console.log('evt', evt);
  })
  // 监听鼠标离开节点
  graph.on('node:mouseleave', (e) => {
    clearAllStats(graph)
    // const nodeItem = e.item;
    // 设置目标节点的 hover 状态 false
    // graph.setItemState(nodeItem, 'hover', false);

  });
  // 监听鼠标点击节点
  graph.on('node:click', (e) => {
    // 先将所有当前有 click 状态的节点的 click 状态置为 false
    const clickNodes = graph.findAllByState('node', 'click');
    clickNodes.forEach((cn) => {
      graph.setItemState(cn, 'click', false);
    });
    const nodeItem = e.item;
    // 设置目标节点的 click 状态 为 true
    graph.setItemState(nodeItem, 'click', true);
    _that.clickNode = nodeItem.getModel().data
    _that.nodeDegree = graph.getNodeDegree(nodeItem, 'all');
    // console.log('degree', this, degree)
  });
  // 监听鼠标点击节点
  graph.on('edge:click', (e) => {
    // 先将所有当前有 click 状态的边的 click 状态置为 false
    const clickEdges = graph.findAllByState('edge', 'click');
    clickEdges.forEach((ce) => {
      graph.setItemState(ce, 'click', false);
    });
    const edgeItem = e.item;
    // 设置目标边的 click 状态 为 true
    graph.setItemState(edgeItem, 'click', true);
    _that.edgeDetail = edgeItem.getModel().data
  });
}