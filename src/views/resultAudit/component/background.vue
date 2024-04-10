<!--
 * @Date: 2022-07-26 14:21:30
 * @LastEditors: zhusisheng zhusisheng@shenhaoinfo.com
 * @LastEditTime: 2023-12-04 17:51:47
 * @FilePath: \web_360_admin\src\views\resultAudit\component\background.vue
-->
<template>
  <div class="outer-container">
    <div v-for="(item, index) in cpuCarriages" :key="index" class="background-item">
      <img :src="img(index)" alt="">
      <div class="tip">
        {{ item }}
      </div>
    </div>
  </div>
</template>
<script>
  
export default {
  props: {
    carriages: {
      type: Array,
      default:function () {
        return []
      }
    },
    position: {
      type: String,
      default:'TOP'
    }
  },
  data() {
    return {
      pics: {
        TOP: { start: require('@/assets/images/pic_subway-top_start.png'), mid: require('@/assets/images/pic_subway-top_mid.png'), end: require('@/assets/images/pic_subway-top_end.png')},
        BOTTOM: { start: require('@/assets/images/pic_subway-bottom_start.png'), mid: require('@/assets/images/pic_subway-bottom_mid.png'), end: require('@/assets/images/pic_subway-bottom_end.png')},
        LEFT: { start: require('@/assets/images/pic_subway-left_start.png'), mid: require('@/assets/images/pic_subway-left_mid.png'), end: require('@/assets/images/pic_subway-left_end.png')},
        RIGHT: { start: require('@/assets/images/pic_subway-left_start.png'), mid: require('@/assets/images/pic_subway-left_mid.png'), end: require('@/assets/images/pic_subway-left_end.png')},
      },
      innerSignDivList: [],
    };
  },
  computed:{
    img(){
      return function (index) {
        let imgs = this.pics[this.position]
        if(index == 0){
          return imgs.start
        }
        if(index == this.carriages.length - 1 ){
          return imgs.end
        }
        return imgs.mid
      }
    },
    cpuCarriages(){
      return this.carriages
    }
  },
  mounted() {

  },
  methods: {
  },
};
</script>
  <style lang="scss" scoped>
  .outer-container {
    width: 100%;
    overflow: hidden;
    height: 100%;
    position: absolute;
    display: flex;
    .background-item{
      flex: 1;
      position: relative;
     img {
      width: 100%;
      height: 100%;
     }
     .tip {
      position: absolute;
      z-index: 1;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      padding: 5px;
      border: 2px solid #08C4D5;
      border-radius: 3px;
     }

    }
    pointer-events: none;
  }
  </style>
  