<template>
  <el-dialog 
    id="sign_wrapper"
    :before-close="closeDialog"
    :visible.sync="isShow"
    title="故障标记"
    class="sign_wrapper"
    width="80%"
  >
    <div class="title">
      <span>故障对比图:</span>
      <div class="btns">
        <el-button type="success" @click="rectify">
          误报矫正
        </el-button>
        <el-button type="waring" @click="omit">
          漏报标记
        </el-button>
      </div>
    </div>
    <div class="normal">
      <div class="normal_title">
        <img class="normal_backgroud" src="@/assets/images/bg_nomarlPic.png">
        <span>正常图</span>
      </div>
      <div class="normal_img">
        <img :src="srcList.normal" :style="{'left':'-' + normal + 'px','width':pictureInfo.pixelX + 'px'}">
      </div>
    </div>
    <div class="compare">
      <div class="compare_title">
        <img class="compare_backgroud" src="@/assets/images/bg_Comparison.png">
        <span>对比图</span>
      </div>
      <div id="sign_div" class="compare_img">
        <img id="sign_img" :src="srcList.compare" :style="{'left':'-' + normal + 'px','width':pictureInfo.pixelX + 'px'}">
        <div 
          v-for="(item) in signDivList" 
          :key="item.id" 
          class="signdiv" 
          :style="{
            width:item.width,
            height:item.height,
            background:item.type === 'MISTAKEN' ? 'rgba(82, 196, 26, 0.4)' : 'rgba(250, 173, 20, 0.4)',
            left:(item.startPointX - normal) + 'px',
            top:item.startPointY + 'px'
          }"
        >
          <i :id="item.id" class="el-icon-close" @click="removeDiv($event)" />
          <span>{{ item.index }}</span>
        </div>
      </div>
    </div>
    <div v-for="(item,index) in signDivList" :key="index" class="memo">
      <div v-if="item.startPointX > normal && item.startPointX < normal + wrapperWidth">
        备注{{ item.index }}：
        <el-input
          v-model="item.memo"
          type="textarea"
          placeholder="请输入内容"
        />
      </div>
    </div>
    <div slot="footer">
      <el-button class="cancle_btn" @click="closeDialog">
        取消
      </el-button>
      <el-button type="primary" @click="submit">
        确定
      </el-button>
    </div>
  </el-dialog>
</template>
<script>
import {setSignInfo} from "@/api/interface/index"
import { cloneDeep } from 'lodash-es'
export default {
  name:'SignDialog',
  props:{
    id:{
      type:String,
      default:''
    },
    normal:{
      type:Number,
      default:0
    },
    checkPosition:{
      type:String,
      default:''
    },
    srcList:{
      type:Object,
      default:()=>{}
    },
    pictureInfo:{
      type:Object,
      default:()=>{}
    },
  },
  data() {
    return {
      isShow:false,
      faultShow:true,
      memo:'',
      img:{},
      signDiv:{},
      startPos:{},
      curPos:{},
      signDivList:[],
      currentList:[],
      hasMove:false,
      currentClick:{},
      count:0,
      wrapperWidth:0,
    };
  },
  methods: {
    openDialog(signDivList) {
      this.isShow = true;
      this.signDivList = cloneDeep(signDivList)
      this.count = signDivList.length
      this.signDivList.forEach((item,index) => {
        item.index = index+1
      });
      this.$nextTick(()=>{
        this.img = document.getElementById("sign_img")
        document.getElementById('compare_img').parentNode.style.width = this.pictureInfo.pixelX + 'px'
        document.getElementById('normal_img').parentNode.style.width = this.pictureInfo.pixelX + 'px'
        this.wrapperWidth = this.img.parentNode.offsetWidth
      })
    },

    // 关闭
    closeDialog() {
      this.isShow = false;
      this.faultShow = true;
      this.signDivList = []
      this.count = 0
      
      //关闭对话框时移除监听
      this.img.removeEventListener("mousedown",this.sign);

      const list = document.getElementsByClassName('signdiv')
      const length = list.length
      for(let i=0; i<length;i++){
        list[0].remove()
      }
    },

    //误报
    omit(){
      this.faultShow = false;
      this.img.addEventListener("mousedown",this.sign)
    },

    //误报矫正
    rectify(){
      this.faultShow = true
      this.img.addEventListener("mousedown",this.sign)
    },
    
    move(e){
      e.preventDefault(); 
      this.curPos = {};
      this.curPos.x = e.offsetX;
      this.curPos.y = e.offsetY;
      this.signDivList.splice(this.signDivList.length-1,1,{
        startPointX:this.startPos.x, //起点横坐标
        startPointY:this.startPos.y, //起点纵坐标
        width:Math.abs(this.curPos.x -this.startPos.x) + 'px', //宽
        height:Math.abs(this.curPos.y -this.startPos.y) + 'px', //高
        type:this.faultShow ? 'MISTAKEN' : 'MISSING',  //类型
        index:this.count
      })
      this.hasMove = true
    },

    sign(event){
      event.preventDefault(); 
      //获取鼠标开始拖动的起始位置
      this.startPos = {};
      this.startPos.x = event.offsetX;
      this.startPos.y = event.offsetY;

      this.count++

      this.signDivList.push({
        startPointX:this.startPos.x, //起点横坐标
        startPointY:this.startPos.y, //起点纵坐标
        width:'0px', //宽
        height:'0px', //高
        type:this.faultShow ? 'MISTAKEN' : 'MISSING',  //类型
        index:this.count
      })

      // 鼠标按下移动时动态获取鼠标位置
      this.img.addEventListener("mousemove",this.move);

      //鼠标放下时，停止生成画框
      this.img.addEventListener("mouseup",(e)=>{
        if(!this.hasMove){
          this.signDivList.pop()
        }
        this.img.removeEventListener("mousemove",this.move);
        this.hasMove = false;
      },{
        once:true
      });
    },

    removeDiv(e){
      this.count--
      const currentIndex = e.target.getAttribute("id")
      const removeDivIndex = this.signDivList.findIndex((item) => item.id === currentIndex)
      this.signDivList.splice(removeDivIndex,1)
      for(let i = removeDivIndex; i<this.signDivList.length;i++){
        this.signDivList[i].index--
      }
    },
    submit(){
      const params = {
        markList:this.signDivList,
        position:this.checkPosition,
        taskId:this.id
      }
      setSignInfo(params).then(() => {
        this.$emit("refresh");
        this.closeDialog()
      })
    },
  },
}
</script>
<style lang="scss">
.sign_wrapper{
  .title{
    .btns{
      float: right;
    }
  }
  .normal{
      margin: 20px 0;
      .normal_title{
        span{
          color:#fff;
          font-size: 16px;
          position: absolute;
          left: 70px;
        }
      }
      .normal_img{
        overflow: hidden;
        height: 200px;
        img{
          // width: 10000px;
          height: 200px;
          position: relative;
        }
      }
    }
  .compare{
    .compare_title{
      span{
        color:#fff;
        font-size: 16px;
        position: absolute;
        left: 70px;
      }
    }
    .compare_img{
      overflow: hidden;
      height: 200px;
      position: relative;
      img{
        position: relative;
        // width: 10000px;
        height: 200px;
      }
      .signdiv{
        position:absolute;
        z-index : 999;
        pointer-events: none;
        .el-icon-close{
          font-size: 30px;
          float: right;
          color: #fff;
          pointer-events: auto;
        }
        span{
          font-size: 30px;
        }
      }
      .signdiv:hover{
        border: 3px solid #fff;
      }
    }
  }
  .memo{
    margin: 20px;
  }
  .cancle_btn{
    border: 1px white solid !important;
  }
}
</style>
<style lang="scss" scoped>
::v-deep{
  .el-dialog .el-dialog__header .el-dialog__title{
    line-height: 54px !important;
  }
}
</style>