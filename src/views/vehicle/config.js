import { riskLevel, riskLevelObj, processStateObj } from "@/utils/config";
import {
  apiGetLineList,
  apiPartsList,
  apiItemList,
  apiErrorList,
  apiGetVehicleModel,
} from "@/api/interface/index";

const colorList = ["#52C41A", "#FAC858", "#EE6666"];

export const lineFormColumns = [
  {
    label: "线路",
    prop: "lineId",
    el: "wSelect",
    placeholder: "请选择线路",
    clearable: true,
    getList: apiGetLineList,
    "value-key": {
      label: "chName",
      value: "id",
    },
    span: 6,
  },
  {
    prop: "btns",
    span: 12,
  },
];
export const lineColumns = (that) => [
  {
    label: "线路",
    prop: "lineName",
  },
  {
    label: "检测地点",
    prop: "chName",
  },
  {
    label: "操作",
    width: 160,
    render: (h, { row }) => {
      return [
        <el-button
          type="text"
          onClick={() => {
            that.$refs.lineDialog.openDialog(row, true);
          }}
          style="color:#1CDAFC"
        >
          编辑
        </el-button>,
        <el-divider direction="vertical" />,
        <el-button
          type="text"
          onClick={() => {
            that.handleDelete(row.id);
          }}
          style="color:#EE6666"
        >
          删除
        </el-button>,
      ];
    },
  },
];
export const lineDialogColumns = [
  {
    label: "线路",
    prop: "lineId",
    el: "wSelect",
    placeholder: "请选择线路",
    clearable: true,
    rules: [{ required: true, message: "请输入线路" }],
    getList: apiGetLineList,
    "value-key": {
      label: "chName",
      value: "id",
    },
    maxlength: 30,
    span: 20,
  },
  {
    label: "检测地点",
    prop: "chName",
    el: "input",
    placeholder: "请输入检测地点",
    rules: [{ required: true, message: "请输入检测地点" }],
    clearable: true,
    maxlength: 30,
    span: 20,
  },
];

export const vehicleFormColumns = (areaList) => [
  {
    label: "车辆号",
    prop: "plateNumber",
    el: "input",
    maxlength: 30,
    placeholder: "请输入车辆号",
    clearable: true,
    span: 4,
  },
  {
    label: "车型",
    prop: "modelId",
    el: "wSelect",
    placeholder: "请选择车型",
    clearable: true,
    filterable: true,
    getList: apiGetVehicleModel,
    "value-key": {
      label: "code",
      value: "id",
    },
    span: 4,
  },
  {
    label: "线路",
    prop: "lineId",
    el: "wSelect",
    placeholder: "请选择线路",
    clearable: true,
    filterable: true,
    getList: apiGetLineList,
    "value-key": {
      label: "chName",
      value: "id",
    },
    span: 6,
  },
  {
    label: "检测地点",
    prop: "placeId",
    el: "select",
    placeholder: "请选择检测地点",
    clearable: true,
    options: areaList,
    span: 6,
  },
  {
    label: "过车日期",
    prop: "minBeginTime,maxBeginTime",
    el: "date-picker",
    type: "daterange",
    clearable: true,
    span: 6,
    valueFormat: "yyyy-MM-dd HH:mm:ss",
  },
  // {
  //   label: '排序',
  //   prop: 'orderColumn',
  //   el: 'select',
  //   placeholder: '请选择排序',
  //   clearable: true,
  //   options: [
  //     {
  //       label:'正序',
  //       value: 'asc'
  //     },
  //     {
  //       label:'倒序',
  //       value: 'desc'
  //     }
  //   ],
  //   span: 6
  // },
  {
    prop: "btns",
    span: 6,
  },
];
export const vehicleColumns = (that) => [
  {
    label: "车辆号",
    prop: "plateNumber",
    sortable: "custom",
  },
  {
    label: "车型",
    prop: "modelCode",
  },
  {
    label: "车厢数",
    prop: "carriageNumber",
  },
  {
    label: "线路",
    prop: "lineName",
    width: 100,
  },
  {
    label: "检测地点",
    prop: "placeName",
  },
  {
    label: "总检测次数",
    prop: "totalTaskCount",
  },

  {
    label: "总检出告警",
    prop: "totalRecordCount",
  },
  {
    label: "检测周期（天）",
    prop: "period",
    sortable: "custom",
    width: 140,
  },
  {
    label: "最近过车时间",
    prop: "lastPatrolTime",
    width: 180,
  },
  {
    label: "告警项",
    width: 180,
    render: (h, { row }) => {
      return (
        <el-tooltip popper-class="waring-item">
          <div  slot="content">
            <el-scrollbar>
              <div style="max-width: 600px;max-height: 900px">
                {row?.recentDefects?.map((item) => (
                  <el-tag size="mini" style="margin-right: 5px;margin-bottom: 5px;" type="warning">{item}</el-tag>
                ))}
              </div>
            </el-scrollbar>
          </div>


          <div style="width: 180px !important;overflow:hidden;text-overflow:ellipsis; white-space: nowrap;">
            {row?.recentDefects.join(",")}
          </div>
        </el-tooltip>
      );
    },
  },
  {
    label: "状态",
    render(h, { row }) {
      return (
        <span
          style={
            row.recentTaskState === "FINISHED"
              ? "color:#EE6666"
              : "color:#36BE01"
          }
        >
          {processStateObj[row.recentTaskState]}
        </span>
      );
    },
  },
  {
    label: "操作",
    width: 280,
    fixed: 'right',
    render: (h, { row }) => {
      return [
        <div>
          <el-button
            type="text"
            style="color:#1CDAFC"
            onClick={() => {
              that.$router.push({
                name: "TaskList",
                query: { plateNumber: row.plateNumber },
              });
            }}
          >
            检测任务
          </el-button>
          <el-divider direction="vertical" />
          <el-button
            type="text"
            onClick={() => {
              that.$router.push({
                name: "Defect",
                query: { plateNumber: row.plateNumber },
              });
            }}
            style="color:#1CDAFC"
          >
            历史告警
          </el-button>
          <el-divider direction="vertical" />
          <el-button
            type="text"
            onClick={() => {
              that.$refs.vehicleDialog.openDialog(row, true);
            }}
            style="color:#1CDAFC"
          >
            编辑
          </el-button>
          <el-divider direction="vertical" />
          <el-button
            type="text"
            onClick={() => {
              that.$refs.vehicleDialog.delList(row.id);
            }}
            style="color:#1CDAFC"
          >
            删除
          </el-button>
        </div>,
      ];
    },
  },
];
export const vehicleDialogColumns = (areaList) => [
  {
    label: "车辆号",
    prop: "plateNumber",
    el: "input",
    maxlength: 30,
    placeholder: "请输入车辆号",
    clearable: true,
    rules: [{ required: true, message: "请输入车辆号" }],
    span: 20,
  },
  {
    label: "车辆车型",
    prop: "modelCode",
    el: "wSelect",
    placeholder: "请选择车辆车型",
    clearable: true,
    rules: [{ required: true, message: "请选择车辆车型" }],
    getList: apiGetVehicleModel,
    "value-key": {
      label: "code",
      value: "code",
    },
    span: 20,
  },
  {
    label: "车厢数",
    prop: "carriageNumber",
    el: "input",
    maxlength: 30,
    placeholder: "请输入车厢数",
    clearable: true,
    rules: [{ required: true, message: "请输入车厢数" }],
    span: 20,
  },
  {
    label: "线路",
    prop: "lineId",
    el: "wSelect",
    placeholder: "请选择线路",
    clearable: true,
    filterable: true,
    rules: [{ required: true, message: "请选择线路" }],
    getList: apiGetLineList,
    "value-key": {
      label: "chName",
      value: "id",
    },
    span: 20,
  },
  {
    label: "检测地点",
    prop: "placeId",
    el: "select",
    placeholder: "请选择检测地点",
    clearable: true,
    rules: [{ required: true, message: "请选择检测地点" }],
    options: areaList,
    span: 20,
  },
];

export const levelColumns = (that) => [
  {
    label: "部件",
    prop: "partsName",
  },
  {
    label: "检测项",
    prop: "itemName",
  },
  {
    label: "故障描述",
    prop: "errorName",
  },
  {
    label: "风险等级",
    render(h, { row }) {
      return (
        <span style={`color:${colorList[row.grade - 1]}`}>
          {riskLevelObj[row.grade]}
        </span>
      );
    },
  },
  {
    label: "操作",
    width: 160,
    render: (h, { row }) => {
      return [
        <el-button
          type="text"
          onClick={() => {
            that.$refs.levelDialog.openDialog({ row, isEdit: true });
          }}
          style="color:#1CDAFC"
        >
          编辑
        </el-button>,
        <el-divider direction="vertical" />,
        <el-button
          type="text"
          onClick={() => {
            that.handleDelete(row.id);
          }}
          style="color:#EE6666"
        >
          删除
        </el-button>,
      ];
    },
  },
];
export const levelDialogColumns = [
  {
    label: "部件",
    prop: "partsId",
    el: "wSelect",
    placeholder: "请选择部件",
    clearable: true,
    rules: [{ required: true, message: "请选择部件" }],
    getList: apiPartsList,
    "value-key": {
      label: "name",
      value: "id",
    },
    span: 20,
  },
  {
    label: "检测项",
    prop: "itemId",
    el: "wSelect",
    placeholder: "请选择检测项",
    clearable: true,
    rules: [{ required: true, message: "请选择检测项" }],
    getList: apiItemList,
    "value-key": {
      label: "name",
      value: "id",
    },
    span: 20,
  },
  {
    label: "故障描述",
    prop: "errorId",
    el: "wSelect",
    placeholder: "请选择故障描述",
    clearable: true,
    rules: [{ required: true, message: "请选择故障描述" }],
    getList: apiErrorList,
    "value-key": {
      label: "name",
      value: "id",
    },
    span: 20,
  },
  {
    label: "风险等级",
    prop: "grade",
    el: "select",
    placeholder: "请选择风险等级",
    options: riskLevel,
    clearable: true,
    rules: [{ required: true, message: "请选择风险等级" }],
    span: 20,
  },
];
export const batchDialogColumns = [
  {
    label: "部件",
    prop: "partsId",
    el: "wSelect",
    placeholder: "请选择部件",
    clearable: true,
    rules: [{ required: true, message: "请选择部件" }],
    getList: apiPartsList,
    "value-key": {
      label: "name",
      value: "id",
    },
    span: 20,
  },
  {
    label: "检测项",
    prop: "itemId",
    el: "wSelect",
    placeholder: "请选择检测项",
    clearable: true,
    getList: apiItemList,
    "value-key": {
      label: "name",
      value: "id",
    },
    span: 20,
  },
  {
    label: "风险等级",
    prop: "grade",
    el: "select",
    placeholder: "请选择风险等级",
    options: riskLevel,
    rules: [{ required: true, message: "请选择风险等级" }],
    clearable: true,
    span: 20,
  },
];
