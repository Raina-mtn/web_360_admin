<template>
  <div>
    <div v-loading="loading" class="content" @click="powerOff">
      <span>断电保护</span>
    </div>

    <div v-loading="loading" class="content" style="margin-top: 20px;" @click="powerOn">
      <span>上电</span>
    </div>
  </div>
</template>

<script>
import { setDevicePower } from '@/api/interface/index';
export default {
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    powerOn() {
      if (this.loading) return;
      this.loading = true,
      setDevicePower({ power: 1 }).then(res => {
        this.$message.success('设备上电成功')
      }).catch(error => {
        this.$message.error('设备上电失败，请重试')
      }).finally(() => {
        this.loading = false
      })
    },

    powerOff() {
      if (this.loading) return;
      this.$confirm("断电操作存在风险请谨慎操作", "提醒", {
        type: "warning",
        confirmButtonText: "确认", //确认按钮的文字显示
        cancelButtonText: "取消", //取消按钮的文本内容
      }).then(async () => {
        this.loading = true,
        setDevicePower({ power: 0 }).then(res => {
          this.$message.success('断电保护成功')
        }).catch(error => {
          this.$message.error('断电保护失败，请重试')
        }).finally(() => {
          this.loading = false
        })
      });

    },
  },

}
</script>
<style lang="scss" scoped>
.content {
  height: 50px;
  width: 100%;
  background: url('~@/assets/images/btn_inline.png') no-repeat;
  background-size: 100% 100%;
  text-align: center;

  span {
    color: #fff;
    line-height: 50px;
  }
}
</style>
