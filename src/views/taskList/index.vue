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
        :show-num="true"
        :selectable="() => true"
        :columns="columns"
        selection
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
import { fileDownLoad1 } from "@/components/DownLoad/utils.js";
import { WTable, WForm } from "@common-ui/w-form";
import { formColumns, columns } from "./config";
import { getTaskList, delTaskList } from "@/api/interface/index";
import service from "@/api/baseHttp/index.js";
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
        plateNumberLike: "",
        pageIndex: 1,
        pageSize: 10,
        "minBeginTime,maxBeginTime": [],
      },
      formColumns,
      columns: columns(this),
      tableData: [],
      total: 0,
    };
  },
  mounted() {
    const { plateNumber } = this.$route.query;
    if (plateNumber) {
      console.log("plateNumber>>", plateNumber);
      this.formData["plateNumberLike"] = plateNumber;
    }

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
      let time = this.formData["minBeginTime,maxBeginTime"];

      if (time.length > 0) {
        params["minBeginTime"] = time[0];
        params["maxBeginTime"] = time[1];
      }

      getTaskList(params).then((res) => {
        this.tableData = res.data.list;
        this.total = parseInt(res.data.totalCount);
      });
    },

    // 导出
    async exportFile(row) {
      if (row.reportUrl) {
        await this.$confirm("已经生成过报表是否重新生成", "提醒", {
          type: "warning",
          confirmButtonText: "确认", //确认按钮的文字显示
          cancelButtonText: "取消", //取消按钮的文本内容
        });
      }
      const url = "/task/generate";
      let res = await service({
        url,
        method: "post",
        data: { taskId: row.id },
      });
      if (res.code === 1) {
        this.$prompt("有报表生成成功是否下载?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          inputPattern: /^[^\s]*$/,
          inputErrorMessage: "名称不能为空",
          inputPlaceholder: "文件名称",
          type: "warning",
        })
          .then(({ value }) => {
            const params = new URLSearchParams(`taskId=${row.id}`);

            if (value) {
              params.append("downloadFile", value);
            }
            let host =
              NODE_ENV !== "prod"
                ? VUE_APP_DOMAIN_BASE
                : `http://${window.location.host}`;
            let newUrl = `${host}/task/download?${params.toString()}`;
            fileDownLoad1(newUrl);
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消下载",
            });
          });
      }
    },
    handleDelete(id) {
      this.$confirm("确认删除该条记录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delTaskList({ taskId: id }).then(() => {
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
