// const SIZE_CHANGE = 'sizeChange'
export default class DragZoom {
  inserted = (el, binding, vNode) => {
    /**
     * 被拖拽物、被缩放元素
     */
    let drawEl = el;

    /**
     * 父元素：容器
     */
    const parent = drawEl.parentElement;

    /**
     * 获取父元素的大小及其相对于视口的位置。
     */
    const parentRect = parent.getBoundingClientRect();

    /**
     * 鼠标相对于目标物缩放点的距离
     */
    let diffX = 0,
      diffY = 0;

    /**
     * 是否正在拖拽
     */
    let isDrawing = false;

    /**
     * 鼠标当前相对于父容器的坐标
     */
    let mouseX = 0,
      mouseY = 0;

    /**
     * 偏移坐标，缩放比例
     */
    let translateX = 0,
      translateY = 0;
    let scale = 1;

    /**
     * 一次缩放的比例
     */
    const diff = 0.01;

    /**
     * 滚轮滚动方向是否向上
     * 向上,缩小
     * 向下，放大
     */
    let isUpward = false;

    /**
     * 刷新鼠标距离目标元素缩放点的距离
     */
    let refreshMousePositionDiffValue = () => {
      diffX = mouseX - translateX;
      diffY = mouseY - translateY;
    };

    /**
     * 更新样式
     */
    let refreshTargetStyle = () => {
      // drawEl.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
      // // // parent.style.cursor = isDrawing ? "move" : "default";
      this.emitEvent(vNode, "sizeChange", {
        translateX,
        translateY,
        scale,
        isDrawing,
      });
    };

    /**
     * 鼠标移动事件
     */
    parent.addEventListener("mousemove", (e) => {
      if(drawEl.dataset.freezed == 'true'){
        return;
      }
      mouseX = e.x - parentRect.left;
      mouseY = e.y - parentRect.top;

      if (isDrawing) {
        translateX = mouseX - diffX;
        translateY = mouseY - diffY;

        refreshTargetStyle();
      }
    });

    /**
     * 鼠标按下事件
     */
    parent.addEventListener("mousedown", () => {
      if(drawEl.dataset.freezed == 'true'){
        return;
      }

      refreshMousePositionDiffValue();
      isDrawing = true;
      refreshTargetStyle();
    });

    /**
     * 鼠标抬起事件
     */
    window.addEventListener("mouseup", () => {
      if(drawEl.dataset.freezed == 'true'){
        return;
      }
      isDrawing = false;
      // refreshTargetStyle();
    });

    /**
     * 鼠标滚动事件
     */

    let mouseZoom = (e) => {
      if(drawEl.dataset.freezed == 'true'){
        return;
      }

      e = e || window.event;
      // e.stopPropagation();
      // e.preventDefault()
      if (e.wheelDelta) {
        isUpward = e.wheelDelta > 0;
      } else if (e.detail) {
        isUpward = e.detail < 0;
      }

      let oldWidth = scale * drawEl.clientWidth;
      let oldHeight = scale * drawEl.clientHeight;

      if (isUpward) {
        scale += diff;
      } else if (!isUpward && scale > 0.05) {
        scale -= diff;
      }

      let newWidth = scale * drawEl.clientWidth;
      let newHeight = scale * drawEl.clientHeight;

      //刷新鼠标距离目标元素缩放点坐标
      refreshMousePositionDiffValue();

      /**
       * 重新计算缩放偏移量
       */
      translateX -= (newWidth - oldWidth) * (diffX / oldWidth);
      translateY -= (newHeight - oldHeight) * (diffY / oldHeight);

      refreshTargetStyle();
    };

    /**
     * 鼠标滚轮兼容
     */

    /*IE、Opera注册事件*/
    if (document.attachEvent) {
      parent.attachEvent("onmousewheel", mouseZoom);
    }
    //Firefox使用addEventListener添加滚轮事件
    if (document.addEventListener) {
      parent.addEventListener("DOMMouseScroll", mouseZoom, false);
    }
    //Safari与Chrome属于同一类型
    parent.onmousewheel = mouseZoom;

    /**
     * 页面初始化
     */

    /**
     * 判断缩放元素高度是否高于容器高度
     * 如果大于，则缩放值容器高度
     */
    if (drawEl.clientHeight > parent.clientHeight) {
      scale =
        1 - (drawEl.clientHeight - parent.clientHeight) / drawEl.clientHeight;
    }

    /**
     * 让目标元素居中显示
     */
    translateX = (parent.clientWidth - scale * drawEl.clientWidth) / 2;
    translateY = (parent.clientHeight - scale * drawEl.clientHeight) / 2;

    //设置初始样式
    drawEl.style.transformOrigin = "0 0";

    /**
     * 当目标元素 是img时，需要禁用元素鼠标可拖拽
     * div user-drag 默认是none 可以不设置
     */
    // drawEl.style.userDrag = "none";
    // drawEl.style.webkitUserDrag = "none";

    // //禁用选则，防止拖拽时出现先择元素内部元素的情况
    // drawEl.style.userSelect = "none";

    refreshTargetStyle();
  };

  emitEvent(vNode, eventName, e) {
    if (vNode.componentInstance) {
      vNode.componentInstance.$emit(eventName, { detail: e }); // use {detail:} to be uniform
    } else {
      vNode.elm.dispatchEvent(new CustomEvent(eventName, { detail: e }));
    }
  }
}
