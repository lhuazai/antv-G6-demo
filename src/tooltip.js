import G6 from '@antv/g6';

const tooltip = new G6.Tooltip({
  offsetX: 10,
  offsetY: 20,
  itemTypes: ['node', 'edge'],
  getContent(e) {
    const outDiv = document.createElement('div');
    outDiv.style.width = '180px';
    const model = e.item.getModel();
    let dataList = model.data;
    let ul = ''
    for (const item in dataList) {
      ul += `<li>${item}: ${dataList[item]}</li>`
    }
    outDiv.innerHTML = `
      <h4>自定义tooltip</h4>
      <ul>
        ${ul}
      </ul>`
    return outDiv
  },
  itemTypes: ['node']
});

const menu = new G6.Menu({
  offsetX: 6,
  offsetX: 10,
  itemTypes: ['node', 'edge'],
  getContent(e, graph) {
    // console.log('e===', e);
    const type = e.item._cfg.type
    const outDiv = document.createElement('div');
    outDiv.style.width = '180px';
    outDiv.style.padding = '10px';
    if (type === 'node') {
      outDiv.innerHTML = `
      <p>菜单</p>
      <ul>
        <li style="line-height:26px" code="hideRelationNode">隐藏入度关联节点</li>
        <li style="line-height:26px" code="hideNode">隐藏节点</li>
        <li style="line-height:26px" code="deleteNode">删除节点</li>
      </ul>`
    } else {
      outDiv.innerHTML = `
      <p>菜单</p>
      <ul>
        <li style="line-height:26px" code="hideEdge">隐藏边</li>
        <li style="line-height:26px" code="deleteEdge">删除边</li>
      </ul>`
    }
    
    return outDiv
  },
  handleMenuClick(target, item, graph) {
    console.log('item', item);
    let code = target.getAttribute('code');
    if (code === 'hideRelationNode') {
      const edges = item._cfg.edges
      const neighbors = graph.getNeighbors(item, 'source')
      console.log('neighbors', neighbors);
      edges.forEach(element => {
        element.hide()
      });
      neighbors.forEach(element => {
        element.hide()
      });
      item.hide();
    } else if (code === 'hideNode') {
      const edges = item._cfg.edges
      edges.forEach(element => {
        element.hide()
      });
      item.hide();
    } else if (code === 'deleteNode') {
      graph.removeItem(item);
    } else if (code === 'deleteEdge') {
      graph.removeItem(item);
    } else if (code === 'hideEdge') {
      graph.hideItem(item);
    }
  },
});

export {
  tooltip,
  menu
}