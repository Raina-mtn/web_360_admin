<template>
  <PageLayout>
    <div class="content">
      <WForm
        label-width="90px"
        :form-data="formData"
        :columns="formColumns"
        size="mini"
        @inputEnter="getList"
      >
        <div slot="btns" class="btns">
          <el-button type="primary" class="btnPrimary" @click="search">
            查 询
          </el-button>
          <el-button type="primary" class="btnPrimary" @click="reset">
            重 置
          </el-button>
        </div>
      </WForm>
      <WTable
        ref="mtable"
        :table-data="tableData"
        :stripe="true"
        :border="false"
        :columns="columns"
        selection
        :selectable="() => true"
        :page="formData"
        :total="total"
        :size="'mini'"
        :header-cell-style="{ background: '#002C75' }"
        :row-class-name="
          ({ row, rowIndex }) => (rowIndex % 2 == 0 ? '' : 'warning-row')
        "
        @pageChange="getList"
      />
    </div>
  </PageLayout>
</template>
<script>
import PageLayout from "@/components/page-layout/index.vue";
import {listMixin} from "@/mixin/list"
import { WForm, WTable } from "@common-ui/w-form";
import { formColumns, columns } from "./config";
import { getTaskList } from "@/api/interface/index";
import { fileDownLoad1 } from "@/components/DownLoad/utils.js";
const { NODE_ENV, VUE_APP_DOMAIN_BASE } = process.env;

export default {
  components: {
    WForm,
    WTable,
    PageLayout,
  },
  mixins:[listMixin],
  data() {
    return {
      formData: {
        pageIndex: 1,
        pageSize: 10,
        "minReportTime,maxReportTime": [],
      },
      formColumns,
      columns: columns(this),
      tableData: [],
      total: 0,
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    search() {
      this.formData.pageIndex = 1;
      this.getList();
    },
    getList() {
      const params = {
        ...this.formData,
      };
      let time = this.formData["minReportTime,maxReportTime"];

      if (time.length > 0) {
        params["minReportTime"] = time[0];
        params["maxReportTime"] = time[1];
      }
      getTaskList(params).then((res) => {
        this.tableData = res.data.list;
        this.total = parseInt(res.data.totalCount);
      });
    },

    // 导出
    async exportFile(row) {
      const url = "/task/generate";
      this.$store.dispatch("downLoad/add", {
        url,
        params: { taskId: row.id },
        responseType: "json",
      });
    },

    async downLoad(row) {
      if (row.state !== "AUDITED") {
        this.$message.warning("请先复核报警后再生成报表！");
        return;
      }
      const params = new URLSearchParams(`taskId=${row.id}`);
      let downloadFile = "";
      try {
        downloadFile = (
          await this.$prompt("请输入下载名称", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            inputPattern: /^[^\s]*$/,
            inputErrorMessage: "名称不能为空",
          })
        ).value;
      } finally {
        if (downloadFile) {
          params.append("downloadFile", downloadFile);
        }
      }

      let host =
        NODE_ENV !== "prod"
          ? VUE_APP_DOMAIN_BASE
          : `http://${window.location.host}`;
      let newUrl = `${host}/task/download?${params.toString()}`;
      fileDownLoad1(newUrl);
    },
  },
};
</script>
<style lang="scss" scoped>
.content {
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
    margin: 10px;
  }
}
</style>
