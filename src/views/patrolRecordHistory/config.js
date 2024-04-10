import { riskLevel, riskLevelObj, detailState, detailStateObj } from '@/utils/config.js'
import {  apiGetPlateNum,apiGetTaskList,apiGetPartskList } from '@/api/interface/index'
const colorList = ['#52C41A', '#73C0DE', '#FAC858', '#FF4D4F']
export const formColumns = [
  {
    label: '巡检任务',
    prop: 'taskTitle',
    el: 'wSelect',
    getList: async () => ({
      data: (await apiGetTaskList({pageIndex:1,pageSize:10000})).data.list,
    }),
    'value-key': {
      label: 'title',
      value: 'title'
    },
    placeholder: '请选择巡检任务',
    clearable: true,
    span: 6
  }, {
    label: '车辆号',
    prop: 'plateNumber',
    el: 'wSelect',
    placeholder: '请选择车辆号',
    clearable: true,
    filterable: true,
    getList: apiGetPlateNum,
    'value-key': {
      label: 'plateNumber',
      value: 'plateNumber'
    },
    span: 6
  }, {
    label: '车厢号',
    prop: 'carriageNumber',
    el: 'wSelect',
    placeholder: '请选择车厢号',
    clearable: true,
    filterable: true,
    getList: async () => {
      // const res = await apiGetPlateNumber()
      return {
        data: [
          {
            label:'1号车厢',
            value:1
          },
          {
            label:'2号车厢',
            value:2
          },
          {
            label:'3号车厢',
            value:3
          },
          {
            label:'4号车厢',
            value:4
          },
          {
            label:'5号车厢',
            value:5
          },
          {
            label:'6号车厢',
            value:6
          },
          {
            label:'7号车厢',
            value:7
          },
          {
            label:'8号车厢',
            value:8
          }


        ]
      }
    },
    'value-key': {
      label: 'label',
      value: 'value'
    },
    span: 6
  }, {
    label: '部件类型',
    prop: 'partsId',
    el: 'wSelect',
    placeholder: '请选择部件类型',
    clearable: true,
    filterable: true,
    getList: apiGetPartskList,
    'value-key': {
      label: 'name',
      value: 'id'
    },
    span: 6
  },{
    label: '风险等级',
    prop: 'grade',
    el: 'select',
    placeholder: '请选择风险等级',
    options: riskLevel,
    clearable: true,
    span: 6
  }, {
    label: '处理进度',
    prop: 'state',
    el: 'select',
    placeholder: '请选择处理进度',
    options: detailState,
    clearable: true,
    span: 6
  }, {
    label: '巡检日期',
    prop: 'minBeginTime,maxBeginTime',
    el: 'date-picker',
    type: "daterange",
    clearable: true,
    span: 6,
    valueFormat: 'yyyy-MM-dd HH:mm:ss'
  }, 
  {
    prop: 'btns',
    span: 6
  },]
export const columns = (that) => [
  {
    label: '编号',
    prop: 'id'
  }, {
    label: '巡检任务',
    prop: 'taskTitle'
  }, {
    label: '巡检时间',
    prop: 'patrolTime'
  }, {
    label: '检测地点',
    prop: 'placeName'
  }, {
    label: '车辆号',
    prop: 'plateNumber'
  }, {
    label: '车厢号',
    prop: 'carriageNumber'
  },
  {
    label: '部件类型',
    prop: 'partsName'
  }, 
  {
    label: '检测项',
    prop: 'itemName'
  }, {
    label: '故障描述',
    prop: 'errorName'
  }, {
    label: '风险等级',
    render(h, { row }) {
      return <span>{riskLevelObj[row.grade]}</span>
    },
  }, {
    label: '数据来源',
    prop: 'source'
  }, {
    label: '处理进度',
    render(h, { row }) {
      return <span style={`color:${row.state === 'FINISHED' ? colorList[0] : colorList[3]}`}>{detailStateObj[row.state]}</span>
    },
  }, {
    label: '操作',
    width: 200,
    render: (h, { row }) => {
      return [!(row.status === 'AUDITED') && <el-link
        type="primary"
        underline={false}
        onClick={() => { that.$router.push({ name: 'defectAudit', query: { taskId: row.taskId, position: row.position, patrolRecordId: row.id } }); }}
      >
        审核
      </el-link>,
        // <el-divider direction="vertical"></el-divider>,
        // <el-link
        //   type="primary"
        //   underline={false}
        //   onClick={() => { that.$router.push({ name: 'PatrolAudit', params: { id: row.taskId } }); }}
        // >
        // 生成工单
        // </el-link>
      ]
    }
  }]
export const days = [
  {
    label: 1,
    value: '1天'
  },
  {
    label: 2,
    value: '2天'
  },
  {
    label: 7,
    value: '7天'
  },
]