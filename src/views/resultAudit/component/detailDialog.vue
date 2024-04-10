<!--
 * @Date: 2022-07-26 14:21:30
 * @LastEditors: zhusisheng zhusisheng@shenhaoinfo.com
 * @LastEditTime: 2023-03-22 10:31:58
 * @FilePath: \web_360_admin\src\views\inspectManage\defect\component\detailDialog.vue
-->
<template>
  <el-dialog :visible="visible" title="详情" width="900px" class="content" :append-to-body="true" @close="close">
    <template v-if="visible">
      <el-scrollbar class="content" style="height: 100%; width: 100%; padding-right: 20px">
        <WForm ref="form" :form-data="formData" :columns="formColumns">
          <template #partsId>
            <el-form-item label="部件" :rules="{ required: true, message: '部件不能为空' }">
              <el-select :value="formData.partsId" placeholder="请选择部件" clearable @change="partsIdChange">
                <el-option v-for="item in cpuPartsId.list" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </el-form-item>
          </template>
          <template #itemId>
            <el-form-item label="检测项" :rules="{ required: true, message: '检测项不能为空' }">
              <el-select :value="formData.itemId" placeholder="请选择检测项" clearable @change="itemIdChange">
                <el-option v-for="item in cpuItemId.list" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </el-form-item>
          </template>
        </WForm>
      </el-scrollbar>
      <div slot="footer" class="btn-grops">
        <el-button icon="el-icon-circle-close" class="button-plain" @click="visible = false">
          取 消
        </el-button>
        <el-button type="primary" icon="el-icon-circle-check" class="button-linear" @click="submit">
          确 定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script>
import { WForm } from "@common-ui/w-form";
import {
  getErrorList,
  createdefect,
  updateDefect,
  queryItem,
  queryParts
} from "@/api/interface/index";
import { defectSource, imgPosition } from "@/utils/config.js";
export default {
  components: {
    WForm,
  },
  inject: ["getTaskInfo"],
  data() {
    return {
      visible: false,
      resolve: null,
      reject: null,
      formData: {
        width: 0,
        height: 0,
        startPointY: 0,
        startPointX: 0,
        source: "Sign",
        memo: "",
        position: "",
      },
      formColumns: [
        {
          label: "宽度",
          prop: "width",
          el: "input",
          placeholder: "width",
          clearable: true,
          rules: {
            required: true,
            message: "width",
          },
          span: 12,
        },
        {
          label: "高度",
          prop: "height",
          el: "input",
          placeholder: "height",
          clearable: true,
          rules: {
            required: true,
            message: "height",
          },
          span: 12,
        },
        {
          label: "顶部像素",
          prop: "startPointY",
          el: "input",
          placeholder: "startPointY",
          clearable: true,
          rules: {
            required: true,
            message: "startPointY",
          },
          span: 12,
        },
        {
          label: "左边像素",
          prop: "startPointX",
          el: "input",
          placeholder: "startPointX",
          clearable: true,
          rules: {
            required: true,
            message: "startPointX",
          },
          span: 12,
        },
        {
          label: "故障来源",
          prop: "source",
          el: "select",
          placeholder: "source",
          clearable: true,
          options: defectSource,
          disabled: true,
          rules: {
            required: true,
            message: "source",
          },
          span: 12,
        },
        {
          label: "备注",
          prop: "memo",
          el: "input",
          placeholder: "memo",
          clearable: true,
          rules: {
            required: false,
            message: "memo",
          },
          span: 12,
        },
        {
          prop: "partsId",
          list: [],
          span: 12,
        },
        {
          prop: "itemId",
          list: [],
          span: 12,
        },
        {
          label: "故障描述",
          prop: "errorId",
          placeholder: "请选择识别类型",
          clearable: true,
          el: "wSelect",
          getList: async () => ({
            data: (await getErrorList()).data,
          }),
          rules: {
            required: true,
            message: "请输入故障描述",
          },
          "value-key": {
            label: "name",
            value: "id",
          },
          span: 12,
        },
        {
          label: "位置",
          prop: "position",
          el: "select",
          placeholder: "position",
          clearable: true,
          options: imgPosition,
          disabled: true,
          rules: {
            required: true,
            message: "position",
          },
          span: 12,
        },
      ],
    };
  },
  computed: {
    computedTaskInfo() {
      return this.getTaskInfo();
    },
    cpuPartsId() {
      return this.formColumns.find((item) => item.prop == "partsId");
    },
    cpuItemId() {
      return this.formColumns.find((item) => item.prop == "itemId");
    },
  },
  methods: {
    show({ editData, originData }) {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async (resolve, reject) => {
        try {
          if (originData.id) {
            let { source, memo, errorId, itemId, partsId } = originData;
            this.formData.source = source;
            this.formData.memo = memo;
            this.formData.errorId = errorId;
            this.formData.itemId = itemId;
            this.formData.partsId = partsId;
            this.id = originData.id;
          }
          let { width, height, startPointY, startPointX } = editData;
          this.formData.width = width;
          this.formData.height = height;
          this.formData.width = width;
          this.formData.startPointY = startPointY;
          this.formData.startPointX = startPointX;
          this.formData.position = originData.position;
          this.originData = originData;

          this.setPartsList();
          this.setItemList(this.formData.partsId);
          this.resolve = resolve;
          this.reject = reject;
          this.visible = true;
        } catch (error) {
          console.log("error", error);
        }
      });
    },
    close() {
      this.visible = false;
      this.resolve = null;
      this.reject = null;
      this.formData = {
        width: 0,
        height: 0,
        startPointY: 0,
        startPointX: 0,
        source: "Sign",
        memo: "",
        position: "",
      };
    },

    submit() {
      // eslint-disable-next-line no-unused-vars
      const api = this.id ? updateDefect : createdefect;
      this.$refs.form.validate((valid) => {
        if (!valid) return;
        if (!this.formData.partsId) {
          this.$message.warning('部件不能为空')
          return
        }

        if (!this.formData.itemId) {
          this.$message.warning('检测项不能为空')
          return
        }

        let params = {};
        Object.entries(this.formData).map(([k, v]) => {
          if (!Reflect.has(this.originData, k) || this.originData[k] !== v) {
            params[k] = v;
          }
        });
        const carriage = this.computedTaskInfo.baseInfo.carriage;
        const position =  this.originData.position;
        params["taskId"] = this.computedTaskInfo.baseInfo.taskId;
        params["carriage"] = carriage;
        params["plateNumber"] = this.computedTaskInfo.patrolInfo.plateNumber;
        params["position"] = position;
        params["positionDesc"] = `${carriage}${position}`


        if (params["source"] && params["source"] == "Sign") {
          params["type"] = "MISSING";
        }

        if (this.id) {
          params["id"] = this.id;
        }
        api(params).then((res) => {
          this.$message.success("提交成功");
          let id = !this.id ? res.data : this.id;
          params["id"] = id;
          console.log(params);
          this.resolve(params);
          this.close();
        });
      });
    },

    async setPartsList() {
      this.cpuPartsId.list = (await queryParts()).data;
    },
    partsIdChange(val) {
      if (!val) {
        this.formData.partsId = null;
        this.formData.itemId = null;
        this.cpuItemId.list = [];
        this.$forceUpdate();
        return;
      }
      this.formData.partsId = val;
      this.$forceUpdate();
      this.setItemList(val);
    },
    async setItemList(partsId) {
      console.log('setItemList>>>>>>>>>>>>>>>>>', partsId)
      this.cpuItemId.list = (await queryItem({ partsId })).data;
    },
    itemIdChange(val) {
      this.formData.itemId = val;
      this.$forceUpdate();
    },
  },
};
</script>
<style lang="scss" scoped>
.item-hd {
  font-size: px2rem(16);
  color: #fff;
  padding-left: 1rem;
  position: relative;
  margin-bottom: 2rem;

  &:after {
    position: absolute;
    content: "";
    left: 0;
    top: 50%;
    transform: translate(0%, -50%);
    width: 4px;
    height: 1rem;
    border-radius: 2px;
  }
}

.mapArea {
  width: 100%;
  height: 40rem;
  background-size: 100% auto;
  position: relative;
  // background-color: #ccc;
}

::v-deep {
  .el-dialog__body {
    padding: 30px px2rem(60);
  }

  .el-descriptions__body {
    background: none;
    color: #fff;
  }

  // 清除滚动条
  ::-webkit-scrollbar {
    width: 0 !important;
  }

  ::-webkit-scrollbar {
    width: 0 !important;
    height: 0;
  }
}
</style>
