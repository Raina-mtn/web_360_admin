export const listMixin = {
  data(){
    return{
      formData: {
        pageIndex: 1,
        pageSize: 10
      }
    }
  },
  methods:{
    refresh(){
      this.formData.pageIndex = 1
      this.formData.pageSize = 10
      this.getList()
    },
    reset(){
      this.formData = {
        pageIndex: 1,
        pageSize: 10,
        'minCreateTime,maxCreateTime':[],
        "minBeginTime,maxBeginTime": [],
        'minVisitTime,maxVisitTime':[],
        "minReportTime,maxReportTime": [],
      }
      this.getList()
    },
    handleDelete(row, msg="确认删除"){
      return new Promise((reslove)=>{
        this.$confirm(msg, '提示', {
          type: 'warning'
        }).then(() => {
          this.deleteAPi({
            id: row.id
          }).then(() => {
            this.$message.success('删除成功')
          }).finally(() => {
            this.getList()
            reslove()
          })
        })
      })
    },
  }
}