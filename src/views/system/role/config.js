
// import {roleType} from '@/utils/config'
export const formColumns =[
  {
    label: '角色名称',
    prop: 'nameLike',
    el: 'input',
    placeholder: '请输入角色名称',
    clearable: true,
    span: 6
  }, 
  // {
  //   label: '类型',
  //   prop: 'type',
  //   el: 'select',
  //   placeholder: '请选择角色类型',
  //   clearable: true,
  //   options:roleType,
  //   span: 6
  // },
  {
    prop:'btns',
    span:6
  }]
export const columns =(that)=> [ {
  label: '角色名称',
  prop: 'name',
}, 
{
  label: '角色编码',
  prop: 'code'
}, 
// {
//   label: '类型',
//   prop: 'type'
// },
{
  label: '菜单权限',
  width:200,
  render: (h, { row }) => {
    return row.resourceList?row.resourceList.length > 3 ? (<el-popover
      placement="top"
      width="200"
      trigger="hover">
      {row.resourceList.map(v=>v.name).join('/')}
      <template slot="reference">
        <div>{Array(3).fill(1).map((v,i)=> row.resourceList[i].name).join('/')}
          <span size="mini" effect="plain">...</span></div>
      </template>
    </el-popover>) : (row.resourceList.map(v=>v.name).join('/'))
      :''
  }
},{
  label: '备注',
  prop: 'memo',
  maxlength:'50',
},{
  label: '更新时间',
  prop: 'updateTime'
}, {
  label: '编辑人',
  prop: 'editor'
},{
  label: '操作',
  width: 160,
  render: (h, { row }) => {
    return [<el-button type='text' disabled={row.type === 'ADMIN'} onClick={() => { that.openDialog(row, true) }} style="color:#1CDAFC">修改</el-button>,
      <el-divider direction="vertical" />, 
      <el-button type='text' disabled={row.type === 'ADMIN'} onClick={() => { that.handleDelete(row) }} style="color:#EE6666">删除</el-button>]
  }
}]