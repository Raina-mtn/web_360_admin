<!--
 * @Date: 2022-07-26 14:21:30
 * @LastEditors: wangwanzhen wangwanzhen@shenhaoinfo.com
 * @LastEditTime: 2024-03-25 17:10:09
 * @FilePath: \web_360_admin\src\views\resultAudit\audit-dialog\index.vue
-->
<template>
  <el-dialog
    :visible="visible"
    :title="actionType[actionTypeValue].label"
    width="50%"
    :append-to-body="true"
    lock-scroll
    @opened="dialogOpen"
    @close="close"
  >
    <div class="container">
      <div v-if="visible" ref="container-draw" class="container-draw">
        <div
          ref="move1"
          :style="{
            transform: `translate(${dragZoom.translateX}px, ${dragZoom.translateY}px) scale(${dragZoom.scale})`,
          }"
          class="zoom"
          :data-freezed="isDrawing.toString()"
        >
          <div
            class="sign-div"
            :style="{
              width: `${originData.partPixelX}px`,
              height: `${originData.partPixelY}px`,
            }"
          >
            <div class="canvas-area">
              <canvas
                id="canvasBoard"
                class="canvasBoard"
                :width="`${originData.partPixelX}px`"
                :height="`${originData.partPixelY}px`"
                style="
                  position: absolute;
                  z-index: 999;
                  top: 0;
                  left: 0;
                  background-color: transparent;
                "
              />
            </div>
            <LazyImg
              class
              :height="originData.partPixelY"
              :width="originData.partPixelX"
              :src="originData.partPatrolGraphUrl"
              :window-position="[0, 950]"
              :start-position="0"
            />
          </div>
        </div>
      </div>
      <div class="container-form">
        <el-form :form-data="formData" size="mini" label-width="55px">
          <el-row v-show="canEdit">
            <el-col :span="6">
              <el-form-item label="width">
                <el-input-number
                  v-model="formData.width"
                  @change="(e) => setRect({ width: e })"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="height">
                <el-input-number
                  v-model="formData.height"
                  @change="(e) => setRect({ height: e })"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="top">
                <el-input-number
                  v-model="formData.top"
                  @change="(e) => setRect({ top: e })"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="left">
                <el-input-number
                  v-model="formData.left"
                  @change="(e) => setRect({ left: e })"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="canEdit">
            <el-col :span="6">
              <el-form-item label="部件">
                <el-select
                  v-model="formData.partsId"
                  placeholder="请选择部件"
                  clearable
                  @change="changeParts"
                >
                  <el-option
                    v-for="item in partsList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="检测项">
                <el-select
                  v-model="formData.itemId"
                  placeholder="请选择检测项"
                  clearable
                  :disabled="!formData.partsId"
                >
                  <el-option
                    v-for="item in itemList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="故障描述" label-width="70px">
                <el-select
                  v-model="formData.errorId"
                  placeholder="请选择故障描述"
                  clearable
                >
                  <el-option
                    v-for="item in errorList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item>
                <el-button @click="submit">
                  提交
                </el-button>
              </el-form-item>
            </el-col>
          </el-row>

          <!-- 等级修改 -->
          <el-row v-if="!canEdit">
            <el-col :span="7">
              <el-form-item label="风险等级" label-width="70px">
                <el-select
                  v-model="formData.grade"
                  placeholder="请选择风险等级"
                  clearable
                >
                  <el-option
                    v-for="item in riskLevel"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item>
                <el-button @click="submit">
                  提交
                </el-button>
              </el-form-item>
            </el-col>
          </el-row>

        </el-form>
      </div>
    </div>
  </el-dialog>
</template>
<script>
/* eslint-disable */
import { fabric } from "fabric";
import LazyImg from "@/components/LazyImg.vue";
import DragZoom from "@/utils/dragZoom.js";
import { debounce } from "lodash-es";
import { createdefect, apiPartsList, apiPartsItemList, apiErrorList, apiUpdateRisk,apiUpdateDefectRisk } from "@/api/interface/index";
import {actionType} from '../config.js'
import { riskLevel } from "@/utils/config";

const originFormData = JSON.stringify({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    partsId: null,
    itemId: null,
    errorId:null,//故障描述
    grade:""//风险等级
})
export default {
  components: {
    LazyImg,
  },
  data() {
    return {
      visible: false,
      onResolve: null,
      onReject: null,
      formData: JSON.parse(originFormData),
      originData: {
        id: null,
        partPatrolGraphUrl: null,
        partPixelX: null,
        partPixelY: null,
      },
      canvas: null,
      isDrawing: true,
      partsList: [],
      itemList: [],
      errorList: [],//故障描述list
      dragZoom: new DragZoom(),
      actionTypeValue:'add'//弹窗类型
    };
  },
  computed:{
    actionType(){
      return actionType
    },
    riskLevel(){
      return riskLevel
    },
    // 是否是修改状态
    canEdit(){
      return this.actionTypeValue !== 'level'
    }
  },
  mounted() {
    apiPartsList({}).then((res) => {
      this.partsList = res.data;
    });
    
    apiErrorList({}).then((res) => {
      this.errorList = res?.data ?? [];
    });

    // this.setPosition();
  },
  watch: {
    // ["formData.partsId"]: {
    //   handler(val) {
    //     console.log('partsId>>>', val)
    //     if (!val) return;
    //     this.getItemList(val);
    //   },
    // },
  },
  methods: {
    open(data,type) {
      this.actionTypeValue = type
      return new Promise((resolve, reject) => {
        // eslint-disable-next-line no-unused-vars
        console.log("data>>", data);
        let { width, height, pointX, pointY, itemId, partsId, grade } = data;
        this.formData.width = width;
        this.formData.height = height;
        this.formData.left = pointX;
        this.formData.top = pointY;
        this.formData.grade = grade;
        // this.formData.itemId = itemId;
        // this.formData.partsId = partsId;
        this.visible = true;
        this.originData = data;
        this.onResolve = resolve;
        this.onReject = reject;
        this.$nextTick(() => {
          this.dragZoom.setOptions([this.$refs["move1"]]);
          this.setPosition();
        });
      });
    },

    setPosition() {
      // 计算scale;
      const { partPixelX: innerWidth, partPixelY: innerHeight } =
        this.originData;
      const { offsetHeight: outerHeight, offsetWidth: outerWidth } =
        this.$refs["container-draw"];
      let scale = 1;
      if (outerHeight / outerWidth > 1) {
        scale = outerWidth / innerWidth;
      } else {
        scale = outerHeight / innerHeight;
      }
      this.dragZoom.scale = scale;
      this.dragZoom.minScale = scale;

      // 计算部件中心
      let { width, height, pointX, pointY } = this.originData;
      let picCenterX = outerWidth / 2;
      let picCenterY = outerHeight / 2;

      let partCenterX = (pointX + width / 2) * scale;
      let partCenterY = (pointY + height / 2) * scale;

      let translateX = picCenterX - partCenterX;
      let translateY = picCenterY - partCenterY;
      this.dragZoom.translateX = translateX;
      this.dragZoom.translateY = translateY;
    },

    async dialogOpen() {
      this.initFabric();
      this.add();
    },
    close() {
      this.visible = false;
      this.onResolve = null;
      this.onReject = null;
    },
    // sizeChange(e) {
    //   const { scale, translateX, translateY } = e;
    //   this.dragZoom.scale = scale;
    //   this.dragZoom.minScale = scale;
    //   this.dragZoom.translateX = translateX;
    //   this.dragZoom.translateY = translateY;
    // },

    initFabric() {
      this.canvas = this.__canvas = new fabric.Canvas("canvasBoard");
      // create a rect object
      let deleteIcon =
        "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";

      let img = document.createElement("img");
      img.src = deleteIcon;

      fabric.Object.prototype.transparentCorners = false;
      fabric.Object.prototype.cornerColor = "blue";
      fabric.Object.prototype.cornerStyle = "circle";

      fabric.Object.prototype.controls.deleteControl = new fabric.Control({
        x: 0.5,
        y: -0.5,
        offsetY: 16,
        cursorStyle: "pointer",
        mouseUpHandler: this.deleteObject,
        render: renderIcon,
        cornerSize: 0,
      });

      function renderIcon(ctx, left, top, styleOverride, fabricObject) {
        var size = this.cornerSize;
        ctx.save();
        ctx.translate(left, top);
        ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
        ctx.drawImage(img, -size / 2, -size / 2, size, size);
        ctx.restore();
      }
    },

    add() {
      const { width = 81, height = 98, left = 114, top = 122 } = this.formData;
      const rect = new fabric.Rect({
        left,
        top,
        fill: "transparent",
        width,
        height,
        objectCaching: false,
        stroke: "red",
        strokeWidth: 6,
        strokeUniform: true,
        lockRotation: true,
        selectable:this.canEdit, // 设置为 false 禁止选择和编辑
        hasControls:this.canEdit,
        lockMovementX: !this.canEdit, // 禁止水平方向拖拽
        lockMovementY: !this.canEdit, // 禁止垂直方向拖拽
        onDeselect: (e) => {
          // this.rect = null
          this.setDrawState();
        },
      });
      console.log(rect,'rect')
      rect.on("selected", (e) => {
        this.isDrawing = true;
        this.rect = e.target;
        this.setFormData();
      });

      rect.on("moving", (e) => {
        this.setFormData();
      });

      rect.on("scaling", (e) => {
        this.setFormData();
      });

      this.canvas.add(rect);
      this.canvas.setActiveObject(rect);
    },

    deleteObject(eventData, transform) {
      var target = transform.target;
      var canvas = target.canvas;
      canvas.remove(target);
      canvas.requestRenderAll();
    },

    setFormData() {
      const { scaleX, scaleY, top, left, width, height } = this.rect;
      this.formData.width = parseInt(width * scaleX);
      this.formData.height = parseInt(height * scaleY);
      this.formData.top = parseInt(top);
      this.formData.left = parseInt(left);
    },
    setRect(e) {
      if (!this.rect) {
        return;
      }
      const { scaleX, scaleY, top, left, width, height } = this.rect;
      console.log(e, this.rect.width * scaleX);
      for (const [k, value] of Object.entries(e)) {
        switch (k) {
          case "width":
            if (value && parseInt(width * scaleX) !== value) {
              this.rect.set("width", parseInt(value / scaleX));
            }
            break;
          case "height":
            if (value && parseInt(height * scaleY) !== value) {
              this.rect.set("height", parseInt(value / scaleY));
            }
            break;
          case "top":
            this.rect.set("top", value, top);
            if (value && parseInt(top) !== value) {
              console.log("top", value);
              this.rect.set("top", value);
            }
            break;
          case "left":
            if (value && parseInt(left) !== value) {
              console.log("left", value);
              this.rect.set("left", value);
            }
            break;
          default:
            break;
        }
      }

      this.rect.setCoords();
      this.canvas.requestRenderAll();
    },
    setDrawState: debounce(function () {
      this.isDrawing = false;
    }, 500),
    async submit() {
      // 修改等级
      if(!this.canEdit) {
        this.updateRisk()
        return 
      }

      const { id } = this.originData;
      const {
        top: pointY,
        left: pointX,
        width,
        height,
        itemId,
        partsId,
        errorId,
      } = this.formData;
      let msg = ''
      if(!errorId){
        msg = '请选择故障描述'
      }
      if(!itemId){
        msg = '请选择检测项'
      }
      if(!partsId){
        msg = '请选择部件'
      }
      if(msg){
        this.$message({
           message: msg,
           type: 'error'
         });
        return 
      }
      const res = await createdefect({
        pointY,
        pointX,
        width: width.toString(),
        height: height.toString(),
        id,
        itemId,
        partsId,
        errorId,
        action:actionType[this.actionTypeValue].value //"1新增2误报学习"
      });
      this.formData = JSON.parse(originFormData);
      this.onResolve(res);
      this.close();
    },

    // 修改等级
    async updateRisk(){
      const { id } = this.originData;
      const {
        grade
      } = this.formData;
      const params = {
        id,
        grade
      }
      await apiUpdateDefectRisk(params)
      this.onResolve(params);
      this.close();
    },

    // 部件改变获取检测项
    changeParts(val){
      // 清空已选择的检测项
      this.formData.itemId = ""
      if(val){
        apiPartsItemList({partsId:this.formData.partsId}).then((res) => {
          this.itemList = res?.data ?? [];
        });
      }
    }

    // getItemList: debounce(function (partsId) {
    //   this.itemList = [];
    //   queryItem({partsId}).then((res) => {
    //     this.itemList = res?.data ?? [];
    //   });
    // }, 500),

    // partsIdChange(e){
    //   this.formData.itemId = null;
    // }
  },
};
</script>

<style lang="scss" scoped>
::v-deep {
  .el-dialog {
    height: unset;
  }
  .el-input-number {
    width: 100%;
  }
}
.container {
  display: flex;
  flex-direction: column;
  .container-draw {
    height: 600px;
    width: 100%;
    overflow: hidden;
    .zoom {
      width: fit-content;
      .sign-div {
        position: relative;
        .canvas-area {
          position: absolute;
          z-index: 999;
          top: 0;
          left: 0;
        }
      }
    }
  }

  .container-form {
    height: 100px;
    padding: 10px 0;
  }
}
</style>
