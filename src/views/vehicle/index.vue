<template>
  <PageLayout>
    <div class="content-right">
      <WForm
        label-width="90px"
        :form-data="formData"
        :columns="vehicleForm"
        size="mini"
        @inputEnter="getList"
        @currentObj="getCurrentObj"
      >
        <div slot="btns" class="btns">
          <el-button type="primary" class="btnPrimary" @click="refresh">
            查 询
          </el-button>
          <el-button type="primary" class="btnPrimary" @click="reset">
            重 置
          </el-button>
          <!-- <ImportFile action="/vehicle/import" @getList="getList" />
          <el-button type="primary" class="btnPrimary" icon="el-icon-upload2" @click="exportFile">
            导 出
          </el-button> -->
        </div>
      </WForm>
      <div class="btn-bar">
        <el-button
          icon="el-icon-plus"
          type="primary"
          size="mini"
          @click="$refs.vehicleDialog.openDialog()"
        >
          新 增
        </el-button>
      </div>
      <WTable
        ref="mtable"
        :table-data="tableData"
        :stripe="true"
        :border="false"
        :columns="columns"
        selection
        :show-num="true"
        :selectable="() => true"
        :page="formData"
        :total="total"
        :size="'mini'"
        :header-cell-style="{ background: '#002C75' }"
        :row-class-name="
          ({ row, rowIndex }) => (rowIndex % 2 == 0 ? '' : 'warning-row')
        "
        @pageChange="getList"
        @sort-change="sortChange"
      />
    </div>
    <VehicleDialog ref="vehicleDialog" @refresh="getList" />
  </PageLayout>
</template>
<script>
import { listMixin } from "@/mixin/list";
import { WForm, WTable } from "@common-ui/w-form";
import VehicleDialog from "./vehicleDialog.vue";
// import ImportFile from './import.vue'
import PageLayout from "@/components/page-layout/index.vue";
import { vehicleFormColumns, vehicleColumns } from "./config";
import {
  apiVehicleList,
  apiGetPlaceList,
  apiDeleteVehicle,
  apiExportList,
} from "@/api/interface/index";
export default {
  components: {
    VehicleDialog,
    PageLayout,
    // ImportFile,
    WForm,
    WTable,
  },
  mixins: [listMixin],
  data() {
    return {
      formData: {
        pageIndex: 1,
        pageSize: 10,
        "minBeginTime,maxBeginTime": [],
      },
      columns: vehicleColumns(this),
      tableData: [],
      total: 0,
      areaList: [],
    };
  },
  computed: {
    vehicleForm() {
      return vehicleFormColumns(this.areaList);
    },
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      const params = {
        ...this.formData,
      };
      let time = this.formData["minBeginTime,maxBeginTime"];

      if (time.length > 0) {
        params["minBeginTime"] = time[0];
        params["maxBeginTime"] = time[1];
      }
      apiVehicleList(params).then((res) => {
        this.tableData = res.data.list;
        this.total = parseInt(res.data.totalCount);
      });
    },
    refresh() {
      this.formData.pageIndex = 1;
      this.formData.pageSize = 10;
      this.getList();
    },
    getCurrentObj(obj, key) {
      if (key === "lineId") {
        const params = {
          lineId: obj.id,
          pageIndex: 1,
          pageSize: 1000,
        };
        apiGetPlaceList(params).then(
          (res) =>
            (this.areaList = res.data.list.map((v) => ({
              label: v.chName,
              value: v.id,
            })))
        );
      }
    },
    sortChange({ order, prop }) {
      let orderBy = null;
      if (order === "descending") {
        orderBy = "desc";
      } else {
        orderBy = "asc";
      }
      let params = {
        ...this.formData,
        orderColumn: prop,
        orderBy,
      };
      let time = this.formData["minBeginTime,maxBeginTime"];

      if (time.length > 0) {
        params["minBeginTime"] = time[0];
        params["maxBeginTime"] = time[1];
      }
      apiVehicleList(params).then((res) => {
        this.tableData = res.data.list;
        this.total = parseInt(res.data.totalCount);
      });
    },
    handleDelete(id) {
      this.$confirm("确认删除该条记录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          apiDeleteVehicle({ id: id }).then(() => {
            this.$message.success("删除成功！");
            this.getList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    exportFile(e) {
      if (!this.$refs.mtable.$children[0].selection.length) {
        this.$message.error("请至少选择一条记录！");
      } else {
        this.$prompt("请输入导出文件名！", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          inputValidator: (value) => (value ? true : "请输入导出文件名！"),
        }).then(({ value }) => {
          const params = {
            idList: this.$refs.mtable.$children[0].selection.map((i) => i.id),
          };
          const url = "/vehicle/export";
          const token = this.$store?.state?.user?.token;
          apiExportList({ url, params, name: value, token });
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.content-right {
  .btn {
    i {
      color: #1cdafc;
      font-size: 20px;
    }
  }
  .table {
    height: calc(100% - 8rem);
    ::v-deep {
      max-height: calc(100% - 6rem);
    }
  }
  .btn-bar {
    margin: 10px !important;
  }
}
</style>
