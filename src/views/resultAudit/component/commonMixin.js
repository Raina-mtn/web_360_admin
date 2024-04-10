export const commonMixin = {
  data(){
    return{
      settings: {
        zoomOptions: {
          zoom: true,
          zoomVal: 1,
          moveX: 0,
          moveY: 0,
        },
        currentPointer: {
          mouseX: 0,
          mouseY: 0,
        },
        playOptions: {
          speed: 1, //播放速度
          timer: null,
        },
        scrollOptions: {
          scrollTop: 0,
          scrollRate: 0,
          imgRate: 0,
        },
        markEdit: false,
        collapsed: false,
        detailImgHeight: 0, // 组件高度
      },
    }
  },
  methods:{
    // 缩放移动变化
    zoomChange({ mouseX, mouseY, zoomVal, moveX, moveY }) {
      let { zoomOptions, currentPointer } = this.settings;
      if (zoomVal) zoomOptions.zoomVal = zoomVal;
      if (moveX) zoomOptions.moveX = moveX;
      if (moveY) zoomOptions.moveY = moveY;
      if (zoomVal) zoomOptions.zoomVal = zoomVal;
      if (mouseX) currentPointer.mouseX = mouseX;
      if (mouseY) currentPointer.mouseY = mouseY;
    },

    // 滚动变化
    scrollChange({ scrollLeft, scrollTop, scrollRate, imgRate }) {
      let { scrollOptions } = this.settings;

      if (scrollTop !== null && scrollTop !== scrollOptions.scrollTop) {
        scrollOptions.scrollTop = scrollTop;
      }

      if (scrollRate !== null && scrollRate !== scrollOptions.scrollRate) {
        scrollOptions.scrollRate = scrollRate;
      }

      if (imgRate !== null && imgRate !== scrollOptions.imgRate) {
        scrollOptions.imgRate = imgRate;
      }
    },

    //放大镜
    enlarge() {
      this.settings.zoomOptions.zoom = !this.settings.zoomOptions.zoom;
    },

    // 播放
    play() {
      let { playOptions, scrollOptions } = this.settings
      if (playOptions.timer) {
        clearInterval(playOptions.timer);
        playOptions.timer = null;
        return;
      }
      playOptions.timer = setInterval(() => {
        if (scrollOptions.scrollRate >= 1) {
          clearInterval(playOptions.timer);
          playOptions.timer = null;
          return;
        }
        let scrollRate = scrollOptions.scrollRate + playOptions.speed / 100;
        if (scrollRate >= 1) {
          scrollOptions.scrollRate = 1;
        } else {
          scrollOptions.scrollRate = scrollRate;
        }
      }, 300);
    },
  }
}