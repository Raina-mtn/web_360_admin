<template>
  <div class="w-check-form">
    <el-checkbox
      v-model="checkAll"
      :indeterminate="isIndeterminate"
      @change="handleCheckAllChange"
    >
      全选
    </el-checkbox>
    <el-checkbox-group
      v-model="checkList"
      class="checkbox-group"
      @change="handleCheckedChange"
    >
      <el-checkbox
        v-for="item in options"
        :key="item[keyValue.value]"
        :label="item[keyValue.value]"
      >
        {{ item[keyValue.label] }}
      </el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script>
export default {
  name: "WCheckBox",
  model: {
    prop: "value",
    event: "change",
  },
  props: {
    value: {
      type: String,
      default: "",
    },
    options: {
      type: Array,
      default: () => {
        return [];
      },
    },
    keyValue: {
      type: Object,
      default: () => {
        return {
          label: "label",
          value: "value",
        };
      },
    },
  },
  data() {
    return {
      checkAll: false,
      isIndeterminate: true,
      checkList: [],
    };
  },
  computed: {
    getValue() {
      return this.value;
    },
  },
  watch: {
    value:{
      immediate: true,
      handler: function (value) {
        this.checkList = value ? value.split(",") : [];
      },
    },
  },
  methods: {
    handleCheckAllChange(val) {
      this.checkList = !val ? [] : this.options.map((item) => item.value);
      this.isIndeterminate = false;
      this.emitValue();
    },

    handleCheckedChange() {
      let checkedCount = this.checkList.length;
      this.checkAll = checkedCount === this.options.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.options.length;
      this.emitValue();
    },
    emitValue() {
      let value = this.checkList.join(",");
      this.$emit("change", value);
    },
  },
};
</script>


<style lang="scss" scoped>
.w-check-form {
  display: flex;
  .checkbox-group {
    margin-left: 20px;
  }
}
</style>
