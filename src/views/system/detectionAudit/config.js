export const formColumnsParts = [
  {
    label: "部件类型:",
    prop: "partsName",
    el: "input",
    placeholder: "请输入部件类型",
    clearable: true,
    span: 8,
  },
  {
    prop: "btns",
    span: 6,
  },
];
export const columnsParts = (that) => {
  return [
    {
      label: "部件类型",
      prop: "name",
    },
    {
      label: "操作",
      width: 160,
      render: (h, { row }) => {
        return [
          <el-button
            type="text"
            onClick={() => {
              that.$refs.PartDialog.openDialog({ row });
            }}
            style="color:#1CDAFC"
          >
            编辑
          </el-button>,
        ];
      },
    },
  ];
};

export const formColumnsItems = [
  // {
  //   label: "部件类型:",
  //   prop: "partsName",
  //   el: "input",
  //   placeholder: "请输入部件类型",
  //   clearable: true,
  //   span: 8,
  // },
  {
    label: "检测项:",
    prop: "itemName",
    el: "input",
    placeholder: "请输入检测项",
    clearable: true,
    span: 8,
  },
  {
    prop: "btns",
    span: 6,
  },
];
export const columnsItems = (that) => {
  return [
    {
      label: "检测项",
      prop: "name",
    },
    {
      label: "操作",
      width: 160,
      render: (h, { row }) => {
        return [
          <el-button
            type="text"
            onClick={() => {
              that.$refs.ItemDialog.openDialog({ row });
            }}
            style="color:#1CDAFC"
          >
            编辑
          </el-button>,
        ];
      },
    },
  ];
};
