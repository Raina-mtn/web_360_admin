import {processStateObj } from '@/utils/config'
export const columns =(that)=> [ {
  label: '巡检任务',
  prop: 'taskTitle',
  width: 240,
  'show-overflow-tooltip': true
}, {
  label: '车辆号',
  prop: 'plateNumber'
}, {
  label: '检测地点',
  prop: 'placeName'
}, {
  label: 'A级风险',
  prop: 'highCount'
}, {
  label: 'B级风险',
  prop: 'mediumCount'
}, {
  label: 'C级风险',
  prop: 'lowCount'
}, {
  label: '过车时间',
  prop: 'patrolTime'
}, {
  label: '状态',
  render(h,{row}) {
    return <span style={row.state === 'FINISHED' ? "color:#EE6666" : "color:#ff5555"}>{processStateObj[row.state]}</span>
  }
},{
  label: '操作',
  width: 120,
  render: (h, { row }) => {
    return <el-link 
      type="primary" 
      underline={false} 
      onClick={() => {that.$router.push({ name: 'defectAudit', query: { taskId: row.taskId, position: row.position, patrolRecordId: row.id } });}}
    >
      审核
    </el-link>
  }
}]
//复检执行情况
export const recheckStatusList = [{
  label: '全部',
  value: ''
},{
  label: '待审核',
  value: 'FINISHED'
},{
  label: '已处理',
  value: 'AUDITED'
}]

export const alarmDateList = [{
  label: '按周',
  value: 'week'
},{
  label: '按月',
  value: 'month'
},{
  label: '按年',
  value: 'year'
},{
  label: '起始时间',
  value: 'daterange'
}]