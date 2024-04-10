import {riskLevel,riskLevelObj} from '@/utils/config'
import {apiGetLineList,apiPartsList,
  // apiItemList,
  // apiErrorList,
  apiGetVehicleModel} from '@/api/interface/index'

const colorList = ['#EE6666','#FAC858','#52C41A']

export const lineFormColumns =[
  {
    label: '线路',
    prop: 'lineId',
    el: 'wSelect',
    placeholder: '请选择线路',
    clearable: true,
    getList:apiGetLineList,
    'value-key':{
      label: 'chName', 
      value: 'id'
    },
    span: 6
  },{
    prop:'btns',
    span:12
  }]
export const lineColumns =(that)=> [ {
  label: '线路',
  prop: 'lineName'
}, {
  label: '检测地点',
  prop: 'chName'
}, {
  label: '操作',
  width: 160,
  render: (h, { row }) => {
    return [<el-button type='text' onClick={() => { that.$refs.lineDialog.openDialog(row, true)}} style="color:#1CDAFC">编辑</el-button>,
      <el-divider direction="vertical" />, 
      <el-button type='text' onClick={() => { that.handleDelete(row.id) }} style="color:#EE6666">删除</el-button>]
  }
}]
export const lineDialogColumns =[
  {
    label: '线路',
    prop: 'lineId',
    el: 'wSelect',
    placeholder: '请选择线路',
    clearable: true,
    rules:[{ required: true, message: "请输入线路" }],
    getList:apiGetLineList,
    'value-key':{
      label: 'chName', 
      value: 'id'
    },
    maxlength:30,
    span: 20
  },{
    label: '检测地点',
    prop: 'chName',
    el: 'input',
    placeholder: '请输入检测地点',
    rules:[{ required: true, message: "请输入检测地点" }],
    clearable: true,
    maxlength:30,
    span: 20
  }]


export const vehicleFormColumns =(areaList)=>[
  {
    label: '线路',
    prop: 'lineId',
    el: 'wSelect',
    placeholder: '请选择线路',
    clearable: true,
    filterable:true,
    getList:apiGetLineList,
    'value-key':{
      label: 'chName', 
      value: 'id'
    },
    span: 4
  },{
    label: '检测地点',
    prop: 'placeId',
    el: 'select',
    placeholder: '请选择检测地点',
    clearable: true,
    options:areaList,
    span: 4
  },{
    label: '车辆号',
    prop: 'plateNumber',
    el: 'input',
    maxlength:30,
    placeholder: '请输入车辆号',
    clearable: true,
    span: 4
  },{
    label: '车型',
    prop: 'modelId',
    el: 'wSelect',
    placeholder: '请选择车型',
    clearable: true,
    filterable:true,
    getList:apiGetVehicleModel,
    'value-key':{
      label: 'code', 
      value: 'id'
    },
    span: 4
  },{
    prop:'btns',
    span:8
  }]
export const vehicleColumns =(that)=> [ {
  label: '线路',
  prop: 'lineName'
}, {
  label: '检测地点',
  prop: 'placeName'
}, {
  label: '车辆号',
  prop: 'plateNumber'
}, {
  label: '车型',
  prop: 'modelCode'
}, {
  label: '车厢数',
  prop: 'carriageNumber'
}, {
  label: '操作',
  width: 160,
  render: (h, { row }) => {
    return [<el-button type='text' onClick={() => { that.$refs.vehicleDialog.openDialog(row, true)}} style="color:#1CDAFC">编辑</el-button>,
      <el-divider direction="vertical" />, 
      <el-button type='text' onClick={() => { that.handleDelete(row.id) }} style="color:#EE6666">删除</el-button>]
  }
}]
export const vehicleDialogColumns =(areaList)=>[
  {
    label: '线路',
    prop: 'lineId',
    el: 'wSelect',
    placeholder: '请选择线路',
    clearable: true,
    filterable:true,
    rules:[{ required: true, message: "请选择线路" }],
    getList:apiGetLineList,
    'value-key':{
      label: 'chName', 
      value: 'id'
    },
    span: 20
  },{
    label: '检测地点',
    prop: 'placeId',
    el: 'select',
    placeholder: '请选择检测地点',
    clearable: true,
    rules:[{ required: true, message: "请选择检测地点" }],
    options:areaList,
    span: 20
  },{
    label: '车辆号',
    prop: 'plateNumber',
    el: 'input',
    maxlength:30,
    placeholder: '请输入车辆号',
    clearable: true,
    rules:[{ required: true, message: "请输入车辆号" }],
    span: 20
  },{
    label: '车型',
    prop: 'modelCode',
    el: 'wSelect',
    placeholder: '请选择车型',
    clearable: true,
    rules:[{ required: true, message: "请选择车型" }],
    getList:apiGetVehicleModel,
    'value-key':{
      label: 'code', 
      value: 'code'
    },
    span: 20
  },{
    label: '车厢数',
    prop: 'carriageNumber',
    el: 'input',
    maxlength:30,
    placeholder: '请输入车厢数',
    clearable: true,
    rules:[{ required: true, message: "请输入车厢数" }],
    span: 20
  }]


export const levelColumns =(that)=> [ {
  label: '部件类型',
  prop: 'partsName'
}, {
  label: '检测项',
  prop: 'itemName'
},
//  {
//   label: '故障描述',
//   prop: 'errorName'
// }, 
{
  label: '风险等级',
  render(h,{row}) {
    return <span style={`color:${colorList[row.grade-1]}`}>{riskLevelObj[row.grade]}</span>
  },
}, {
  label: '操作',
  width: 160,
  render: (h, { row }) => {
    return [<el-button type='text' onClick={() => { that.$refs.levelDialog.openDialog({row, isEdit:true}) }} style="color:#1CDAFC">编辑</el-button>,
      <el-divider direction="vertical" />, 
      <el-button type='text' onClick={() => { that.handleDelete(row.id) }} style="color:#EE6666">删除</el-button>]
  }
}]
export const levelDialogColumns =[
  {
    label: '部件类型',
    prop: 'partsId',
    el: 'wSelect',
    placeholder: '请选择部件类型',
    clearable: true,
    rules:[{ required: true, message: "请选择部件" }],
    getList:apiPartsList,
    'value-key':{
      label: 'name', 
      value: 'id'
    },
    span: 20,
    filterable: true
  },
  // {
  //   label: '检测项',
  //   prop: 'itemId',
  //   el: 'wSelect',
  //   placeholder: '请选择检测项',
  //   clearable: true,
  //   rules:[{ required: true, message: "请选择检测项" }],
  //   getList:apiItemList,
  //   'value-key':{
  //     label: 'name', 
  //     value: 'id'
  //   },
  //   span: 20
  // },
  {
    label: "检测项",
    prop: "itemId",
    el: "select",
    placeholder: "请选择检测项",
    clearable: true,
    rules: [{ required: true, message: "请选择检测项" }],
    options: [],
    span: 20,
    filterable: true
  },
  // {
  //   label: '故障描述',
  //   prop: 'errorId',
  //   el: 'wSelect',
  //   placeholder: '请选择故障描述',
  //   clearable: true,
  //   rules:[{ required: true, message: "请选择故障描述" }],
  //   getList:apiErrorList,
  //   'value-key':{
  //     label: 'name', 
  //     value: 'id'
  //   },
  //   span: 20
  // },
  {
    label: '风险等级',
    prop: 'grade',
    el: 'select',
    placeholder: '请选择风险等级',
    options:riskLevel,
    clearable: true,
    rules:[{ required: true, message: "请选择风险等级" }],
    span: 20
  },]
// export const batchDialogColumns =[
//   {
//     label: '部件类型',
//     prop: 'partsId',
//     el: 'wSelect',
//     placeholder: '请选择部件类型',
//     clearable: true,
//     rules:[{ required: true, message: "请选择部件" }],
//     getList:apiPartsList,
//     'value-key':{
//       label: 'name', 
//       value: 'id'
//     },
//     span: 20
//   },{
//     label: '检测项',
//     prop: 'itemId',
//     ref: 'itemId',
//     el: 'el-sle',
//     placeholder: '请选择检测项',
//     clearable: true,
//     getList:apiItemList,
//     'value-key':{
//       label: 'name', 
//       value: 'id'
//     },
//     span: 20
//   },{
//     label: '风险等级',
//     prop: 'grade',
//     el: 'select',
//     placeholder: '请选择风险等级',
//     options:riskLevel,
//     rules:[{ required: true, message: "请选择风险等级" }],
//     clearable: true,
//     span: 20
//   },]