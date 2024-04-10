// const SIZE_CHANGE = 'sizeChange'
export default class DragZoom {
  diffX = 0;
  diffY = 0;
  mouseX = 0;
  mouseY = 0;
  translateX = 0;
  translateY = 0;
  isDrawing = false;
  scale = 1;
  diff = 0.01;
  isUpward = false;
  minScale = null;
  
  constructor(){}

  refreshMousePositionDiffValue = () => {
    this.diffX = this.mouseX - this.translateX;
    this.diffY = this.mouseY - this.translateY;
  };

  refreshTargetStyle = (vNode) => {
    if(!this.sizeChange)return;
    this.sizeChange({
      translateX: this.translateX,
      translateY: this.translateY,
      scale: this.scale,
      isDrawing: this.isDrawing,
    })

    // this.emitEvent(vNode, "sizeChange", {
    //   translateX: this.translateX,
    //   translateY: this.translateY,
    //   scale: this.scale,
    //   isDrawing: this.isDrawing,
    // });
  };
  
  setOptions(els,listener){
    els.map(el => {
      this.inserted(el)
    })

    this.sizeChange = listener
  }

  inserted = (el, binding, vNode) => {
    let drawEl = el;
    const parent = drawEl.parentElement;
    parent.addEventListener("mousemove", (e) => {
      if (drawEl.dataset.freezed == "true") {
        return;
      }
      this.mouseX = e.x - parent.getBoundingClientRect().left;
      this.mouseY = e.y - parent.getBoundingClientRect().top;

      if (this.isDrawing) {
        this.translateX = this.mouseX - this.diffX;
        this.translateY = this.mouseY - this.diffY;

        this.refreshTargetStyle(vNode);
      }
    });

    parent.addEventListener("mousedown", () => {
      if (drawEl.dataset.freezed == "true") {
        return;
      }

      console.log("mousedown>>>>>>>>>>>>>>>>>>>>>");
      this.refreshMousePositionDiffValue();
      this.isDrawing = true;
      this.refreshTargetStyle(vNode);
    });

    window.addEventListener("mouseup", () => {
      if (drawEl.dataset.freezed == "true") {
        return;
      }
      this.isDrawing = false;
      // refreshTargetStyle();
    });

    let mouseZoom = (e) => {
      if (drawEl.dataset.freezed == "true") {
        return;
      }

      e = e || window.event;
      // e.stopPropagation();
      // e.preventDefault()
      let scale
      let isUpward
      if (e.wheelDelta) {
        isUpward= e.wheelDelta > 0;
      } else if (e.detail) {
        isUpward = e.detail < 0;
      }

      let oldWidth = this.scale * drawEl.clientWidth;
      let oldHeight = this.scale * drawEl.clientHeight;

      if (isUpward) {
        scale = this.scale + this.diff;
      } else if (!isUpward && this.scale > 0.05) {
        scale = this.scale - this.diff;
      }
      if(this.minScale && scale < this.minScale){
        return;
      }

      this.scale = scale;
      this.isUpward = isUpward

      let newWidth = this.scale * drawEl.clientWidth;
      let newHeight = this.scale * drawEl.clientHeight;

      //刷新鼠标距离目标元素缩放点坐标
      this.refreshMousePositionDiffValue();

      /**
       * 重新计算缩放偏移量
       */
      this.translateX -= (newWidth - oldWidth) * (this.diffX / oldWidth);
      this.translateY -= (newHeight - oldHeight) * (this.diffY / oldHeight);

      this.refreshTargetStyle(vNode);
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
      this.scale =
        1 - (drawEl.clientHeight - parent.clientHeight) / drawEl.clientHeight;
    }

    //设置初始样式
    drawEl.style.transformOrigin = "0 0";

    this.refreshTargetStyle(vNode);
  };

  emitEvent(vNode, eventName, e) {
    if (vNode.componentInstance) {
      vNode.componentInstance.$emit(eventName, { detail: e }); // use {detail:} to be uniform
    } else {
      vNode.elm.dispatchEvent(new CustomEvent(eventName, { detail: e }));
    }
  }
}
