<template>
  <div class="common-container">
    <PageLayout :title="'部件类型列表'">
      <div class="parts content flex flex-col">
        <WForm
          label-width="100px"
          :form-data="part.formData"
          :columns="part.formColumns"
          size="mini"
          class="flex-shrink-0"
          @inputEnter="partRefresh"
        >
          <div
            slot="btns"
            class="btns"
          >
            <el-button
              size="small"
              type="primary"
              class="button-linear"
              @click="partRefresh"
            >
              查 询
            </el-button>
            <el-button
              size="small"
              type="primary"
              @click="partReset"
            >
              重 置
            </el-button>
          </div>
        </WForm>
        <WTable
          ref="partMtable"
          show-num
          :table-data="part.tableData"
          :stripe="true"
          :border="false"
          :columns="part.columns"
          selection
          :selectable="() => true"
          :page="part.formData"
          :total="part.total"
          :size="'mini'"
          class="table-content"
          height="100%"
          :header-cell-style="{ background: '#002C75' }"
          :row-class-name="({ row, rowIndex }) => (rowIndex % 2 == 0 ? '' : 'warning-row')
          "
          @select="handleTableChange"
          @pageChange="partGetList"
          @row-click="partRowClick"
        />
      </div>
    </PageLayout>
    <PageLayout :title="'检测项列表'">
      <div class="parts content">
        <WForm
          label-width="100px"
          :form-data="items.formData"
          :columns="items.formColumns"
          size="mini"
          class="flex-shrink-0"
          @inputEnter="itemRefresh"
        >
          <div
            slot="btns"
            class="btns"
          >
            <el-button
              size="small"
              type="primary"
              class="button-linear"
              @click="itemRefresh"
            >
              查 询
            </el-button>
            <el-button
              size="small"
              type="primary"
              @click="itemReset"
            >
              重 置
            </el-button>
          </div>
        </WForm>
        <WTable
          ref="mtable"
          v-loading="items.loading"
          show-num
          :table-data="items.tableData"
          :stripe="true"
          :border="false"
          :columns="items.columns"
          selection
          :selectable="() => true"
          :page="items.formData"
          :total="items.total"
          :size="'mini'"
          class="table-content"
          height="100%"
          :header-cell-style="{ background: '#002C75' }"
          :row-class-name="({ row, rowIndex }) => (rowIndex % 2 == 0 ? '' : 'warning-row')"
          @pageChange="itemGetList"
        />
      </div>
    </PageLayout>
    <PartDialog
      ref="PartDialog"
      @refresh="partGetList"
    />
    <ItemDialog
      ref="ItemDialog"
      @refresh="itemGetList"
    />
  </div>
</template>
<script>
import PageLayout from "@/components/page-layout/index.vue";
import { WForm, WTable } from "@common-ui/w-form";
import {
  formColumnsParts,
  columnsParts,
  formColumnsItems,
  columnsItems,
} from "./config";
import { apiPartsListPage, apiItemListPage } from "@/api/interface/index";
import { listMixin } from "@/mixin/list";
import PartDialog from "./partDialog.vue";
import ItemDialog from "./itemDialog.vue";
export default {
  components: {
    WForm,
    WTable,
    PageLayout,
    PartDialog,
    ItemDialog,
  },
  mixins: [listMixin],
  data() {
    return {
      part: {
        formData: {
          pageIndex: 1,
          pageSize: 10,
          partsName: "",
        },
        formColumns: formColumnsParts,
        columns: columnsParts(this),
        tableData: [],
        total: 0,
      },
      items: {
        formData: {
          pageIndex: 1,
          pageSize: 10,
          partsName: "",
        },
        formColumns: formColumnsItems,
        columns: columnsItems(this),
        tableData: [],
        total: 0,
        loading: false,
      },
    };
  },
  mounted() {
    this.partGetList();
    this.itemGetList();
  },
  methods: {
    partGetList() {
      apiPartsListPage(this.part.formData).then((res) => {
        this.part.tableData = res.data.list;
        this.part.total = parseInt(res.data.totalCount);
      });
    },
    partReset() {
      this.part.formData = {
        pageIndex: 1,
        pageSize: 10,
        "minVisitTime,maxVisitTime": [],
      };
      this.partRefresh();
    },
    partRefresh() {
      this.part.formData.pageIndex = 1;
      this.part.formData.pageSize = 10;
      this.partGetList();
    },
    partRowClick(e) {
      if (this.items.formData.partsName == e.name) return;
      this.items.loading = true;
      this.$set(this.items.formData, "partsName", e.name);
      this.$refs.partMtable.$children[0].clearSelection();
      this.$refs.partMtable.$children[0].toggleRowSelection(e);
      this.itemGetList().finally(() => {
        this.items.loading = false;
      });
    },
    itemGetList() {
      return apiItemListPage(this.items.formData).then((res) => {
        this.items.tableData = res.data.list;
        this.items.total = parseInt(res.data.totalCount);
      });
    },
    itemReset() {
      this.items.formData = {
        pageIndex: 1,
        pageSize: 10,
        "minVisitTime,maxVisitTime": [],
      };
      this.itemRefresh();
    },
    itemRefresh() {
      this.items.formData.pageIndex = 1;
      this.items.formData.pageSize = 10;
      this.itemGetList();
    },
    handleTableChange(list, row) {
      this.partRowClick(row);
    },
  },
};
</script>
<style
  lang="scss"
  scoped
>
.common-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;

  ::v-deep {
    .pageLayout-container {
      width: 50%;
      padding: 0;
    }

    .el-table__header-wrapper {
      .el-table-column--selection {
        .el-checkbox {
          display: none !important;
        }
      }
    }
  }

  .content {
    width: 100%;
    padding: px2rem(20);
    border-radius: 8px;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .table {
    height: calc(100% - 8rem);

    ::v-deep {
      max-height: calc(100% - 6rem);
    }
  }
}

.btn-bar {
  margin: 10px;
}

.table-content {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  flex: 1;
}
.flex-shrink-0{
  flex-shrink: 0;
}
</style>
