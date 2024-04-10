<template>
  <div class="component-list">
    <div class="component-list__header">
      <p class="title">
        组件列表
      </p>
      <el-link :underline="false" class="opration-btn" type="success" @click="createOrUpdataItem('create')">
        添加
      </el-link>
    </div>
    <el-table :data="componentList" border style="width: 100%" size="mini">
      <el-table-column prop="id" label="id" width="40" />
      <el-table-column prop="name" label="名称" width="80" show-overflow-tooltip />
      <el-table-column prop="deviceType" label="设备类型" show-overflow-tooltip />
      <el-table-column align="center" label="操作" width="80" show-overflow-tooltip>
        <template slot-scope="{ row }">
          <div class="btn-box">
            <el-link
              :underline="false"
              class="opration-btn"
              type="warning"
              @click="createOrUpdataItem('edit',row)"
            >
              编辑
            </el-link>
            <el-link
              :underline="false"
              class="opration-btn"
              type="danger"
              disabled
              @click="deleteIndicator(data)"
            >
              删除
            </el-link>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <ModelComponentDialog ref="ModelComponentDialog" />
  </div>
</template>
<script>
import ModelComponentDialog from "./ModelComponentDialog.vue";
// import { getRobotModelList } from "@/api/interface/modules/system/model.js";

export default {
  name: 'ComponentList',
  components: {
    ModelComponentDialog
  },
  model: {
    prop: 'componentList',
    event: 'change',
  },
  props: {
    componentList: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    // 创建或修改
    createOrUpdataItem(type, dialogData) {
      this.$refs.ModelComponentDialog.openDialog({ type, dialogData }).then((data) => {
        switch (type) {
          case 'create':
            this.componentList.push(data)
            this.$emit('change', this.componentList)
            break;
          case 'edit':
            {
              for( let [key,value] of Object.entries(dialogData)){
                if(data[key] && data[key]!== value){
                  dialogData[key] = data[key]
                }
              }
            }
            break;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.component-list {
  display: flex;
  flex-direction: column;
  .component-list__header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .title {
      &:before {
        content: '*';
        color: #f56c6c;
        margin-right: 4px;
      }
    }
  }
  ::v-deep {
    .btn-box {
      display: flex;
      justify-content: space-around;
      .opration-btn {
        font-size: 12px;
      }
    }
  }
}
</style>
