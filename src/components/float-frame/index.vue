<!--
 * @Date: 2022-05-31 14:40:51
 * @LastEditors: zhusisheng zhusisheng@shenhaoinfo.com
 * @LastEditTime: 2022-07-13 14:46:53
 * @FilePath: \web-rail-independ\src\components\float-frame\index.vue
-->
<template>
  <el-collapse class="wrapper">
    <el-collapse-item style="text-align:center">
      <template slot="title">
        <p class="title">
          {{ $t('navbar.importTitle',[importTaskCount, patrolTaskCount]) }}
        </p>
      </template>
      <div v-for="(item,index) in tableData.slice(0,5)" :key="index" class="progress">
        <div class="task-name ellipsis" :title="item.filePath">
          {{ item.filePath.substring(item.filePath.indexOf('/')+1) }}
        </div>
        <p class="task-remainTime">
          预计剩余时间：{{ item.time }}
        </p>
        <el-progress :percentage="item.progress" color="#00D300" class="progress" />
      </div>
      <el-button type="primary" size="mini" @click="importRecord">
        {{ $t('navbar.importWarpText2') }}
      </el-button>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
export default {
  name:'FloatFrame',
  data() {
    return {
      tableData:[],
      total:0,
      patrolTaskCount:0,
      importTaskCount:0,
    }
  },
  computed: {
    getTableData() {
      return this.$store.state.importRecord.tableData;
    },
    getPatrolTaskCount() {
      return this.$store.state.importRecord.patrolTaskCount;
    },
    getImportTaskCount() {
      return this.$store.state.importRecord.importTaskCount;
    },
  },
  watch: {
    getTableData:{
      handler(data) {
        this.tableData = data.filter(function(item){
          return item.status === "RUNNING"
        });
        this.tableData.forEach(item => {
          if(item.remainingTime === '0'){
            item.time = '--'
          }else if(item.remainingTime !== '-1'){
            var hours = parseInt(item.remainingTime/3600) === 0 ? '00' : parseInt(item.remainingTime/3600);
            var mins = parseInt(item.remainingTime/60%60) === 0 ? '00' : parseInt(item.remainingTime/60%60);
            var snds = parseInt(item.remainingTime%60) === 0 ? '00' : parseInt(item.remainingTime%60);
            item.time = `${hours}:${mins}:${snds}`
          }
        });
        this.total = this.tableData.length;
      },
      immediate: true,
      deep:true
    },
    getPatrolTaskCount:{
      handler(data) {
        this.patrolTaskCount = data;
      },
      immediate: true,
      deep:true
    },
    getImportTaskCount:{
      handler(data) {
        this.importTaskCount = data;
      },
      immediate: true,
      deep:true
    }
  },
  methods: {
    // importRecord(){
    //   this.$router.push({
    //     path:'/import'
    //   });
    // }
  },
}
</script>

<style scoped lang="scss">
.wrapper{
  width:350px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 4px;
  .title{
    padding-left: 10px;
  }
  .progress{
    padding-left: 10px;
  }
  .task-name{
    float: left;
  }
}
.ellipsis {
  width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

</style>
