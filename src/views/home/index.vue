<template>
  <div class="wrapper">
    <div class="wrapper-top">
      <el-radio-group v-model="alarmDate" @change="dateChange">
        <el-radio v-for="item in alarmDateList" :key="item.value" :label="item.value">
          {{ item.label }}
        </el-radio>
      </el-radio-group>
      <el-date-picker
        v-model="daterange"
        type="daterange"
        size="mini"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd HH:mm:ss"
        :disabled="alarmDate !== 'daterange'"
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        style="width:15%;margin-left:20px;"
        @change="daterangeChange"
      />
    </div>
    <div class="wrapper_center">
      <div class="vehicleTrips">
        <titleCom title-name="过检车次" :title-bg="require('@/assets/images/ic_home_trips.png')" />
        <div class="vehicleTripsWrapper" @click="$refs.vehicleDialog.openDialog(params)">
          <div class="count">
            {{ data.taskCount }}
          </div>
        </div>
      </div>
      <div class="item">
        <titleCom title-name="报警分布" :title-bg="require('@/assets/images/ic_home_alarmDistribution.png')" />
        <div id="itemWrapper" class="itemWrapper">
          <Chart id="itemChart" ref="itemChart" parent-id="itemWrapper" width="90%" height="100%" :option="itemOption" :nodata="data.itemVoList.length===0" />
        </div>
      </div>
      <div class="grade">
        <titleCom title-name="报警等级" :title-bg="require('@/assets/images/ic_home_alarmNumber.png')" />
        <div id="gradeWrapper" class="gradeWrapper">
          <Chart id="gradeChart" ref="gradeChart" parent-id="gradeWrapper" width="90%" height="100%" :option="gradeOption" :nodata="data.gradeVoList.length===0" />
        </div>
      </div>
    </div>
    <div class="wrapper_bottom">
      <div class="left">
        <div class="alarmDetail">
          <titleCom title-name="故障列表" :title-bg="require('@/assets/images/ic_home_alarmDetail.png')" />
          <img class="position_img" :src="src">
          
          <el-scrollbar style="height:80%;">
            <WTable
              ref="mtable"
              :table-data="defectVoList" 
              :stripe="true"
              :border="false"
              :page="params"
              :columns="columns"
              :size="'mini'"
              :total="total"
              :show-num="true"
              :header-cell-style="{ background: '#002C75' }"
              :row-class-name="
                ({ row, rowIndex }) => (rowIndex % 2 == 0 ? '' : 'warning-row')
              "
              @pageChange="pageChange"
            />
          </el-scrollbar>
        </div>
      </div>
      <div class="right">
        <div class="uncheckedAlarm">
          <titleCom title-name="未检列车（天）" :title-bg="require('@/assets/images/ic_home_alarmHint.png')" />
          <div class="chart">
            <Chart id="uncheckedChart" ref="uncheckedChart" parent-id="uncheckedChart" width="90%" height="90%" :option="vehicleOption" :nodata="data.vehicleVoList.length===0" />
          </div>
        </div>
        <div class="riskRank">
          <titleCom title-name="车故障数排行" :title-bg="require('@/assets/images/ic_home_alarmNumber.png')" />
          <div class="chart">
            <Chart id="riskRankChart" ref="riskRankChart" parent-id="riskRankChart" width="90%" height="100%" :option="vehicleDefectOption" :nodata="data.vehicleDefectVoList.length===0" />
          </div>
        </div>
      </div>
    </div>
    <VehicleDialog ref="vehicleDialog" />
  </div>
</template>

<script>
import dayjs from 'dayjs';
import Chart from '@/components/Chart/index.vue';
import titleCom from './components/title.vue'
import {WTable} from '@common-ui/w-form'
import {columns,recheckStatusList,alarmDateList} from './config'
import {defectGradeObj,} from '@/utils/config'
import VehicleDialog from './components/vehicleDialog.vue'
import {barOption,pieOption,rowBarOption,stackBarOption} from './components/chartConfig'
// import NoData from '@/components/NoData/index.vue'
export default {
  components:{
    titleCom,
    WTable,
    Chart,
    VehicleDialog,
    // NoData,
  },
  data() {
    return {
      src: require("../../assets/images/subway.png"),
      columns:columns(this),
      alarmDate:'daterange',
      recheckStatusList,
      alarmDateList,
      daterange:[dayjs().subtract(1,'day').format('YYYY-MM-DD HH:mm:ss'),dayjs().format('YYYY-MM-DD HH:mm:ss')],
      total:0,
      params:{
        beginTime:`${dayjs().subtract(1,'day').format('YYYY-MM-DD HH:mm:ss')}`,
        endTime:`${dayjs().format('YYYY-MM-DD HH:mm:ss')}`,
        pageIndex:1,
        pageSize:10,
      },
      defectGradeObj,
      defectVoList:[],//故障列表
      data:{
        taskCount:0,//过检车次
        itemVoList:[],//报警分布
        gradeVoList:[],//报警等级
        vehicleDefectVoList:[],//车故障数排行
        vehicleVoList:[],//未检列车
        online:false,
      },
      itemOption:{},//报警分布
      gradeOption:{},//报警等级
      vehicleOption:{},//未检列车
      vehicleDefectOption:{},//车故障数排行
      colorOpacityList:['rgba(82, 196, 26, 0.4)', 'rgba(115, 192, 222, 0.4)', 'rgba(250, 200, 88, 0.4)', 'rgba(238, 102, 102, 0.4)'],
      colorList:['#52C41A', '#73C0DE', '#FAC858', '#FF4D4F'],
    }
  },
  computed:{
    getData(){
      return this.$store.state.home.data;
    },
    getDefectList(){
      return this.$store.state.home.defectVoList;
    },
    getDefectListTotal(){
      return this.$store.state.home.total;
    },
    
  },
  watch:{
    getData:{
      handler(data) {
        this.data = data;
        this.gradeOption =barOption(data.gradeVoList)
        this.itemOption =pieOption(data.itemVoList)
        this.vehicleOption =rowBarOption(data.vehicleVoList)
        this.vehicleDefectOption =stackBarOption(data.vehicleDefectVoList)
        // if(!data.online){
        //   this.$message({
        //     message: '通信已断开，请重启服务',
        //     type: 'error'
        //   });
        // }
      },
      // immediate: true,
      deep:true
    },
    getDefectList:{
      handler(data) {
        this.defectVoList = data;
      },
      // immediate: true,
      deep:true
    },
    getDefectListTotal:{
      handler(data) {
        this.total = data;
      },
      // immediate: true,
      deep:true
    },
  },
  mounted() {
    console.log('mounted')
    this.$store.dispatch("home/polling", this.params);
    this.$store.dispatch("home/defectPolling", this.params);
  },
  beforeDestroy(){
    clearTimeout(this.$store.state.home.timer)
    clearTimeout(this.$store.state.home.defectTimer)
  },
  methods: {
    dateChange(val){
      if(val!=='daterange'){
        this.daterange = [
          dayjs().subtract(1,val).format('YYYY-MM-DD HH:mm:ss'),
          dayjs().format('YYYY-MM-DD HH:mm:ss')
        ]
      } 
      this.daterangeChange()
    },

    daterangeChange(){
      this.params.beginTime = this.daterange[0]
      this.params.endTime = this.daterange[1]
      this.getList()
    },

    getList(){
      this.$store.dispatch("home/polling", this.params);
      this.$store.dispatch("home/defectPolling", this.params);
    },

    pageChange(){
      this.$store.dispatch("home/defectPolling", this.params);
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper{
  height: calc(100vh - 62px);
  .wrapper-top{
    height: 3%;
    text-align: right;
    margin-right: 20px;
  }
  .wrapper_center{
    margin: 20px;
    height: 300px;
    display: flex;
    justify-content: space-around;
    flex-flow: row nowrap;
    .vehicleTrips{
      margin: 10px 0px;
      width: 400px;
      height: 250px;
      // width: 20%;
      // height: 100%;
      .vehicleTripsWrapper{
        width: 90%;
        height: calc(90% - 38px);
        background: url('~@/assets/images/bg_home_check.png') no-repeat;
        background-size: 100% 100%;
        margin: 10px 10px 0 0;
        padding-top: 30px;
        .count{
          text-align: center;
          margin: auto;
          font-size: 100px;
          color: #fff;
          
        }
      }
    }
    .grade{
      margin: 10px 0px;
      width: 550px;
      height: 250px;
      // width: 35%;
      // height: 90%;
      .gradeWrapper{
        margin: 10px 0px;
        width: 100%;
        height: calc(100% - 38px);
        background-color: #001344;
      }
    }
    .item{
      margin: 10px 0px;
      width: 550px;
      height: 250px;
      // width: 35%;
      // height: 90%;
      .itemWrapper{
        margin-top: 10px;
        width: 100%;
        height: calc(100% - 38px);
        background-color: #001344;
      }
    }
  }
  .wrapper_bottom{
    margin:20px;
    height: 500px;
    display: flex;
    flex-direction: row;
    .left{
      height: 100%;
      width: 60%;
      margin-right: 20px;
      .alarmDetail{
        height: 100%;
        .position_img{
          margin-top: 10px;
          width: 100%;
          height: 40px;
        }
      }
      
    }
    .right{
      height: 100%;
      width: 40%;
      display: flex;
      flex-direction: column;
      .chart{
        height: calc(100% - 20px);
        background-color: #001344;
      }
      .uncheckedAlarm{
        height: 50%;
        margin: 10px 0px;
      }
      .riskRank{
        height: 50%;
        margin: 10px 0px;
        
      }
    }
    }
  }
  ::v-deep .el-scrollbar__wrap{
    overflow-x: hidden !important;
  }
</style>