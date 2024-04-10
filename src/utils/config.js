/**
 * 将枚举值数组转换成key-value形式
 * @param {*} arr
 * @param {*} format 要处理的键值对{label:'name', value:'value'}
 * @returns obj
 */
export const arrToObj = function (
  arr,
  format = {
    key: "value",
    label: "label",
  }
) {
  return arr.reduce(function (acc, cur) {
    const curkey = cur[format.key];
    acc[curkey] = cur[format.label];
    if (cur.type) {
      // tag类型
      acc[`${cur[format.key]}_tag`] = cur.type;
    }
    return acc;
  }, {});
};

/**
 * 将枚举值数组转换成key-value形式
 * @param {*} arr
 * @returns obj
 */
export const arrToObj2 = function (arr) {
  return arr.reduce(function (acc, cur) {
    const { value, ...others } = cur;
    acc[`${value}`] = others;
    return acc;
  }, {});
};

// 用户状态
export const USER_STATUS = [
  {
    value: "NORMAL",
    label: "正常",
  },
  {
    value: "FORBIDDEN",
    label: "禁用",
  },
];

export const SEX = [
  {
    value: "0",
    label: "男",
  },
  {
    value: "1",
    label: "女",
  },
];

// 告警设置
export const WARN_GRADE = [
  ["正常", "#02bc77"],
  ["预警", "#28c3d7"],
  ["严重", "#1cbb84"],
];

// 检测类型集合
export const TYPE = [
  {
    value: "UR-TG", // TODO: 几何未定
    label: "几何",
  },
  {
    value: "UR-FM",
    label: "异物",
  },
  {
    value: "UR-RD",
    label: "磨耗",
  },
  {
    value: "UR-CL",
    label: "限界",
  },
  {
    value: "UR-FA",
    label: "扣件",
  },
];
export const TYPE_OBJ = arrToObj(TYPE);
export const LEFT_FA001 = "UR-FA-001"; // 左内扣件
export const LEFT_FA002 = "UR-FA-002"; // 左外扣件
export const RIGHT_FA001 = "UR-FA-003"; // 左内扣件
export const RIGHT_FA002 = "UR-FA-004"; // 左外扣件
// ws推送消息类型
// ws推送消息类型
export const WS_NOTIFY = "NOTIFY";
export const WS_IMAGE = "IMAGE";
export const WS_RTE = "RTE";
export const WARNING = "WARNING";

// 数据导出-任务类型
export const TASK_TYPE = [
  {
    value: "WARNING",
    label: "设备警告",
  },
  {
    value: "INDICATOR",
    label: "指标库",
  },
  {
    value: "DEFECT",
    label: "巡检缺陷",
  },
];

// 数据导出-任务状态
export const EXPORT_STATUS = [
  {
    value: "CREATE",
    label: "已创建",
    type: "",
  },
  {
    value: "RUNNING",
    label: "运行中",
    type: "warning",
  },
  {
    value: "FAILED",
    label: "失败",
    type: "danger",
  },
  {
    value: "FINISH",
    label: "完成",
    type: "success",
  },
];

// 任务管理-任务状态
export const TASK_STATUS = [
  {
    value: "CREATED",
    label: "已创建",
    type: "success",
    disabledWhen: "",
  },
  {
    value: "RUNNING",
    label: "运行中",
    type: "warning",
    disabledWhen: "SUSPENDED",
  },
  {
    value: "SUSPENDED",
    label: "暂停中",
    type: "info",
    disabledWhen: "RUNNING",
  },
  {
    value: "CANCELED",
    label: "已取消",
    type: "info",
    disabledWhen: "CREATED",
  },
  {
    value: "FAILED",
    label: "运行失败",
    type: "danger",
  },
  {
    value: "FINISHED",
    label: "已完成",
    type: "success",
    disabledWhen: ["RUNNING", "SUSPENDED"],
  },
];

// 任务管理-优先级
export const PRIORITY_STATUS = [
  {
    value: 1,
    label: "低",
    type: "danger",
  },
  {
    value: 2,
    label: "中",
    type: "warning",
  },
  {
    value: 3,
    label: "高",
    type: "success",
  },
];

// 结果审核-状态
export const HANDLERESULT_STATUS = [
  {
    value: "WAITING",
    label: "审核中",
    type: "warning",
  },
  {
    value: "CLEARED",
    label: "已清除",
    type: "success",
  },
  {
    value: "CONFIRMED",
    label: "已确认",
    type: "info",
  },
];
export const HANDLERESULT_STATUS_OBJ = arrToObj(HANDLERESULT_STATUS);

// 结果审核 - 告警等级
export function AUTH_GRADE(that) {
  return [
    {
      value: 0,
      label: that.$t("pages.taskAuth.common.AUTH_GRADE.0"),
      type: "success",
    },
    {
      value: 1,
      label: that.$t("pages.taskAuth.common.AUTH_GRADE.1"),
      type: "warning",
    },
    {
      value: 2,
      label: that.$t("pages.taskAuth.common.AUTH_GRADE.2"),
      type: "danger",
    },
  ];
}
export function AUTH_GRADE_OBJ(that) {
  return arrToObj2(AUTH_GRADE(that));
}

// 结果审核 - 确认结果 - 轨道几何/道床检测
export function DEFECT_REVIEW_ONE(that) {
  return [
    {
      value: "CORRECT",
      label: that.$t("pages.taskAuth.common.DEFECT_REVIEW_ONE.CORRECT"),
    },
    {
      value: "DEVICE_FAULT",
      label: that.$t("pages.taskAuth.common.DEFECT_REVIEW_ONE.DEVICE_FAULT"),
    },
    {
      value: "OTHERS",
      label: that.$t("pages.taskAuth.common.DEFECT_REVIEW_ONE.OTHERS"),
    },
  ];
}

export function DEFECT_REVIEW_ONE_OBJ(that) {
  return arrToObj(DEFECT_REVIEW_ONE(that));
}

// 结果审核 - 确认结果 - 钢轨磨损/扣件检测
export function DEFECT_REVIEW_TWO(that) {
  return [
    {
      value: "CORRECT",
      label: that.$t("pages.taskAuth.common.DEFECT_REVIEW_TWO.CORRECT"),
    },
    {
      value: "DEVICE_FAULT",
      label: that.$t("pages.taskAuth.common.DEFECT_REVIEW_TWO.DEVICE_FAULT"),
    },
    {
      value: "ENVI_DISTURB",
      label: that.$t("pages.taskAuth.common.DEFECT_REVIEW_TWO.ENVI_DISTURB"),
    },
    {
      value: "OTHERS",
      label: that.$t("pages.taskAuth.common.DEFECT_REVIEW_TWO.OTHERS"),
    },
  ];
}
export function DEFECT_REVIEW_TWO_OBJ(that) {
  return arrToObj(DEFECT_REVIEW_TWO(that));
}

// 结果审核 - 确认结果 - 限界检测
export function DEFECT_REVIEW_THREE(that) {
  return [
    {
      value: "CORRECT",
      label: that.$t("pages.taskAuth.common.DEFECT_REVIEW_THREE.CORRECT"),
    },
    {
      value: "DEVICE_FAULT",
      label: that.$t("pages.taskAuth.common.DEFECT_REVIEW_THREE.DEVICE_FAULT"),
    },
    {
      value: "ENVI_DISTURB",
      label: that.$t("pages.taskAuth.common.DEFECT_REVIEW_THREE.ENVI_DISTURB"),
    },
    {
      value: "OTHERS",
      label: that.$t("pages.taskAuth.common.DEFECT_REVIEW_THREE.OTHERS"),
    },
  ];
}
export function DEFECT_REVIEW_THREE_OBJ(that) {
  return arrToObj(DEFECT_REVIEW_TWO(that));
}

// 结果审核 - 处理状态
export const AUTH_HANDLERSULT = [
  {
    value: "CONFIRMED",
    label: "已确认",
  },
  {
    value: "CLEARED",
    label: "已清除",
  },
];
export const AUTH_HANDLERSULT_OBJ = arrToObj(AUTH_HANDLERSULT);

// 轨道几何-检测类型
export function GEOMETRY_ITEM(that) {
  return [
    {
      value: "dipangle",
      label: that.$t("pages.taskAuth.geometry.GEOMETRY_ITEM.dipangle"),
    },
    {
      value: "gauge",
      label: that.$t("pages.taskAuth.geometry.GEOMETRY_ITEM.gauge"),
    },
    {
      value: "angle_rad_6.33",
      label: that.$t("pages.taskAuth.geometry.GEOMETRY_ITEM.angle_rad"),
    },
    {
      value: "gauge_rate",
      label: that.$t("pages.taskAuth.geometry.GEOMETRY_ITEM.gauge_rate"),
    },
  ];
}
export function GEOMETRY_ITEM_OBJ(that) {
  return arrToObj2(GEOMETRY_ITEM(that));
}

// 钢轨磨耗-检测类型
export function STEELRAIL_ITEM(that) {
  return [
    {
      value: "left_speckle",
      label: that.$t(
        "pages.taskAuth.steelRail.STEELRAIL_ITEM_OBJ.left_speckle"
      ),
    },
    {
      value: "right_speckle",
      label: that.$t(
        "pages.taskAuth.steelRail.STEELRAIL_ITEM_OBJ.right_speckle"
      ),
    },
    {
      value: "left_spalling",
      label: that.$t(
        "pages.taskAuth.steelRail.STEELRAIL_ITEM_OBJ.left_spalling"
      ),
    },
    {
      value: "right_spalling",
      label: that.$t(
        "pages.taskAuth.steelRail.STEELRAIL_ITEM_OBJ.right_spalling"
      ),
    },
    {
      value: "left_collapse",
      label: that.$t(
        "pages.taskAuth.steelRail.STEELRAIL_ITEM_OBJ.left_collapse"
      ),
    },
    {
      value: "right_collapse",
      label: that.$t(
        "pages.taskAuth.steelRail.STEELRAIL_ITEM_OBJ.right_collapse"
      ),
    },
    {
      value: "left_fat_edge",
      label: that.$t(
        "pages.taskAuth.steelRail.STEELRAIL_ITEM_OBJ.left_fat_edge"
      ),
    },
    {
      value: "right_fat_edge",
      label: that.$t(
        "pages.taskAuth.steelRail.STEELRAIL_ITEM_OBJ.right_fat_edge"
      ),
    },
    {
      value: "Left_RailwayWear",
      label: that.$t(
        "pages.taskAuth.steelRail.STEELRAIL_ITEM_OBJ.Left_RailwayWear"
      ),
    },
    {
      value: "Right_RailwayWear",
      label: that.$t(
        "pages.taskAuth.steelRail.STEELRAIL_ITEM_OBJ.Right_RailwayWear"
      ),
    },
    {
      value: "left_crace",
      label: that.$t("pages.taskAuth.steelRail.STEELRAIL_ITEM_OBJ.left_crace"),
    },
    {
      value: "right_crace",
      label: that.$t("pages.taskAuth.steelRail.STEELRAIL_ITEM_OBJ.right_crace"),
    },
    {
      value: "left_dislocation",
      label: that.$t(
        "pages.taskAuth.steelRail.STEELRAIL_ITEM_OBJ.left_dislocation"
      ),
    },
    {
      value: "right_dislocation",
      label: that.$t(
        "pages.taskAuth.steelRail.STEELRAIL_ITEM_OBJ.right_dislocation"
      ),
    },
  ];
}

export function STEELRAIL_ITEM_OBJ(that) {
  return arrToObj2(STEELRAIL_ITEM(that));
}

// 扣件检测-检测类型
export function FASTENER_ITEM(that) {
  return [
    {
      value: "Bolt",
      label: that.$t("pages.taskAuth.fastener.FASTENER_ITEM_OBJ.Bolt"),
    },
    {
      value: "InsulatorPlate",
      label: that.$t(
        "pages.taskAuth.fastener.FASTENER_ITEM_OBJ.InsulatorPlate"
      ),
    },
    {
      value: "fasten",
      label: that.$t("pages.taskAuth.fastener.FASTENER_ITEM_OBJ.fasten"),
    },
    {
      value: "SeamErr",
      label: that.$t("pages.taskAuth.fastener.FASTENER_ITEM_OBJ.SeamErr"),
    },
    {
      value: "BoltErr",
      label: that.$t("pages.taskAuth.fastener.FASTENER_ITEM_OBJ.BoltErr"),
    },
    {
      value: "PlaneErr",
      label: that.$t("pages.taskAuth.fastener.FASTENER_ITEM_OBJ.PlaneErr"),
    },
    {
      value: "BoltSeamErr",
      label: that.$t("pages.taskAuth.fastener.FASTENER_ITEM_OBJ.BoltSeamErr"),
    },
    {
      value: "IPLoss",
      label: that.$t("pages.taskAuth.fastener.FASTENER_ITEM_OBJ.IPLoss"),
    },
    {
      value: "IPSeamErr",
      label: that.$t("pages.taskAuth.fastener.FASTENER_ITEM_OBJ.IPSeamErr"),
    },
    {
      value: "EBForeignMatter",
      label: that.$t(
        "pages.taskAuth.fastener.FASTENER_ITEM_OBJ.EBForeignMatter"
      ),
    },
    {
      value: "ElasticBar",
      label: that.$t("pages.taskAuth.fastener.FASTENER_ITEM_OBJ.ElasticBar"),
    },
    {
      value: "Rotate",
      label: that.$t("pages.taskAuth.fastener.FASTENER_ITEM_OBJ.Rotate"),
    },
    {
      value: "Miss",
      label: that.$t("pages.taskAuth.fastener.FASTENER_ITEM_OBJ.Miss"),
    },
    {
      value: "Break",
      label: that.$t("pages.taskAuth.fastener.FASTENER_ITEM_OBJ.Break"),
    },
    {
      value: "ForeignMatter",
      label: that.$t("pages.taskAuth.fastener.FASTENER_ITEM_OBJ.ForeignMatter"),
    },
    {
      value: "TongueErr",
      label: that.$t("pages.taskAuth.fastener.FASTENER_ITEM_OBJ.TongueErr"),
    },
    {
      value: "SeamBoltErr",
      label: that.$t("pages.taskAuth.fastener.FASTENER_ITEM_OBJ.SeamBoltErr"),
    },
  ];
}
export function FASTENER_ITEM_OBJ(that) {
  return arrToObj2(FASTENER_ITEM(that));
}

// 扣件检测-扣件位置
export function FASTENER_POSITION_ITEM(that) {
  return [
    {
      value: "RO",
      label: that.$t("pages.taskAuth.fastener.FASTENER_POSITION_ITEM_OBJ.RO"),
    },
    {
      value: "RI",
      label: that.$t("pages.taskAuth.fastener.FASTENER_POSITION_ITEM_OBJ.RI"),
    },
    {
      value: "LO",
      label: that.$t("pages.taskAuth.fastener.FASTENER_POSITION_ITEM_OBJ.LO"),
    },
    {
      value: "LI",
      label: that.$t("pages.taskAuth.fastener.FASTENER_POSITION_ITEM_OBJ.LI"),
    },
  ];
}
export function FASTENER_POSITION_ITEM_OBJ(that) {
  return arrToObj2(FASTENER_POSITION_ITEM(that));
}

// 道床缺陷-检测类型
export function INTEGRATEDBED_ITEM(that) {
  return [
    {
      value: "RoadRedForeign",
      label: that.$t(
        "pages.taskAuth.integratedbed.INTEGRATEDBED_ITEM_OBJ.RoadRedForeign"
      ),
    },
  ];
}
export function INTEGRATEDBED_ITEM_OBJ(that) {
  return arrToObj2(INTEGRATEDBED_ITEM(that));
}
// 角色类型
export const roleType = [
  {
    label: "角色",
    value: "角色",
  },
  {
    label: "职能",
    value: "职能",
  },
];
// 用户状态
export const userStatus = [
  {
    label: "正常",
    value: "NORMAL",
  },
  // {
  //   label: "停用",
  //   value: "STOP",
  // },
  {
    label: "禁用",
    value: "BAN",
  },
];
export const userStatusObj = arrToObj(userStatus);
//车厢号
export const carriageNumber = [
  {
    label: "1",
    value: "1",
  },
  {
    label: "2",
    value: "2",
  },
  {
    label: "3",
    value: "3",
  },
  {
    label: "4",
    value: "4",
  },
  {
    label: "5",
    value: "5",
  },
  {
    label: "6",
    value: "6",
  },
];
//告警状态
export const defectGrade = [
  {
    label: "低风险",
    value: "1",
  },
  {
    label: "中风险",
    value: "2",
  },
  {
    label: "高风险",
    value: "3",
  },
];
export const defectGradeObj = arrToObj(defectGrade);
//处理进度
export const processState = [
  // {
  //   label: "已创建",
  //   value: "CREATED",
  // },
  {
    label: "处理中",
    value: "RUNNING",
  },
  {
    label: "已完成",
    value: "FINISHED",
  },
  {
    label: "已审核",
    value: "AUDITED",
  },
];
export const processStateObj = arrToObj(processState);
//检测位置
export const checkPosition = [
  {
    label: "车顶",
    value: "TOP",
  },
  {
    label: "车底",
    value: "BOTTOM",
  },
  {
    label: "左侧",
    value: "LEFT",
  },
  {
    label: "右侧",
    value: "RIGHT",
  },
];
export const checkPositionObj = arrToObj(checkPosition);

// 检测位置列表
export const imgPosition = [
  {
    label: "车底左",
    value: "BL-2D",
  },
  {
    label: "车底右",
    value: "BR-2D",
  },
  {
    label: "车底中间1",
    value: "BM1-2D",
  },
  {
    label: "车底中间2",
    value: "BM2-2D",
  },
  {
    label: "左下",
    value: "LL-2D",
  },
  {
    label: "右下",
    value: "LR-2D",
  },
  {
    label: "左中",
    value: "ML-2D",
  },
  {
    label: "右中",
    value: "MR-2D",
  },
  {
    label: "左上",
    value: "UL-2D",
  },
  {
    label: "右上",
    value: "UR-2D",
  },
  {
    label: "车顶左",
    value: "TL-2D",
  },
  {
    label: "车顶中",
    value: "TM-2D",
  },
  {
    label: "车顶右",
    value: "TR-2D",
  },
];
export const imgPositionObj = arrToObj(imgPosition);

// 检测位置列表
export const defectSource = [
  {
    label: "人工标记",
    value: "Sign",
  },
  {
    label: "算法识别",
    value: "Alg",
  }
];
export const defectSourceObj = arrToObj(defectSource);


// 检测位置列表
export const defectStatus = [
  {
    label: "确认报警",
    value: "CONFIRM",
  },
  // {
  //   label: "疑似故障",
  //   value: "SUSPECTED",
  // },
  // {
  //   label: "持续跟踪",
  //   value: "CONTINUE",
  // },
  // {
  //   label: "已换部件",
  //   value: "REPAIR",
  // },
  {
    label: "无需处理",
    value: "NOTHING",
  },
  {
    label: "误报学习",
    value: "MISSING",
  },
  {
    label: "未审核",
    value: "EMPTY",
  },
];
export const defectStatusObj = arrToObj(defectStatus);


// 风险等级
export const riskLevel = [
  {
    label: "A",
    value: 1,
  },
  {
    label: "B",
    value: 2,
  },
  {
    label: "C",
    value: 3,
  },
];
export const riskLevelObj = arrToObj(riskLevel);


//处理进度
export const detailState = [
  {
    label: "未审核",
    value: "EMPTY",
  },
  {
    label: "确认报警",
    value: "CONFIRM",
  },
  // {
  //   label: "疑似故障",
  //   value: "SUSPECTED",
  // },
  // {
  //   label: "持续跟踪",
  //   value: "CONTINUE",
  // },
  // {
  //   label: "已换部件",
  //   value: "REPAIR",
  // },
  {
    label: "无需处理",
    value: "NOTHING",
  },
  {
    label: "误报学习",
    value: "MISSING",
  },
];
export const detailStateObj = arrToObj(detailState);