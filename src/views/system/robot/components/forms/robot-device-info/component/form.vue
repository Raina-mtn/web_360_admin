<template>
  <el-form-item
    :prop="`values[${index}].parameters`"
    :rules="{ validator: checkForm, message: '' }"
    class="device-form"
  >
    <div class="form__inner">
      <p class="title">
        {{ name }}
      </p>
      <WForm
        ref="Wform"
        class="body"
        label-width="100px"
        :form-data="formData"
        :columns="formColumns"
        :label-position="'top'"
        :rules="rules"
        size="mini"
      />
    </div>
  </el-form-item>
</template>

<script>
import { WForm } from "@common-ui/w-form";
export default {
  name: "DeviceItem",
  components: {
    WForm,
  },
  model: {
    prop: "parameters",
    event: "change",
  },
  props: {
    index: {
      type:Number,
      default:0
    },
    name: {
      type: String,
      default: ""
    },
    parameters: {
      type: String,
      default: () => {
        return {};
      },
    },
    settings: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      formColumns: [],
      formData: {},
      rules: {}
    };
  },
  watch: {
    settings: {
      immediate: true,
      handler: function (value) {
        if(value && value.length > 0){
          this.formColumns = this.settingToFormItem(value)
          value.map(item => {
            this.rules[item.id] = [
              { required: true, message: `${item.name}不能为空` }
            ]
          })
        }else {
          this.formColumns = []
        }
  
      },
    },
    parameters: {
      immediate: true,
      handler: function (value) {
        this.formData = value? JSON.parse(value): {}
      },
    },
  },

  methods: {
    // 转化setting为内部输入框
    settingToFormItem(settting) {
      let formItemArr = settting.map((item) => {
        const newItem = {
          label: item.name,
          prop: `${item.id}`,
          el: "input",
          required: true,
          clearable: true,
          span: 24 / settting.length,
        };

        if (item.enums && item.enums.length > 0) {
          newItem.el = "select";
          newItem.options = item.enums.map((item) => {
            return {
              value: item,
              label: item,
            };
          });
        }
        return newItem;
      });
      return formItemArr;
    },

    // 检查表单
    checkForm(rule, value, callback) {
      console.log("checkForm");
      this.$refs[`Wform`]
        .validate()
        .then((res) => {
          this.$emit('change', JSON.stringify(this.formData))
          callback();
        })
        .catch((err) => {
          callback(new Error("内容没有填写完整"));
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.device-form {
  .form__inner {
    display: flex;
    flex-direction: column;
    border: 1px solid #ebeef5;
    .title {
      background-color: #eeeeee;
      font-size: 14px;
      padding: 0 10px;
    }
    .body {
       padding: 0 5px;
    }
  }
}
</style>