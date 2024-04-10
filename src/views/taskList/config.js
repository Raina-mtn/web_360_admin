
import { apiGetPlateNum } from '@/api/interface/index'
import { processStateObj } from '@/utils/config'
console.log(apiGetPlateNum);
export const formColumns = [
  {
    label: '车辆号',
    prop: 'plateNumberLike',
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
  },
  // {
  //   label: '状态',
  //   prop: 'state',
  //   el: 'select',
  //   placeholder: '请选择状态',
  //   clearable: true,
  //   filterable: true,
  //   options: processState,
  //   span: 6
  // },
  {
    label: '过车日期',
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
  }]

export const columns = (that) => [
  {
    label: '过车时间',
    prop: 'beginTime',
    width: 180
  },
  {
    label: '车辆号',
    prop: 'plateNumber'
  },
  {
    label: '车型',
    prop: 'modelName'
  },
  {
    label: '方向',
    prop: 'direction'
  },
  {
    label: '车顶',
    render: (h, { row }) => {
      return [
        <span>
          {row?.defectStat?.Up}
        </span>
      ]
    }
  },
  {
    label: '车底',
    render: (h, { row }) => {
      return [
        <span>
          {row?.defectStat?.Down}
        </span>
      ]
    }
  },
  {
    label: '左侧',
    render: (h, { row }) => {
      return [
        <span>
          {row?.defectStat?.Left}
        </span>
      ]
    }
  },
  {
    label: '右侧',
    render: (h, { row }) => {
      return [
        <span>
          {row?.defectStat?.Right}
        </span>
      ]
    }
  },
  // {
  //   label: '复核人',
  //   render: (h, { row }) => {
  //     return [
  //       <span>
  //         {row?.user?.userName}
  //       </span>
  //     ]
  //   }
  // },
  {
    label: '状态',
    render(h, { row }) {
      return <span style={row.state !== 'FINISHED' ? "color:#ff5555" : "color:#36BE01"}>{processStateObj[row.state]}</span>
    }
  },
  {
    label: '操作',
    width: 280,
    render: (h, { row }) => {
      return [
        (row.state === 'AUDITED' || row.state === 'FINISHED') ? (<div>
          <el-link
            type="primary"
            underline={false}
            onClick={() => { that.$router.push({ name: 'defectAudit', query: { taskId: row.id } }); }}
          >
            {row.state === 'FINISHED' ? '复核' : (row.state === 'AUDITED' ? '检测详情' : '')}
          </el-link>
          <el-divider direction='vertical' />
          <el-link
            type="primary"
            underline={false}
            onClick={() => { that.$router.push({ name: 'QuickPass', query: { taskId: row.id } }); }}
          >
            快速过图
          </el-link>
          <el-divider direction='vertical' />
          <el-link
            type="primary"
            underline={false}
            onClick={() => { that.exportFile(row) }}
          >
            生成报表
          </el-link>
          <el-divider direction='vertical' />
          <el-link
            type="primary"
            underline={false}
            onClick={() => { that.handleDelete(row.id) }}
          >
            删除
          </el-link>

        </div>) : (<span></span >)

      ]
    }
  }]