<template>
  <PageLayout>
    <WForm
      label-width="100px"
      :form-data="formData"
      :columns="formColumns"
      size="mini"
      @inputEnter="getList"
    >
      <div slot="btns">
        <el-button type="primary" class="btnPrimary" @click="getList">
          查询
        </el-button>
        <el-button type="primary" class="btnPrimary" @click="createOrUpdataItem('create')">
          添加
        </el-button>
      </div>
    </WForm>
    <WTable
      :table-data="tableData"
      :columns="columns"
      :page="formData"
      :total="total"
      :size="'mini'"
      :header-cell-style="{ background: '#eee' }"
      @pageChange="getList"
    />
    <ModelDialog
      ref="ModelDialog"
    />
  </PageLayout>
</template>
<script>
import PageLayout from '@/components/page-layout/index.vue'
import { WForm, WTable } from "@common-ui/w-form";

import ModelDialog from "./component/ModelDialog.vue";
import { getRobotModelList } from "@/api/interface/modules/system/model.js";

export default {
  components: {
    PageLayout,
    WForm,
    WTable,
    ModelDialog
  },
  data() {
    return {
      formData: {
        pageSize: 10,
        pageIndex: 1,
        patrolTime: []
      },

      // search Form
      formColumns: [
        {
          label: "型号编码",
          prop: "codeLike",
          el: "input",
          span:4,
        },
        {
          label: "型号名称",
          prop: "nameLike",
          el: "input",
          span:4,
        },
        {
          prop: "btns",
          span:3,
        }
      ],

      // table columns
      columns: [
        {
          label: "id",
          prop: "id",
          width: "80",
        },
        {
          label: "型号",
          prop: "code",
          width: "140",

        },
        {
          label: "名称",
          prop: "name",
        },
        {
          label: "发售时间",
          width: "140",
          prop: "createTime"
        },
        {
          label: "操作",
          width: "100",
          render: (h, { row }) => {
            return (
              <el-button
                type="text"
                disabled={row.handleResult === 'Y'}
                onClick={() => {
                  this.createOrUpdataItem('edit', row);
                }}
              >
                详情
              </el-button>
            );
          },
        },
      ],
      tableData: [],
      total: 0,
    };
  },
  computed: {
    lineId() {
      return this.$store.state.line.lineId
    }
  },
  watch: {
    lineId(value) {
      this.getList();
    }
  },
  mounted: function() {
    this.getList();
  },
  methods: {
    getList() {
      const params = {
        ...this.formData,
        lineId: this.lineId,
        direction: 'DESC'
      };
      delete params.patrolTime
      getRobotModelList(params).then((res) => {
        this.tableData = res.data.list;
        this.total = Number(res.data.totalCount);
      });
    },

    // 创建或修改
    createOrUpdataItem(type, dialogData) {
      this.$refs.ModelDialog.openDialog({ type, dialogData }).then((data) => {
        console.log(data)
        switch (type) {
          case 'create':
            this.tableData.push(data)
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
    }
  }
};
</script>
