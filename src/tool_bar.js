import G6 from '@antv/g6';

const animateCfg = { duration: 200, easing: 'easeCubic' }
const toolbar = new G6.ToolBar({
  position: { x: 10, y: 20 },
  getContent: () => `
  <ul class='g6-component-toolbar'>
    <li  code='zoomOut'>
      <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
        <path d="M658.432 428.736a33.216 33.216 0 0 1-33.152 33.152H525.824v99.456a33.216 33.216 0 0 1-66.304 0V461.888H360.064a33.152 33.152 0 0 1 0-66.304H459.52V296.128a33.152 33.152 0 0 1 66.304 0V395.52H625.28c18.24 0 33.152 14.848 33.152 33.152z m299.776 521.792a43.328 43.328 0 0 1-60.864-6.912l-189.248-220.992a362.368 362.368 0 0 1-215.36 70.848 364.8 364.8 0 1 1 364.8-364.736 363.072 363.072 0 0 1-86.912 235.968l192.384 224.64a43.392 43.392 0 0 1-4.8 61.184z m-465.536-223.36a298.816 298.816 0 0 0 298.432-298.432 298.816 298.816 0 0 0-298.432-298.432A298.816 298.816 0 0 0 194.24 428.8a298.816 298.816 0 0 0 298.432 298.432z"></path>
      </svg>
    </li>
    <li code='zoomIn'>
      <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
        <path d="M639.936 416a32 32 0 0 1-32 32h-256a32 32 0 0 1 0-64h256a32 32 0 0 1 32 32z m289.28 503.552a41.792 41.792 0 0 1-58.752-6.656l-182.656-213.248A349.76 349.76 0 0 1 480 768 352 352 0 1 1 832 416a350.4 350.4 0 0 1-83.84 227.712l185.664 216.768a41.856 41.856 0 0 1-4.608 59.072zM479.936 704c158.784 0 288-129.216 288-288S638.72 128 479.936 128a288.32 288.32 0 0 0-288 288c0 158.784 129.216 288 288 288z" p-id="3853"></path>
      </svg>
    </li>
    <li code='realZoom'>
      <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="24">
        <path d="M384 320v384H320V320h64z m256 0v384H576V320h64zM512 576v64H448V576h64z m0-192v64H448V384h64z m355.968 576H92.032A28.16 28.16 0 0 1 64 931.968V28.032C64 12.608 76.608 0 95.168 0h610.368L896 192v739.968a28.16 28.16 0 0 1-28.032 28.032zM704 64v128h128l-128-128z m128 192h-190.464V64H128v832h704V256z"></path>
      </svg>
    </li>
    <li code='autoZoom'>
      <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="24">
        <path d="M684.288 305.28l0.128-0.64-0.128-0.64V99.712c0-19.84 15.552-35.904 34.496-35.712a35.072 35.072 0 0 1 34.56 35.776v171.008h170.944c19.648 0 35.84 15.488 35.712 34.432a35.072 35.072 0 0 1-35.84 34.496h-204.16l-0.64-0.128a32.768 32.768 0 0 1-20.864-7.552c-1.344-1.024-2.816-1.664-3.968-2.816-0.384-0.32-0.512-0.768-0.832-1.088a33.472 33.472 0 0 1-9.408-22.848zM305.28 64a35.072 35.072 0 0 0-34.56 35.776v171.008H99.776A35.072 35.072 0 0 0 64 305.216c0 18.944 15.872 34.496 35.84 34.496h204.16l0.64-0.128a32.896 32.896 0 0 0 20.864-7.552c1.344-1.024 2.816-1.664 3.904-2.816 0.384-0.32 0.512-0.768 0.768-1.088a33.024 33.024 0 0 0 9.536-22.848l-0.128-0.64 0.128-0.704V99.712A35.008 35.008 0 0 0 305.216 64z m618.944 620.288h-204.16l-0.64 0.128-0.512-0.128c-7.808 0-14.72 3.2-20.48 7.68-1.28 1.024-2.752 1.664-3.84 2.752-0.384 0.32-0.512 0.768-0.832 1.088a33.664 33.664 0 0 0-9.408 22.912l0.128 0.64-0.128 0.704v204.288c0 19.712 15.552 35.904 34.496 35.712a35.072 35.072 0 0 0 34.56-35.776V753.28h170.944c19.648 0 35.84-15.488 35.712-34.432a35.072 35.072 0 0 0-35.84-34.496z m-593.92 11.52c-0.256-0.32-0.384-0.768-0.768-1.088-1.088-1.088-2.56-1.728-3.84-2.688a33.088 33.088 0 0 0-20.48-7.68l-0.512 0.064-0.64-0.128H99.84a35.072 35.072 0 0 0-35.84 34.496 35.072 35.072 0 0 0 35.712 34.432H270.72v171.008c0 19.84 15.552 35.84 34.56 35.776a35.008 35.008 0 0 0 34.432-35.712V720l-0.128-0.64 0.128-0.704a33.344 33.344 0 0 0-9.472-22.848zM512 374.144a137.92 137.92 0 1 0 0.128 275.84A137.92 137.92 0 0 0 512 374.08z"></path>
      </svg>
    </li>
    <li code='show'>
      <svg t="1662707707029" class="icon" viewBox="0 0 1389 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2316" width="20" height="24">
        <path d="M661.80282498 730.57815228a219.3773129 219.3773129 0 1 1 219.37731207-219.3773129 219.91765072 219.91765072 0 0 1-219.37731207 219.3773129zM1233.48064914 511.74117804a451.18240412 451.18240412 0 0 0-26.47657178-78.88937832 584.1056033 584.1056033 0 0 0-78.34904049-137.24590513A520.34569492 520.34569492 0 0 0 954.66613379 153.49694571 645.1638209 645.1638209 0 0 0 661.80282498 90.27737515a644.62348306 644.62348306 0 0 0-291.78263315 63.75990921A523.58772437 523.58772437 0 0 0 194.95061228 295.60589459 586.26695627 586.26695627 0 0 0 116.6015726 432.85179971 445.23868387 445.23868387 0 0 0 90.125 511.74117804a450.10172763 450.10172763 0 0 0 26.4765726 79.42971698 587.34763275 587.34763275 0 0 0 78.34903968 137.2459043 520.34569492 520.34569492 0 0 0 175.06957954 141.56861106 648.40585034 648.40585034 0 0 0 291.78263316 63.75990838A645.1638209 645.1638209 0 0 0 954.66613379 869.98541038a523.04738572 523.04738572 0 0 0 175.06957956-141.56861106 584.1056033 584.1056033 0 0 0 78.34903967-137.78624295 451.18240412 451.18240412 0 0 0 26.47657261-78.88937833zM661.80282498 382.0600083a129.14083191 129.14083191 0 1 0 91.31715666 37.82367444 128.06015543 128.06015543 0 0 0-91.31715666-37.82367444z" fill="#5E5C5C" p-id="2317">
        </path>
      </svg>
    </li>
  </ul>`,
  handleClick: (code, graph) => {
    switch (code) {
      case 'zoomOut':
        graph.zoom(1.2, undefined, true, animateCfg);
        break;
      case 'zoomIn':
        graph.zoom(0.8, undefined, true, animateCfg);
        break;
      case 'realZoom':
        graph.zoomTo(1, undefined, true, animateCfg);
        break;
      case 'autoZoom':
        graph.fitView(20, undefined, true, animateCfg);
        break;
      case 'show':
        graph.render();
        break;
    }
  }
})
export {
  toolbar
}