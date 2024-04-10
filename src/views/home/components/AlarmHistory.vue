<template>
  <div class="alarm-history">
    <titleCom
      title-name="历史报警分布"
      :title-bg="require('@/assets/images/ic_home_historyAlarm.png')"
    />
    <div class="alarm-history_choose">
      <el-radio-group
        v-model="alarmDate"
        style="margin-top: 6px"
        @change="dateChange"
      >
        <el-radio :label="'week'">
          按周
        </el-radio>
        <el-radio :label="'month'">
          按月
        </el-radio>
        <el-radio :label="'daterange'">
          起始时间
        </el-radio>
      </el-radio-group>
      <el-date-picker
        v-model="daterange"
        type="daterange"
        size="mini"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd HH:mm:ss"
        :disabled="alarmDate !== 'daterange'"
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        style="width: 190px"
        @change="daterangeChange"
      />
    </div>
    <div
      id="historyCount"
      class="alarm-history_content"
    >
      <Chart
        id="history"
        ref="history"
        parent-id="historyCount"
        width="90%"
        height="100%"
        :option="vehicleOption"
        :nodata="!vehicleOption"
      />
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import titleCom from "./title.vue";
import Chart from "@/components/Chart/index.vue";
import { barOption } from "../components/chartConfig";
export default {
  name: "AlarmHistory",
  components: {
    titleCom,
    Chart,
  },

  props: {
    options: {
      type: Object,
      default: () => {
        return null;
      },
    },
  },

  data() {
    return {
      countOption: null,
      params: {
        beginTime: `${dayjs()
          .subtract(0, "day")
          .format("YYYY-MM-DD")} 00:00:00`,
        endTime: `${dayjs().format("YYYY-MM-DD HH:mm:ss")}`,
      },
      alarmDate: "daterange",
      daterange: [
        dayjs().subtract(0, "day").format("YYYY-MM-DD HH:mm:ss"),
        dayjs().format("YYYY-MM-DD HH:mm:ss"),
      ],
      vehicleOption: {},
    };
  },

  computed: {
    getDefectList() {
      return this.$store.state.home.defectVoList;
    },
  },

  watch: {
    options: {
      deep: true,
      handler(val) {
        this.countOption = { ...val };
      },
    },
    getDefectList: {
      handler(data) {
        this.vehicleOption = barOption(data);
      },
      deep: true,
    },
  },

  created() {
    this.getList();
  },

  methods: {
    dateChange(val) {
      if (val !== "daterange") {
        this.daterange = [
          dayjs().subtract(1, val).format("YYYY-MM-DD"),
          dayjs().format("YYYY-MM-DD"),
        ];
      } else {
        this.daterange = [
          dayjs().subtract(0, "day").format("YYYY-MM-DD HH:mm:ss"),
          dayjs().format("YYYY-MM-DD HH:mm:ss"),
        ]
      }
      this.daterangeChange();
    },

    daterangeChange() {
      console.log(this.daterange);
      let time1 = dayjs(this.daterange[0]).format("YYYY-MM-DD");
      let time2 = dayjs(this.daterange[1]).format("YYYY-MM-DD");

      this.params.beginTime = time1 + " 00:00:00";
      this.params.endTime = time2 + " 23:59:59";
      // console.log(this.params)
      this.getList()
    },

    getList() {
      this.$store.dispatch("home/defectPolling", this.params);
    },
  },
};
</script>

<style
  scoped
  lang='scss'
>
.alarm-history {
  position: relative;
  color: #fff;

  &_choose {
    position: absolute;
    right: 0px;
    top: 12px;
  }

  ::v-deep {
    .el-radio__input.is-checked .el-radio__inner {
      border-color: #1cdafc;
      background: #1cdafc;
    }

    .el-radio__input.is-checked+.el-radio__label {
      color: #fff;
    }

    .el-radio__inner {
      border-color: #1cdafc;
    }

    .el-radio {
      margin-right: 12px;
    }

    .el-radio__label {
      padding-left: 6px;
    }
  }

  &_content {
    width: 664px;
    height: 304px;
    padding-top: 12px;
    background: #001344;
    margin-top: 10px;
  }
}

::v-deep .el-date-editor .el-range__close-icon {
  width: 18px;
}
</style>
