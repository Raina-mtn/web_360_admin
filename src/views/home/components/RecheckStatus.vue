<template>
  <div class="recheck-status">
    <titleCom
      title-name="复检执行情况"
      :title-bg="require('@/assets/images/ic_home_retest.png')"
    />
    <div class="recheck-status_choose">
      <el-radio-group v-model="chooseRadio">
        <el-radio :label="'all'">
          全部
        </el-radio>
        <el-radio :label="'false'">
          未审核
        </el-radio>
        <el-radio :label="'true'">
          已审核
        </el-radio>
      </el-radio-group>
    </div>
    <div class="recheck-status_content">
      <el-row :gutter="20">
        <el-col
          v-for="(item, index) in showList"
          :key="item.plateNumber + index"
          :span="6"
        >
          <div class="content-grid">
            <div class="content-grid__header">
              <div class="name">
                {{ item.plateNumber }}
              </div>
              <div
                v-if="item.state !== 'FINISHED'"
                class="status"
              >
                <template>
                  <div class="cycle" />
                  <span class="nodeal">{{ processStateObj[item.state] }}</span>
                </template>
              </div>
            </div>
            <div class="content-grid__times">
              <p>巡检时间：</p>
              <div>{{ item.patrolTime }}</div>
            </div>
            <div
              v-if="item.state == 'FINISHED'"
              class="content-grid__mark"
            >
              <img
                src="../../../assets/images/ic_home_processed.png"
                alt=""
              >
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import titleCom from "./title.vue";
import { checkData } from "@/api/interface/modules/home";
import { processStateObj } from "@/utils/config";
export default {
  components: {
    titleCom,
  },

  data() {
    return {
      chooseRadio: "all",
      showList: [],
      processStateObj,
    };
  },

  watch: {
    chooseRadio(val) {
      this.showList = [];
      if (val === "all") {
        this.handleGetData("");
      } else {
        this.handleGetData(val);
      }
    },
  },

  created() {
    this.handleGetData("");
  },

  methods: {
    async handleGetData(props) {
      const res = await checkData({ hasAudit: props });
      this.showList = res.data || [];
      console.log("打印数据handleGetData---:", res);
    },
  },
};
</script>

<style
  scoped
  lang="scss"
>
.recheck-status {
  position: relative;
  color: #fff;
  margin-right: 12px;

  &_choose {
    position: absolute;
    right: 0;
    top: 16px;
  }

  ::v-deep {
    .el-radio__input.is-checked .el-radio__inner {
      border-color: #1cdafc;
      background: #1cdafc;
    }

    .el-radio__input.is-checked+.el-radio__label {
      color: #fff;
    }

    .el-radio__inner {
      border-color: #1cdafc;
    }
  }

  &_content {
    width: 936px;
    height: 304px;
    background: #001344;
    margin-top: 10px;
    padding: 24px 24px 0px;
    overflow-y: auto;

    .content-grid {
      position: relative;
      width: 100%;
      height: 94px;
      background: url("~@/assets/images/bg_home_retest.png") no-repeat;
      background-size: 100% 94px;
      padding: 10px 12px;
      margin-bottom: 24px;

      &__header {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .name {
          font-size: 14px;
          font-weight: bold;
          color: #ffffff;
        }

        .status {
          display: flex;
          align-items: center;
          font-size: 12px;

          .cycle {
            width: 8px;
            height: 8px;
            background: #ff5555;
            border-radius: 50%;
          }

          .nodeal {
            color: #ff5555;
            margin-left: 6px;
          }

          .over {
            color: #67fbf1;
          }
        }
      }

      &__times {
        font-size: 14px;
        margin-top: 12px;
        line-height: 18px;
      }

      &__mark {
        position: absolute;
        bottom: 4px;
        right: 10px;
      }
    }
  }
}
</style>
