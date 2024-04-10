<template>
  <div class="train-number">
    <titleCom title-name="今日过车次数" :title-bg="require('@/assets/images/ic_home_trips.png')" />
    <div class="train-number_content">
      <template v-if="nums > 9">
        <div 
          v-for="(item, index) in showNums"
          :key="index"
          class="counts"
          :class="(index === 1 && showNums.length === 2) ? 'right' : ''"
        >
          {{ item }}
        </div>
      </template>
      <template v-else>
        <div class="counts">
          {{ showNums }}
        </div>
      </template>
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
    count: {
      type: [Number, String],
      default: 0
    }
  },

  data () {
    return {
      nums: 12
    }
  },

  computed: {
    showNums: function () {
      if (!this.count) {
        return '0'
      }
      if (this.count > 9) {
        return String(this.count).split('')
      } else {
        return String(this.count)
      }
    }
  },

  created () {

  },

  methods: {

  }
}
</script>

<style scoped lang='scss'>
.train-number {
  &_content{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 256px;
    height: 168px;
    background: url('~@/assets/images/bg_home_check.png') no-repeat;
    background-size: 256px 168px;
    margin: 10px 10px 0 0;
    padding-top: 16px;
    .counts{
      display: flex;
      align-items: center;
      justify-content: center;
      background: url('~@/assets/images/bg_num.png') no-repeat;
      background-size: 70px 110px;
      width: 70px;
      height: 110px;
      text-align: center;
      margin: auto;
      font-size: 64px;
      color: #fff;
      
    }

    .right {
      margin-left: -24px;
    }
  }
}
  
</style>
