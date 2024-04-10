<template>
  <el-dialog
    :visible="visible"
    :title="isEdit ? '修改角色' : '新增角色'"
    @close="$emit('on-change', false)"
  >
    <el-scrollbar style="height: 100%">
      <div class="item-hd">
        角色信息
      </div>
      <WForm ref="roleForm" :form-data="formData" :columns="formColumns" />
      <div class="item-hd">
        权限设置
      </div>
      <el-tree
        ref="tree"
        class="filter-tree"
        :data="menuTree"
        :props="defaultProps"
        node-key="id"
        default-expand-all
        show-checkbox
        :expand-on-click-node="false"
        style="padding: 10px"
      />
    </el-scrollbar>
    <div slot="footer" class="btn-grops">
      <el-button icon="el-icon-circle-close" @click="$emit('on-change', false)">
        取 消
      </el-button>
      <el-button
        type="primary"
        icon="el-icon-circle-check"
        class="button-linear"
        @click="submit"
      >
        确 定
      </el-button>
    </div>
  </el-dialog>
</template>
<script>
import { cloneDeep } from "lodash-es";
import { WForm } from "@common-ui/w-form";
// import { roleType } from "@/utils/config";

import {
  apiCreateRole,
  apiUpdateRole,
  apiGetMenuList,
} from "@/api/interface/index";
// import { arrayToTree } from '@/utils/util'
export default {
  components: {
    WForm,
  },
  model: {
    prop: "visible",
    event: "on-change",
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      formData: {},
      formColumns: [
        // {
        //   label: "角色编码",
        //   prop: "id",
        //   el: "input",
        //   placeholder: "请输入角色编码",
        //   clearable: true,
        //   rules: {
        //     required: true,
        //     message: "请输入角色编码",
        //   },
        //   span: 12,
        // },
        {
          label: "角色名称",
          prop: "name",
          el: "input",
          placeholder: "请输入角色名称",
          clearable: true,
          rules: {
            required: true,
            message: "请输入角色名称",
          },
          span: 12,
          maxlength: 30,
        },
        // {
        //   label: "角色类型",
        //   prop: "type",
        //   el: "select",
        //   placeholder: "请选择角色类型",
        //   clearable: true,
        //   options: roleType,
        //   rules: {
        //     required: true,
        //     message: "请选择角色类型",
        //   },
        //   span: 12,
        // },
        {
          label: "备注",
          prop: "memo",
          el: "input",
          type: "textarea",
          placeholder: "请输入备注",
          clearable: true,
          span: 12,
          maxlength: 50,
        },
      ],
      defaultProps: {
        children: "subList",
        label: "name",
        disabled: this.disabledFunc,
      },
      resourceIdList: [],
      menuTree: [],
    };
  },
  created() {
    this.getMenuList();
  },
  methods: {
    async getMenuList() {
      const { data } = await apiGetMenuList();
      this.menuTree = data.data;
    },
    submit() {
      const api = this.isEdit ? apiUpdateRole : apiCreateRole;
      const params = {
        ...this.formData,
        resourceIdList: this.$refs.tree.getCheckedKeys(),
      };
      this.$refs.roleForm.validate((valid) => {
        if (valid) {
          api({ ...params, type: "角色" }).then(() => {
            this.$message.success("提交成功");
            this.$emit("submit", false);
          });
        }
      });
    },
    show(row) {
      this.$refs.tree && this.$refs.tree.setCheckedKeys([]);
      const { id, name, resourceList, type } = row || {};
      let resourceIdList =
        resourceList && resourceList.length
          ? resourceList.map((v) => v.id)
          : [];

      resourceIdList = resourceIdList.includes("1")
        ? resourceIdList
        : [...resourceIdList, "1"];
      setTimeout(() => {
        resourceIdList.forEach((i) => {
          console.log(this.$refs.tree, "val;;;;");
          let node = this.$refs.tree.getNode(i);
          console.log(node);
          if (node.isLeaf) {
            this.$refs.tree.setChecked(node, true);
          }
        });
      }, 100);
      this.formData = cloneDeep({
        id,
        name,
        resourceIdList: resourceIdList,
        type,
      });
    },

    disabledFunc(data, node) {
      if (node.data.code == "Home") {
        return true;
      }
      if (node.data.subList?.length) {
        return true;
      }
      return false;
    },
  },
};
</script>
<style lang="scss" scoped>
.item-hd {
  font-size: px2rem(16);
  color: #999;
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
.tree-container {
  border: 1px solid #cccccc;
  border-radius: 8px;
}
</style>
