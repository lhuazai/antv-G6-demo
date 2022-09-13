import G6 from '@antv/g6';
G6.registerNode(
  'circle-animate',
  {
    afterDraw(cfg, group) {
      const shape = group.get('children')[0];
      shape.animate(
        (ratio) => {
          const diff = ratio <= 0.5 ? ratio * 10 : (1 - ratio) * 10;
          return {
            r: cfg.size / 2 + diff,
          };
        },
        {
          repeat: true,
          duration: 3000,
          easing: 'easeCubic',
        },
      );
    },
  },
  'circle',
);
G6.registerBehavior('click-add-edge', {
  // Set the events and the corresponding responsing function for this behavior
  getEvents() {
    return {
      'node:click': 'onClick', // The event is canvas:click, the responsing function is onClick
      mousemove: 'onMousemove', // The event is mousemove, the responsing function is onMousemove
      'edge:click': 'onEdgeClick', // The event is edge:click, the responsing function is onEdgeClick
    };
  },
  // The responsing function for node:click defined in getEvents
  onClick(ev) {
    const self = this;
    const node = ev.item;
    const graph = self.graph;
    // The position where the mouse clicks
    const point = { x: ev.x, y: ev.y };
    const model = node.getModel();
    if (self.addingEdge && self.edge) {
      graph.updateItem(self.edge, {
        target: model.id,
      });

      self.edge = null;
      self.addingEdge = false;
    } else {
      // Add anew edge, the end node is the current node user clicks
      self.edge = graph.addItem('edge', {
        source: model.id,
        target: model.id,
        style: {
          lineWidth: 4,
          stroke: '#FF4500',
          opacity: 0.6,
          endArrow: {
            path: 'M 0,0 L 8,4 L 8,-4 Z',
            fill: '#00CED1',
          },
        }
      });
      self.addingEdge = true;
    }
  },
  // The responsing function for mousemove defined in getEvents
  onMousemove(ev) {
    const self = this;
    // The current position the mouse clicks
    const point = { x: ev.x, y: ev.y };
    if (self.addingEdge && self.edge) {
      // Update the end node to the current node the mouse clicks
      self.graph.updateItem(self.edge, {
        target: point,
      });
    }
  },
  // The responsing function for edge:click defined in getEvents
  onEdgeClick(ev) {
    const self = this;
    const currentEdge = ev.item;
    if (self.addingEdge && self.edge === currentEdge) {
      self.graph.removeItem(self.edge);
      self.edge = null;
      self.addingEdge = false;
    }
  },
});
G6.registerNode('iconfont', {
  draw(cfg, group) {
    const { backgroundConfig: backgroundStyle, style, labelCfg: labelStyle } = cfg;
    if (backgroundStyle) {
      group.addShape('circle', {
        attrs: {
          x: 0,
          y: 0,
          r: cfg.size,
          ...backgroundStyle,
        },
        // must be assigned in G6 3.3 and later versions. it can be any value you want
        name: 'circle-shape',
      });
    }

    const keyShape = group.addShape('text', {
      attrs: {
        x: 0,
        y: 0,
        fontFamily: 'iconfont-jiraiya', // 对应css里面的font-family: "iconfont";
        textAlign: 'center',
        textBaseline: 'middle',
        text: cfg.text,
        fontSize: cfg.size,
        ...style,
      },
      // must be assigned in G6 3.3 and later versions. it can be any value you want
      name: 'text-shape1',
    });
    const labelY = backgroundStyle ? cfg.size * 2 : cfg.size;

    group.addShape('text', {
      attrs: {
        x: 0,
        y: labelY,
        textAlign: 'center',
        text: cfg.label,
        ...labelStyle.style,
      },
      // must be assigned in G6 3.3 and later versions. it can be any value you want
      name: 'text-shape1',
    });
    return keyShape;
  },
});
// Background Animation
G6.registerNode(
  'background-animate',
  {
    afterDraw(cfg, group) {
      const r = cfg.size / 2;
      const back1 = group.addShape('circle', {
        zIndex: -3,
        attrs: {
          x: 0,
          y: 0,
          r,
          fill: cfg.color,
          opacity: 0.6,
        },
        name: 'back1-shape',
      });
      const back2 = group.addShape('circle', {
        zIndex: -2,
        attrs: {
          x: 0,
          y: 0,
          r,
          fill: cfg.color,
          opacity: 0.6,
        },
        name: 'back2-shape',
      });
      const back3 = group.addShape('circle', {
        zIndex: -1,
        attrs: {
          x: 0,
          y: 0,
          r,
          fill: cfg.color,
          opacity: 0.6,
        },
        name: 'back3-shape',
      });
      group.sort(); // Sort according to the zIndex
      back1.animate(
        {
          // Magnifying and disappearing
          r: r + 10,
          opacity: 0.1,
        },
        {
          duration: 3000,
          easing: 'easeCubic',
          delay: 0,
          repeat: true, // repeat
        },
      ); // no delay
      back2.animate(
        {
          // Magnifying and disappearing
          r: r + 10,
          opacity: 0.1,
        },
        {
          duration: 3000,
          easing: 'easeCubic',
          delay: 1000,
          repeat: true, // repeat
        },
      ); // 1s delay
      back3.animate(
        {
          // Magnifying and disappearing
          r: r + 10,
          opacity: 0.1,
        },
        {
          duration: 3000,
          easing: 'easeCubic',
          delay: 2000,
          repeat: true, // repeat
        },
      ); // 3s delay
    },
  },
  'circle',
);