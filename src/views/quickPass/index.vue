<template>
  <div v-loading="isLoading" class="wrapper">
    <div class="wrapper_top">
      <div class="description">
        <div class="description-item">
          <div class="label-item">
            <div class="title">
              巡检任务:
            </div>
            <el-select
              v-model="id"
              size="mini"
              placeholder="请选择任务"
              style="margin-right: 20px"
              @change="changeTaskId"
            >
              <el-option
                v-for="(item, index) in taskList"
                :key="index"
                :label="item.title"
                :value="item.id"
              />
            </el-select>
          </div>
          <div class="label-item">
            <div class="title">
              车辆号:
            </div>
            {{ taskInfo.patrolInfo.plateNumber }}
          </div>
          <!-- <div class="label-item">
            <div class="title">
              检测时间:
            </div>
            {{ taskInfo.patrolInfo.createTime }}
          </div> -->
          <div class="label-item">
            <div class="title">
              最低时速:
            </div>
            {{ taskInfo.baseInfo.lowSpeed }}
          </div>
          <div class="label-item">
            <div class="title">
              最高时速:
            </div>
            {{ taskInfo.baseInfo.highSpeed }}
          </div>
          <div class="label-item">
            <div class="title">
              端位号:
            </div>
            {{ taskInfo.patrolInfo.direction }}
          </div>
        </div>
        <div class="description-item">
          <div class="label-item play_ctr">
            <div class="title">
              播放设置:
            </div>
            <el-button
              :class="[setting.timer ? 'btn_pause' : 'btn_play']"
              style="margin-right: 20px"
              round
              @click="startInterval"
            />
            <span class="title">倍速:</span>
            <el-slider
              v-model="setting.speed"
              class="slider"
              :min="1"
              :max="10"
            />
          </div>
        </div>
        <div v-loading="positionLoading" class="description-item">
          <div class="label-item detect-area">
            <div class="title">
              检测位置:
            </div>
            <div
              v-for="(item, key) in trainArea"
              :key="key"
              :class="['area-radio', place == key ? 'area-radio__active' : '']"
              @click="changeArea(key)"
            >
              <div class="area-circle" />
              <span> {{ checkPositionObj[key] }}</span>
            </div>
          </div>
        </div>
      </div>
      <div v-loading="positionLoading" class="wrapper_top-item">
        <div
          class="position—area"
          :style="{ height: '100px' }"
          @click="settings.collapsed = true"
        >
          <div
            v-for="(areaPlace, index) in trainArea"
            v-show="place == index"
            :key="index"
            class="position_item"
          >
            <div class="title">
              {{ checkPositionObj[index] }}
            </div>
            <div class="body">
              <BackGround
                :position="index"
                :carriages="taskInfo.patrolInfo.carriages"
              />
              <Position
                v-for="(camera, key) in areaPlace"
                :key="key"
                :position="camera"
                :show-mark="false"
                @change="({ position, uid }) => choose({ position, uid })"
              >
                <Slider
                  v-if="camera == activePosition"
                  :out-translate-x="scrollData.translateX"
                  :content-width="cpuDetect.pixelX"
                  :scale="scrollData.scale"
                  @sliderChange="sliderChange"
                />
              </Position>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-loading="positionLoading" class="wrapper_header">
      <div class="btns">
        <!-- <el-button
          :class="['enlarge_btn', settings.zoom ? 'enlarge_btn_active' : '']"
          @click="enlarge"
        /> -->
        <!-- <el-button
          class="markFault_btn"
          @click="settings.markEdit = !settings.markEdit"
        >
          标记故障
        </el-button> -->
        <!-- <el-button v-if="edit" type="success" @click="mark('MISTAKEN')">
          误报矫正
        </el-button> -->
        <!-- <el-button
          v-if="settings.markEdit"
          type="waring"
          @click="createMark('MISSING')"
        >
          漏报标记
        </el-button> -->
      </div>
    </div>
    <div v-loading="isLoading" class="wrapper_bottom">
      <div style="width: 100%; height: 600px">
        <ZoomContainer
          ref="zoomRef"
          :out-translate-x="scrollData.translateX"
          @ZoomSizeChange="ZoomSizeChange"
        >
          <template slot="zoom-1">
            <div
              :style="{
                width: `${cpuDetect.pixelX}px`,
                height: `${cpuDetect.pixelY}px`,
                pointerEvents: 'none',
                overflow: 'hidden'
              }"
            >
              <LazyImg
                v-for="(item, index) in cpuDetect.procPatrolRecordList"
                :key="item.id"
                style="float: left;"
                :index="index"
                :width="item.pixelX || 950"
                :height="item.pixelY || 2696"
                :is-load.sync="item.load"
                :src="item.originGraphUrl"
              />
            </div>
          </template>
          <template slot="zoom-2">
            <div
              :style="{
                width: `${cpuDetect.pixelX}px`,
                height: `${cpuDetect.pixelY}px`,
                pointerEvents: 'none',
                overflow: 'hidden'
              }"
            >
              <LazyImg
                v-for="(item, index) in cpuDetect.procPatrolRecordList"
                :key="item.id"
                style="float: left;"
                :index="index"
                :width="item.pixelX || 950"
                :height="item.pixelY || 2696"
                :is-load.sync="item.load"
                :src="item.patrolGraphUrl"
              />
            </div>
          </template>
        </ZoomContainer>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getTaskInfo,
  getByTaskId,
  getPictureList,
  getTaskList,
  updateDefect,
  batchAudit,
  getdefect,
} from "@/api/interface/index";
// import Zoom from "./component/zoom.vue";
// import MarkList from "../resultAudit/component/MarkList";
import BackGround from "../resultAudit/component/background.vue";
// import DetailImg from "../resultAudit/component/DetailImg";
// import Slider from "../resultAudit/component/silder.vue";
import { commonMixin } from "../resultAudit/component/commonMixin.js";
import { isEmpty, debounce } from "lodash-es";
import ZoomContainer from "./component/ZoomContainer";
import Position from "../resultAudit/component/Position.vue";
import { defectStatus, imgPositionObj, checkPositionObj } from "@/utils/config";
import Slider from "./component/silder";
import LazyImg from "./component/LazyImg";

export default {
  provide() {
    return {
      getTaskInfo: () => this.taskInfo,
      getActiveUid: () => this.activeUid,
      getActivePosition: () => this.activePosition,
      getDetectData: () => this.detectData,
    };
  },
  components: {
    Slider,
    // MarkList,
    BackGround,
    ZoomContainer,
    Position,
    LazyImg,
  },
  mixins: [commonMixin],
  props: {
    taskId: {
      type: String,
      default: "",
    },
    position: {
      type: String,
      default: "",
    },
    patrolRecordId: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      taskInfo: {
        baseInfo: {},
        patrolInfo: {},
        positionList: [],
      },
      activePosition: null,
      activeUid: null,
      id: null,
      taskList: [],
      signDivList: [],
      isLoading: false,
      place: "TOP",
      trainArea: {
        TOP: ["TL-2D", "TM-2D", "TR-2D"],
        BOTTOM: ["BL-2D", "BM1-2D", "BM2-2D", "BR-2D"],
        LEFT: ["UL-2D", "ML-2D", "LL-2D"],
        RIGHT: ["UR-2D", "MR-2D", "LR-2D"],
      },
      defectStatus,
      auditStatus: "",
      isDrawing: false,
      imgPositionObj,
      positionLoading: false,
      defectId: undefined,
      checkPositionObj,
      detectData: [],
      scrollData: {
        scale: 0,
        translateX: 0,
        windowWidth: null,
      },
      setting: {
        timer: null,
        move: 100,
        speed: 1,
      }
    };
  },
  computed: {
    cpuDetect() {
      let item = {};
      let list = this.detectData;
      if (list && list.length > 0) {
        let curItem = list.find(
          (detectItem) => detectItem.position == this.activePosition
        );
        if (curItem) {
          item = curItem;
        }
      }
      return item;
    },
    btnDisabled() {
      return (
        !this.signDivList.length ||
        (!isEmpty(this.signDivList[0].status) &&
          this.signDivList[0].status != "EMPTY")
      );
    },
    curPosition() {
      let item = this.detectData.find(
        (item) => item.position == this.activePosition
      );
      return item ?? { defectMarkList: [] };
    },
    cpuWindow(){
      return this.scrollData
    }
  },
  watch: {
    activeUid: {
      handler(val) {
        if (!val) {
          return;
        }
        this.$nextTick(() => {
          this.scrollCur("mtable", "row-waring");
        });
      },

    },
    cpuDetect: {
      handler(val) {
        this.$refs.zoomRef.setPosition(val.pixelY);
      },
    },
    cpuWindow: {
      immediate: true,
      deep: true,
      handler(val){
        this.setLoad()
      }
    }
  },
  created() {
    this.settings.detailImgHeight = 560;
  },
  mounted() {
    this.scrollData.windowWidth = this.$refs.zoomRef.$el.offsetWidth;

    const { taskId } = this.$route.query;
    if (taskId) {
      this.id = taskId;
    }

    this.getTaskList();
    // this.intervalGetList();
  },
  methods: {
    startInterval(){
      if(this.setting.timer){
        clearInterval(this.setting.timer)
        this.setting.timer = null
        return;
      }
      this.setting.timer = setInterval(()=> {
        let contentWidth = this.cpuDetect.pixelX * this.scrollData.scale;
        let intervalDistance = this.setting.move * this.setting.speed
        const scrollContent = contentWidth - this.scrollData.windowWidth;
        if(scrollContent - Math.abs(this.scrollData.translateX) < intervalDistance){
          this.scrollData.translateX = - scrollContent
          clearInterval(this.setting.timer)
          this.setting.timer = null;
          return;
        }
        this.scrollData.translateX = this.scrollData.translateX - intervalDistance;
      }, 1000)
    },
    setLoad:debounce( async function () {
      let start = Math.abs(this.scrollData.translateX);
      let end = start + this.scrollData.windowWidth;
      this.cpuDetect.procPatrolRecordList.map((item,index) => {
        let pixelX = (item.pixelX || 950) * this.scrollData.scale;
        if(index *pixelX >= start &&  (index - (this.setting.speed * 2)) * pixelX <= end  ){
          if(item.load){
            return;
          }
          item.load = true;
        }
      })
    }, 500),
    // 轮刷新数据
    intervalGetList() {
      let timer = setInterval(() => {
        this.refresh();
      }, 15000);
      this.$once("hook:beforeDestroy", () => {
        clearInterval(timer);
      });
    },

    refresh() {
      if (!this.id || !this.activePosition) return;
      let params = {
        taskId: this.id,
        position: this.activePosition,
      };
      if (this.defectId) {
        params["defectId"] = this.defectId;
      }
      return this.updatePositionData(params);
    },

    // -- new start--- //
    // 获取任务列表
    async getTaskList() {
      let { list } = (await getTaskList({ pageSize: 10000, pageIndex: 1 }))
        .data;
      this.taskList = list;
      if (list.length) {
        const { taskId = null } = this.$route.query;
        if (taskId) {
          this.id = taskId;
        } else {
          this.id = this.taskList[0].id;
        }
        this.getTaskInfo(this.id);
      }
    },

    // 获取任务信息
    async getTaskInfo(id) {
      try {
        this.isLoading = true;

        // 重置
        this.taskInfo = {
          baseInfo: {},
          patrolInfo: {},
        };
        await this.$nextTick();

        try {
          // 请求数据
          let [patrolInfo, baseInfo] = await Promise.all([
            getTaskInfo({ id }),
            getByTaskId({ taskId: id }),
          ]);
          this.taskInfo.patrolInfo = patrolInfo.data;
          this.taskInfo.baseInfo = baseInfo.data;
        } catch (error) {
          console.log("get error", error);
        }

        await this.getAllCamears({ taskId: id });
        // eslint-disable-next-line no-empty
      } catch (error) {
      } finally {
        this.isLoading = false;
      }
    },

    // 获取相机位置信息
    async getAllCamears({ taskId }) {
      try {
        this.positionLoading = true;

        this.detectData = [];
        this.signDivList = [];
        this.activeUid = null;
        let { scrollOptions } = this.settings;
        scrollOptions.scrollTop = 0;
        scrollOptions.scrollRate = 0;

        const { data } = await getPictureList({ taskId, page: 1 });
        if (!data?.length) {
          return this.$message.warning("此任务下无巡检数据");
        }
        this.detectData = data.map((item) => {
          if (item?.defectMarkList) {
            item?.defectMarkList.map((markItem) => {
              markItem["uid"] = markItem.id;
            });
          }

          if (item?.procPatrolRecordList) {
            item?.procPatrolRecordList.map((pic) => {
              pic["load"] = false;
            });
          }
          return item;
        });
        console.log("this.detectData>>>", this.detectData);
        const { patrolRecordId = null, position = null } = this.$route.query;
        this.choose({ position, uid: patrolRecordId });
      } finally {
        this.positionLoading = false;
      }
    },

    // 选择默认
    // @eslint-ignore
    async choose({ place, position, uid }) {
      this.activeUid = null;
      this.place = null;
      this.position = null;
      this.signDivList = [];
      await this.$nextTick();

      let newPlace = "";
      let newPosition = "";
      let newActiveUid = "";

      if (place) {
        newPlace = place;
        newPosition = this.trainArea[place][0];
      }

      if (position) {
        for (const [k, v] of Object.entries(this.trainArea)) {
          if (v.includes(position)) {
            newPlace = k;
            break;
          }
        }
        newPosition = position;
      }

      const checkPlace = (item) => {
        if (!place) {
          return true;
        } else {
          return this.trainArea[place].includes(item.position);
        }
      };

      const checkPosition = (item) => {
        if (!position) {
          return true;
        } else {
          return item.position == position;
        }
      };

      let filterRange = this.detectData.filter((item) => {
        return checkPlace(item) && checkPosition(item);
      });

      let activeItem = null;
      for (const item of filterRange) {
        if (!uid) {
          if (item?.defectMarkList?.length) {
            activeItem = item?.defectMarkList[0];
            break;
          }
        } else {
          if (item?.defectMarkList?.length) {
            activeItem = item?.defectMarkList.find((item) => item.uid == uid);
            break;
          }
        }
      }

      if (activeItem) {
        newActiveUid = activeItem.uid;
        newPosition = activeItem.position;
        for (const [k, v] of Object.entries(this.trainArea)) {
          if (v.includes(activeItem.position)) {
            newPlace = k;
            break;
          }
        }
        this.signDivList = [activeItem];
      }

      this.place = newPlace;
      this.activePosition = newPosition;
      this.activeUid = newActiveUid;
    },

    // 更新相机数据
    async updatePositionData({ taskId, position, defectId }) {
      const {
        data: [item = null],
      } = await getPictureList({ taskId, position, defectId, page: 1 });
      if (item) {
        item?.defectMarkList?.map((markItem) => {
          markItem["uid"] = markItem.id;
        });

        let index = this.detectData.findIndex(
          (v) => v.position == item.position
        );
        
        this.$set(this.detectData, index, item);
      }
    },

    // 切换任务
    async changeTaskId(id) {
      this.id = id;
      this.getTaskInfo(this.id);
    },

    // 切换车厢位置
    changeArea(area) {
      this.choose({ place: area });
    },

    // 审核
    async auth(status) {
      let { id } = this.signDivList[0];
      await updateDefect({ id, status });
      let item = this.curPosition.defectMarkList.find((item) => item.id == id);
      item.status = status;
      this.$message.success("审核成功");
    },

    // 滚动到指定条
    scrollCur(refName, className) {
      this.$nextTick(() => {
        let vmEl = this.$refs[refName].$el;
        const nodeList = vmEl.querySelectorAll(".el-table__body tr");
        const currentItem = Array.from(nodeList).find((it) =>
          it.className.includes(className)
        );
        const currentTop = currentItem.getBoundingClientRect().top;
        const containerTop = vmEl
          .querySelector(".el-table__body")
          .getBoundingClientRect().top;
        const scrollParent = vmEl.querySelector(".el-table__body-wrapper");
        scrollParent.scrollTop = currentTop - containerTop;
      });
    },

    // 一键审核
    auditAll() {
      if (!this.auditStatus) {
        return this.$message.error("请选择审核类型");
      }

      if (!this.id) {
        return this.$message.error("请选择任务");
      }

      batchAudit({ status: this.auditStatus, taskId: this.id }).then(
        async (res) => {
          this.$message.success("审核成功");
          await this.updatePositionData({
            taskId: this.id,
            position: this.activePosition,
          });

          // 更新当前审核项的id
          const [item = null] = this.signDivList;
          if (item) {
            const uid = item.uid;
            this.signDivList = [];
            this.$nextTick(() => {
              this.choose({ uid });
            });
          }
        }
      );
    },

    // 添加新的标记
    async addNew() {
      let res = await this.$refs.AuditDialog.open(this.signDivList[0]);
      let item = await getdefect({ id: res.data });
      item.data["uid"] = item.data.id;
      this.curPosition.defectMarkList.push(item.data);
      await this.$nextTick();
      this.choose({ uid: item.data.id });
    },

    // id筛选
    idFilter() {
      this.signDivList = [];
      this.activeUid = null;
      this.refresh();
    },

    ZoomSizeChange(e) {
      const { scale, translateX } = e;
      if (scale) {
        this.scrollData.scale = scale;
      }
      if (translateX) {
        this.scrollData.translateX = translateX;
      }
    },

    sliderChange(e) {
      const { translateX } = e;
      this.scrollData.translateX = translateX;
    },
  },
};
</script>
<style lang="scss" scoped>
.wrapper {
  padding: 20px 20px 0 20px;
  width: 100%;
  height: 100%;

  .wrapper_top {
    display: flex;
    flex-direction: column;

    .wrapper_top-item {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      color: #fff;
      flex-direction: column;

      .title {
        color: #fff;
        margin-right: 20px;
      }

      .position—area {
        display: flex;
        flex-direction: column;
        width: 100%;
        transition: ease-in-out 300ms;
        height: 100px;

        .position_item {
          height: 100%;
          width: 100%;
          border: 1px solid #fff;
          font-size: 12px;
          color: #fff;
          display: grid;
          grid-template-columns: 50px auto;

          .title {
            width: 50px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin: 0;
          }

          .body {
            width: 100%;
            position: relative;
            display: flex;
            flex-direction: column;
          }

          // 车顶
          .top {
            display: flex;
            flex-direction: column;
            border-radius: 0;
            background-size: 100% 90%;
            background-repeat: no-repeat;
            background-position-y: center;

            &-left,
            &-middle,
            &-right {
              width: 100%;
              height: 33%;
              display: flex;
              justify-content: center;
              align-items: center;
            }

            &-middle {
              border-top: 1px solid #fff;
              border-bottom: 1px solid #fff;
            }
          }

          // 右边
          .right {
            display: flex;
            flex-direction: column;
            background-size: 100% 90%;
            background-repeat: no-repeat;
            background-position-y: center;

            &-top,
            &-middle,
            &-bottom {
              width: 100%;
              height: 33%;
              display: flex;
              justify-content: center;
              align-items: center;
            }

            &-middle {
              border-top: 1px solid #fff;
              border-bottom: 1px solid #fff;
            }
          }

          // 左边
          .left {
            display: flex;
            flex-direction: column;
            background-size: 100% 90%;
            background-repeat: no-repeat;
            background-position-y: center;

            &-top,
            &-middle,
            &-bottom {
              width: 100%;
              height: 33%;
              display: flex;
              justify-content: center;
              align-items: center;
              justify-content: center;
              align-items: center;
            }

            &-middle {
              border-top: 1px solid #fff;
              border-bottom: 1px solid #fff;
            }
          }

          // 左边
          .bottom {
            display: flex;
            flex-direction: column;
            background-size: 100% 90%;
            background-repeat: no-repeat;
            background-position-y: center;

            &-left,
            &-middle,
            &-right {
              width: 100%;
              height: 33%;
              display: flex;
              justify-content: center;
              align-items: center;
            }

            &-middle {
              display: flex;

              &-1,
              &-2 {
                width: 50%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                border-top: 1px solid #fff;
                border-bottom: 1px solid #fff;
              }

              &-1 {
                border-right: 1px solid #fff;
              }
            }
          }
        }
      }

      .collapse {
        width: 100%;
        display: flex;
        justify-content: center;
        font-size: 20px;
      }
    }

    .description {
      width: 100%;
      display: flex;
      flex-direction: column;

      &-item {
        display: flex;
        justify-content: flex-start;
        height: 30px;
        margin-bottom: 15px;

        .label-item {
          display: flex;
          width: fit-content;
          align-items: center;
          color: #fff;
          font-size: 14px;
          margin-right: 51px;
          line-height: 30px;
          height: 100%;

          .title {
            white-space: nowrap;
            margin-right: 12px;
          }
        }

        .play_ctr {
          display: flex;

          .slider {
            width: 300px;
            margin-left: 10px;
          }

          .btn_play {
            background: url("~@/assets/images/btn_test_play.png") no-repeat
              center center;
            border: none;
          }

          .btn_pause {
            background: url("~@/assets/images/btn_test_suspend.png") no-repeat
              center center;
            border: none;
          }
        }

        .detect-area {
          .area-radio {
            display: flex;
            align-items: center;
            margin-right: 25px;

            .area-circle {
              height: 16px;
              width: 16px;
              border-radius: 8px;
              background-color: #fff;
              border: 1px solid #0091ff;
              margin-right: 10px;
            }

            &__active {
              .area-circle {
                border-width: 4px;
              }
            }
          }
        }
      }
    }
  }

  .wrapper_center {
    height: 50px;
    margin: 10px 0;

    i {
      font-size: 50px;
      color: #fff;
    }

    #position_img {
      width: 100%;
      height: 50px !important;
    }

    #currentPosition {
      height: 50px;
      background: #ee6666;
      opacity: 0.4;
      position: relative;
      top: -55px;
      pointer-events: none;
    }
  }

  .wrapper_header {
    width: 100%;
    display: flex;
    justify-content: flex-end;

    .play_ctr {
      display: flex;

      .title {
        width: 50px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        color: #fff;
      }

      .slider {
        width: 300px;
        margin-left: 10px;
      }

      .btn_play {
        background: url("~@/assets/images/btn_test_play.png") no-repeat center
          center;
        border: none;
      }

      .btn_pause {
        background: url("~@/assets/images/btn_test_suspend.png") no-repeat
          center center;
        border: none;
      }
    }

    .btns {
      float: right;

      .enlarge_btn {
        height: 35px;
        background: url("~@/assets/images/btn_enlarge_close.png") no-repeat
          center;
        background-size: contain;
        border: none;
      }

      .enlarge_btn_active {
        background: url("~@/assets/images/btn_enlarge_open.png") no-repeat
          center;
        background-size: contain;
      }

      .markFault_btn {
        width: 120px;
        height: 40px;
        background: url("~@/assets/images/btn_markFault.png") no-repeat center;
        background-size: contain;
        border: none;
        padding-left: 50px;
      }
    }
  }

  .wrapper_bottom {
    width: 100%;
    height: 620px;
    display: flex;

    i {
      font-size: 50px;
      color: #fff;
    }

    .falutTitle {
      color: #fff;
    }

    .img {
      width: 60%;
      height: 100%;
      display: flex;
      flex-direction: column;

      .title {
        display: flex;
        width: 100%;
        justify-content: space-around;

        .title-text {
          width: 100px;
          height: 25px;
          display: flex;
          justify-content: center;
          align-items: center;
          background-size: cover;
          color: #fff;
          margin: 7.5px;
        }

        .title-text.left {
          background: url("~@/assets/images/bg_nomarlPic.png") no-repeat;
        }

        .title-text.right {
          background: url("~@/assets/images/bg_Comparison.png") no-repeat;
        }
      }

      .noImg {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
      }

      .comparison—img {
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;

        .btns {
          position: absolute;
          z-index: 999999;
          right: 0;
          bottom: 0;
        }
      }

      .auth_btns {
        width: 100%;
        height: 100px;
      }
    }

    .defectList {
      width: 40%;
      height: 100%;

      .tips {
        width: 100%;
        display: flex;
        align-items: center;

        span {
          color: #fff;
          line-height: 40px;
        }

        .info {
          margin-right: 15px;
        }
      }

      ::v-deep {
        .el-table__row--striped {
          .el-table__cell {
            background: #063570;
          }
        }

        .row-waring {
          .el-table__cell {
            background: #8f3434 !important;
          }
        }
      }

      .table {
        height: calc(100% - 8rem);

        ::v-deep {
          max-height: calc(100% - 6rem);
        }
      }
    }
  }
}
</style>

<style lang="scss">
.auth-popover {
  .popper__arrow {
    display: none;
  }
}
</style>
