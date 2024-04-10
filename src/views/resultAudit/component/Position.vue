<!--
 * @Date: 2022-07-26 14:21:30
 * @LastEditors: zhusisheng zhusisheng@shenhaoinfo.com
 * @LastEditTime: 2023-12-04 17:51:47
 * @FilePath: \web_360_admin\src\views\resultAudit\component\background.vue
-->
<template>
  <div class="top-left item-content" @click="positionChange('TL-2D')">
    <div class="tip">
      ({{ imgPositionObj[position] }})
    </div>
    <div
      :class="[
        'slider-area',
        position === getActivePosition() ? 'slider-area__active' : '',
      ]"
    >
      <!-- <Slider
                    v-if="'TL-2D' === activePosition"
                    ref="slider-TL-2D"
                    :sign-div-list="getPosition('TL-2D')?.defectMarkList"
                    :scroll-rate.sync="settings.scrollOptions.scrollRate"
                    :img-rate.sync="settings.scrollOptions.imgRate"
                    :img-origin-height="getPosition('TL-2D')?.pixelY"
                    :img-origin-width="getPosition('TL-2D')?.pixelX"
                    :zoom-options="settings.zoomOptions"
                    :active-uid="activeUid"
                  /> -->
      <MarkList
        v-if="showMark"
        :img-origin-height="cpuDetect?.pixelY ?? 0"
        :img-origin-width="cpuDetect?.pixelX ?? 0"
        :active-uid="getActiveUid()"
        :sign-div-list="cpuDetect?.defectMarkList ?? []"
        @markClick="(uid) => positionChange({ uid })"
      />
      <div v-if="position === getActivePosition()" style="width: 100%; height: 100%">
        <slot />
      </div>
    </div>
  </div>
</template>
<script>
import { imgPositionObj } from "@/utils/config";
import MarkList from "./MarkList.vue";

export default {
  components: {
    MarkList,
  },
  inject: ["getTaskInfo", "getActiveUid", "getActivePosition", "getDetectData"],
  props: {
    position: {
      type: String,
      default: "",
      required: true,
    },
    activeUid: {
      type: String,
      default: "",
    },
    showMark:  {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      imgPositionObj,
    };
  },
  computed: {
    cpuDetect() {
      let item = {};
      let list = this.getDetectData();
      if (list && list.length > 0) {
        let curItem = list.find(
          (detectItem) => detectItem.position == this.position
        );
        if (curItem) {
          item = curItem;
        }
      }
      return item;
    },
  },
  mounted() {},
  methods: {
    positionChange({ uid }) {
      this.$emit("change", { position: this.position, uid });
    },
  },
};
</script>
<style lang="scss" scoped>
.item-content {
  width: 100%;
  position: relative;
  border: 1px solid #fff;
  .top {
    width: 100%;
    height: 33%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .tip {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: absolute;
  }

  .slider-area {
    position: absolute;
    width: 100%;
    height: 100%;

    ::before {
      content: "";
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: -99;
      background-color: unset;
      pointer-events: none;
    }
  }

  .slider-area__active {
    ::before {
      background: rgba(238, 102, 102, 0.425);
    }
  }
}
</style>
