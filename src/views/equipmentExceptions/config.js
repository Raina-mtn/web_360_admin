// import {processStateObj} from '@/utils/config'
// const colorList = ['#52C41A','#73C0DE','#FAC858','#FF4D4F']
export const formColumns = [{
  label: '设备名称',
  prop: 'userNameLike',
  span: 4
}, 
// {
//   label: '处理状态',
//   prop: 'status',
//   el: 'select',
//   options:processState,
//   clearable: true,
//   span: 6
// }, 
{
  label: '故障时间',
  prop: 'minReportTime,maxReportTime',
  el: 'date-picker',
  type:"daterange",
  clearable: true,
  span: 6,
  valueFormat: 'yyyy-MM-dd HH:mm:ss'
},{
  prop:'btns',
  span:6
}]
export const columns = (that) => [{
  label: '设备名称',
  prop: 'deviceName'
}, {
  label: '在线状态',
  prop: 'error'
}, {
  label: '故障时间',
  prop: 'reportTime'
}, 
// {
//   label: '处理状态',
//   render(h,{row}) {
//     return <span style={`color:${row.status === 'FINISHED' ? colorList[0] : colorList[3]}`}>{processStateObj[row.status]}</span>
//   },
// }, 
{
  label: '操作',
  prop: 'realName',
  render: (h, { row }) => {
    return <el-button type='text' onClick={() => {that.openDialog(row);}} style="color:#1CDAFC">详情</el-button>
  }
}]
export const formColumnsDialog = [{
  label: '设备名称',
  prop: 'deviceName',
  el: 'input',
  disabled:true,
  clearable: true,
  span: 20
},{
  label: '故障详情',
  prop: 'error',
  el: 'input',
  disabled:true,
  clearable: true,
  span: 20
},{
  label: '故障时间',
  prop: 'reportTime',
  el: 'input',
  disabled:true,
  clearable: true,
  span: 20
},{
  label: '处理进度',
  prop: 'status',
  el: 'input',
  disabled:true,
  clearable: true,
  span: 20
}]