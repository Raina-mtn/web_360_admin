export const formColumns = [
  {
    label: '报告名称',
    prop: 'titleLike',
    el: 'input',
    placeholder: '请输入报告名称',
    clearable: true,
    span: 6
  },
  {
    label: '车辆号',
    prop: 'plateNumberLike',
    el: 'input',
    placeholder: '请输入车辆号',
    clearable: true,
    span: 6
  },
  {
    label: '报告日期',
    prop: 'minReportTime,maxReportTime',
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
    label: '报告编号',
    prop: 'reportNo'
  },
  {
    label: '车辆号',
    prop: 'plateNumber'
  },
  {
    label: '过车时间',
    prop: 'beginTime'
  },
  {
    label: '报告时间',
    prop: 'reportTime'
  },
  {
    label: '报告名称',
    prop: 'title'
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
  {
    label: '操作',
    width: 240,
    render: (h, { row }) => {
      return [
        // <el-link
        //   type="primary"
        //   underline={false}
        //   onClick={() => { that.exportFile(row) }}
        // >
        //   重新生成
        // </el-link>,
        // <el-divider direction='vertical' />,
        <el-link
          type="primary"
          disabled={!row.reportUrl}
          underline={false}
          onClick={() => { that.downLoad(row) }}
        >
          下载报告
        </el-link>
      ]
    }
  }]