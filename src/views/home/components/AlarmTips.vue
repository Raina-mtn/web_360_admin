<template>
  <div class="alarm-tips">
    <titleCom title-name="报警提示" :title-bg="require('@/assets/images/ic_home_alarmHint.png')" />
    <div class="alarm-tips_content">
      <div v-for="(item, index) in showList" :key="item.taskId + index" class="tips-item">
        <div class="tips-item__left item-center">
          <div class="left-label center" :style="{background: rankStyle(item.gradeStr).bg}">
            <div class="circle" :style="{background: rankStyle(item.gradeStr).color}" />
          </div>
          <div class="left-name">
            {{ item.carriageNumber }}号车厢{{ item.partsName }}{{ item.itemName }}{{ item.errorName }}
          </div>
        </div>
        <div class="tips-item__right item-center">
          <div class="right-rank center" :style="{color: rankStyle(item.gradeStr).color, background: rankStyle(item.gradeStr).bg}">
            {{ item.gradeStr }}
          </div>
          <div class="right-btn" @click="toDetail(item)">
            详情
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import titleCom from './title.vue'
export default {
  components: {
    titleCom
  },

  props: {
    tipsList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },

  data () {
    return {
      showList: []
    }
  },

  watch: {
    tipsList: {
      deep: true,
      handler (val) {
        this.showList = [...val]
      }
    }
  },

  created () {

  },

  methods: {
    rankStyle (val) {
      const highRank = {
        bg: 'rgba(238,102,102,0.5)',
        color: '#EE6666'
      }
      const mediumRank = {
        bg: 'rgba(250,200,88,0.5)',
        color: '#FAC858'
      }
      const lowRank = {
        bg: 'rgba(115,192,222,0.5)',
        color: '#73C0DE'
      }
      let styles = {
        bg: 'rgba(115,192,222,0.5)',
        color: '#73C0DE'
      }
      if (val === '高风险') {
        styles = highRank
      }
      if (val === '中风险') {
        styles = mediumRank
      }
      if (val === '低风险') {
        styles = lowRank
      }
      return styles
    },

    toDetail (item) {
      this.$router.push({ name: 'Defect', query: { plateNumber: item.plateNumber } });
    }
  }
}
</script>

<style scoped lang='scss'>
  .alarm-tips {
    color: #fff;

    &_content {
      width: 461px;
      height: 168px;
      background: #001344;
      margin-top: 10px;
      padding: 16px;
      overflow-y: auto;

      .tips-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 12px;

        &__left {
          .left-label {
            width: 14px;
            height: 14px;
            background: rgba(238,102,102,0.4);
            border-radius: 50%;

            .circle {
              width: 6px;
              height: 6px;
              border-radius: 50%;
              background: #EE6666;
            }
          }

          .left-name {
            max-width: 260px;
            font-size: 14px;
            color: #FFFFFF;
            margin-left: 8px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }

        &__right {
          .right-rank {
            padding: 2px 3px;
            border-radius: 2px;
            font-size: 12px;
            background: rgba(238,102,102,0.4);
            color: #EE6666;
          }

          .right-btn {
            cursor: pointer;
            font-size: 14px;
            color: #1CDAFC;
            margin-left: 8px;
          }
        }
      }
    }

    .item-center {
      display: flex;
      align-items: center;
    }

    .center {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
</style>
