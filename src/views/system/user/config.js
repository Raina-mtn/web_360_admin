import { userStatus, userStatusObj } from "@/utils/config";
import { validateUser,validateUserId,validatePassword } from '@/utils/validate.js'
import {
  apiGetAllRoleList,
  // apiGetRobotListSelect,
} from "@/api/interface/index";
// const validateUserId = (rule, value, callback) => {
//   if (value && !isUserId(value)) {
//     callback(new Error("工号格式应为字母、数字"));
//   } else {
//     callback();
//   }
// };
// const validatePassword = (rule, value, callback) => {
//   if (value && !isUserId(value)) {
//     callback(new Error("密码格式应为字母、数字"));
//   } else {
//     callback();
//   }
// };
export const formColumns = [
  {
    label: "工号",
    prop: "jobNumberLike",
    el: "input",
    placeholder: "请输入工号",
    clearable: true,
    span: 8,
  },
  {
    label: "用户名",
    prop: "realNameLike",
    el: "input",
    placeholder: "请输入用户名",
    clearable: true,
    span: 8,
  },
  // {
  //   label: "部门",
  //   prop: "nameLike",
  //   el: "select",
  //   placeholder: "请选择部门",
  //   clearable: true,
  //   span: 8,
  // },
  {
    label: "角色",
    prop: "roleId",
    el: "wSelect",
    getList: apiGetAllRoleList,
    "value-key": {
      label: "name",
      value: "id",
    },
    placeholder: "请选择角色",
    clearable: true,
    span: 8,
  },
  {
    label: "状态",
    prop: "status",
    el: "select",
    options: userStatus,
    placeholder: "请选择状态",
    clearable: true,
    span: 8,
  },
  {
    prop: "btns",
    span: 8,
  },
];
export const columns = (that) => [
  {
    label: "工号",
    prop: "jobNumber",
  },
  {
    label: "用户名",
    prop: "realName",
  },
  // {
  //   label: "部门",
  //   prop: "organization",
  // },
  {
    label: "角色",
    width: 140,
    "show-overflow-tooltip": true,
    render: (h, { row }) => {
      return row.roleList
        ? row.roleList.map((v) => <el-tag>{v.name}</el-tag>)
        : "";
    },
  },
  {
    label: "状态",
    render: (h, { row }) => {
      return (
        <span
          style={
            row.status === userStatus[0].value ? "color:#36BE01" : "color:#FF4D4F"
          }
        >
          {userStatusObj[row.status]}
        </span>
      );
    },
  },
  {
    label: "更新时间",
    prop: "updateTime",
    width: 140,
  },
  {
    label: "编辑人",
    prop: "editor",
  },
  {
    label: "操作",
    width: 320,
    render: (h, { row }) => {
      return [
        <el-link
          underline={false}
          icon="el-icon-remove-outline"
          onClick={() => {
            that.handleForbidden(row);
          }}
        >
          {row.status === userStatus[0].value ? "禁用" : "启用"}
        </el-link>,
        <el-divider direction="vertical" />,
        <el-button
          type="text"
          icon="el-icon-edit"
          onClick={() => {
            that.openDialog(row, true);
            console.log(row)
          }}
        >
          修改
        </el-button>,
        <el-divider direction="vertical" />,
        <el-link
          underline={false}
          icon="el-icon-delete"
          onClick={() => {
            that.handleDelete(row);
          }}
        >
          删除
        </el-link>,
      ];
    },
  },
];
export const formColumnsDialog = (orgData,isEdit) => [
  {
    label: "工号",
    prop: "jobNumber",
    el: "input",
    placeholder: "请输入工号",
    clearable: true,
    span: 20,
    maxlength:30,
    rules: [{
      required: true,
      message: "请输入工号",
    },
    { validator: validateUserId, trigger: 'blur' }]
  },
  {
    label: "用户名",
    prop: "realName",
    el: "input",
    placeholder: "请输入用户名",
    maxlength:30,
    clearable: true,
    rules: [{
      required: true,
      message: "请输入用户名",
    },{ validator: validateUser, trigger: 'blur' }],
    span: 20,
  },
  // {
  //   label: "所属部门",
  //   prop: "orgId",
  //   el: "cascader",
  //   options: orgData,
  //   props: {
  //     label: "name",
  //     children: "subList",
  //     checkStrictly: true,
  //     value: "id",
  //     emitPath: false,
  //   },
  //   "show-all-levels": false,
  //   placeholder: "请选择所属部门",
  //   clearable: true,
  //   rules: {
  //     required: true,
  //     message: "请选择所属部门",
  //   },
  //   span: 12,
  // },
  {
    label: "角色",
    el: "wSelect",
    prop: "roleId",
    getList: apiGetAllRoleList,
    "value-key": {
      label: "name",
      value: "id",
    },
    rules: {
      required: true,
      message: "请选择角色",
    },
    placeholder: "请选择角色",
    clearable: true,
    span: 20,
  },
  {
    label: "密码",
    prop: "password",
    el: "input",
    maxlength:30,
    placeholder: "请输入密码",
    clearable: true,
    rules: [{
      required: true,
      message: "请输入密码",
    },
    { validator: validatePassword, trigger: 'blur' }],
    span: 20,
  },
  // {
  //   label: "联系电话",
  //   prop: "mobile",
  //   el: "input",
  //   placeholder: "请输入联系电话",
  //   clearable: true,
  //   rules: [
  //     {
  //       required: true,
  //       message: "请输入联系电话",
  //     },
  //     { validator: validatePhone, trigger: "blur" },
  //   ],
  //   span: 12,
  // },
  // {
  //   label: "状态",
  //   prop: "status",
  //   el: "select",
  //   options: userStatus,
  //   placeholder: "请选择状态",
  //   clearable: true,
  //   rules: {
  //     required: true,
  //     message: "请选择状态",
  //   },
  //   span: 12,
  // },
  // {
  //   label: "配置机器人",
  //   el: "wSelect",
  //   prop: "robotIdList",
  //   getList: apiGetRobotListSelect,
  //   "value-key": {
  //     label: "title",
  //     value: "id",
  //   },
  //   rules: {
  //     required: true,
  //     message: "请选择机器人",
  //   },
  //   multiple: true,
  //   placeholder: "请选择机器人",
  //   clearable: true,
  //   span: 12,
  // },
  // {
  //   label: "备注",
  //   prop: "profile",
  //   el: "input",
  //   type: "textarea",
  //   placeholder: "请输入备注",
  //   clearable: true,
  //   span: 24,
  // },
];
