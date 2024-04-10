<template>
  <div class="alarm-detail">
    <titleCom title-name="今日过车详情" :title-bg="require('@/assets/images/ic_home_alarmDetail.png')" />
    <div class="alarm-detail_img">
      <img :src="src">
    </div>
    <div class="alarm-detail_content">
      <el-scrollbar style="height: 160px; width: 100%;">
        <WTable
          ref="mtable"
          :table-data="defectVoList"
          :stripe="true"
          :border="false"
          :columns="columns"
          :show-page="true"
          :size="'mini'"
          :total="total"
          :page="formData"
          :show-num="true"
          :header-cell-style="{ background: '#002C75' }"
          :row-class-name="({ row, rowIndex }) => (rowIndex % 2 == 0 ? '' : 'warning-row')
          "
          @pageChange="getList"
        />
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import titleCom from './title.vue'
import { WTable } from '@common-ui/w-form'
import { columns } from '../config'
import { getTodayVehicle } from "@/api/interface/index";
export default {
  components: {
    titleCom,
    WTable
  },

  // props: {
  //   defectVoList: {
  //     type: Array,
  //     default: () => {
  //       return []
  //     }
  //   }
  // },

  data() {
    return {
      src: require("../../../assets/images/subway.png"),
      columns: columns(this),
      total: 0,
      defectVoList:[],
      defectVoListShow: [],
      formData :{
        pageIndex: 1,
        pageSize: 10,
      }
    }
  },

  // watch: {
  //   defectVoList(val) {
  //     this.defectVoListShow = val
  //     console.log('打印数据defectVoList:', val)
  //   }
  // },

  created() {
    this.getList();
  },

  methods: {
    getList() {
      const params = {
        ...this.formData
      };
      // let time = this.formData["minBeginTime,maxBeginTime"];

      // if (time.length > 0) {
      //   params["minBeginTime"] = time[0];
      //   params["maxBeginTime"] = time[1];
      // }

      getTodayVehicle(params).then((res) => {
        this.defectVoList = res.data.list;
        this.total = parseInt(res.data.totalCount);
      });
    },
  }
}
</script>

<style scoped lang='scss'>
.alarm-detail {
  width: 100%;
  margin-top: 24px;
  color: #fff;

  &_img {
    width: 100%;
    height: 70px;
    padding-top: 10px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  &_content {
    width: 100%;
    background: #001344;
    margin-top: 24px;
  }
}
</style>
