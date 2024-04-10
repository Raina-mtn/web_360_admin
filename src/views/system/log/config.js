
export const formColumns =[{
  label: '工号',
  prop: 'userNameLike',
  el: 'input',
  placeholder: '请输入工号',
  clearable: true,
  span: 4
}, {
  label: '用户名',
  prop: 'realNameLike',
  el: 'input',
  placeholder: '请输入用户名',
  clearable: true,
  span: 4
}, {
  label: '操作记录',
  prop: 'operation',
  el: 'input',
  placeholder: '请输入操作记录',
  clearable: true,
  span: 4
}, {
  label: '操作时间',
  prop: 'minVisitTime,maxVisitTime',
  el: 'date-picker',
  type:"daterange",
  clearable: true,
  span: 6,
  valueFormat: 'yyyy-MM-dd HH:mm:ss'
},{
  prop:'btns',
  span:6
}]
export const columns =[{
  label: '工号',
  prop: 'jobNumber'
}, {
  label: '用户名',
  prop: 'realName'
}, {
  label: '角色',
  render: (h, { row }) => {
    return row.roleList && row.roleList.map(r => <el-tag style='margin:0 2px'>{ r && r.name}</el-tag>)
  }
}, {
  label: '操作记录',
  prop: 'operation'
}, {
  label: '操作时间',
  prop: 'visitTime'
}, 
// {
//   label: '请求参数',
//   prop: 'params'
// }
]