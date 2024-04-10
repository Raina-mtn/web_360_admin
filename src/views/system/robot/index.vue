<template>
  <PageLayout class="robot">
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
          创建
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
    <RobotDialog ref="RobotDialog" />
  </PageLayout>
</template>
<script>
import PageLayout from '@/components/page-layout/index.vue';
import { WForm, WTable } from '@common-ui/w-form';

import RobotDialog from './components/RobotDialog.vue';
import { getRobotList,  deleteRobot} from '@/api/interface/modules/system/robot-mangement';

export default {
  components: {
    PageLayout,
    WForm,
    WTable,
    RobotDialog,
  },
  data() {
    return {
      formData: {
        pageSize: 10,
        pageIndex: 1,
        patrolTime: [],
      },

      // search Form
      formColumns: [
        {
          label: '型号编码',
          prop: 'codeLike',
          el: 'input',
          span: 4,
        },
        {
          label: '型号名称',
          prop: 'nameLike',
          el: 'input',
          span: 4,
        },
        {
          prop: 'btns',
          span: 5,
        },
      ],

      // table columns
      columns: [
        {
          label: 'id',
          prop: 'id',
          width: '80',
        },
        {
          label: '型号',
          width: '200',
          render: (h, { row }) => {
            return <span>{`${row.model?.code}(${row.model?.name})`}</span>;
          },
        },
        {
          label: '名称',
          prop: 'title',
        },
        {
          label: '出厂号',
          width: '140',
          prop: 'factoryNumber',
        },
        {
          label: '机器人简介',
          prop: 'desc',
        },
        {
          label: '发售时间',
          width: '140',
          prop: 'createTime',
        },
        {
          label: '操作',
          width: '100',
          render: (h, { row }) => {
            return (
              <div class="btn-box">
                <el-link
                  type="danger"
                  underline={false}
                  onClick={() => {
                    this.deleteRobotItem(row);
                  }}
                >
                  删除
                </el-link>
                <el-link
                  type="primary"
                  onClick={() => {
                    this.createOrUpdataItem('edit', row);
                  }}
                >
                  详情
                </el-link>
              </div>
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
    },
  },
  watch: {
    lineId(value) {
      this.getList();
    },
  },
  mounted: function () {
    this.getList();
  },
  methods: {
    getList() {
      const params = {
        ...this.formData,
        lineId: this.lineId,
        direction: 'DESC',
        includeSetting: true,
      };
      delete params.patrolTime;
      getRobotList(params).then((res) => {
        this.tableData = res.data.list;
        this.total = Number(res.data.totalCount);
      });
    },

    // 创建或修改
    createOrUpdataItem(type, dialogData) {
      this.$refs.RobotDialog.openDialog({ type, dialogData }).then((data) => {
        this.getList();
      });
    },

    deleteRobotItem({title, id}){
      this.$confirm(`是否要删除名称为"${title}"的机器人?`, this.$t('common.tipTitle'), {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then((res) => {
        deleteRobot({ id }).then(() => {
          this.$message.success("删除成功");
          this.getList()
        });
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.robot {
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
