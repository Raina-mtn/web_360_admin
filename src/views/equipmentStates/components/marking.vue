<template>
  <div class="marking-box">
    <el-popover
      placement="top-start"
      width="250"
      trigger="hover"
      popper-class="popper"
      :visible-arrow="false"
    >
      <el-descriptions :column="1">
        <el-descriptions-item label="设备名称">
          {{ name }}
        </el-descriptions-item>
        <el-descriptions-item label="状态">
          <i :style="{width:'10px',height:'10px',background:status==='ONLINE'?colorList[0]:colorList[1],display:'inline-block','border-radius':'50%','margin-right':'5px'}" />
          <span :style="{color:status==='ONLINE'?colorList[0]:colorList[1]}">{{ status === 'ONLINE'?'在线':'离线' }}</span>
        </el-descriptions-item>
        <el-descriptions-item :label="`${status === 'ONLINE'?'在线':'离线'}时间`">
          {{ time }}
        </el-descriptions-item>
      </el-descriptions>
      <div slot="reference">
        <div class="content">
          <span>{{ name }}</span>
        </div>
        <img v-if="status === 'ONLINE'" :class="online" :src="online_url">
        <img v-else :class="offline" :src="offline_url">
      </div>
    </el-popover>
  </div>
</template>

<script>
export default {
  props:{
    name:{
      type:String,
      default:''
    },
    position:{
      type:String,
      default:''
    },
    status:{
      type:String,
      default:'OFFLINE'
    },
    time:{
      type:String,
      default:''
    },
  },
  data() {
    return {
      visible: false,
      online_url:'',
      online:'online',
      offline:'cicleMarking',
      offline_url:require('@/assets/images/ic_offline.png'),
      colorList:['#52C41A','#FF4D4F']
    }
  },
  mounted(){
    switch(this.position){
      case 'top':
        this.online_url = require('@/assets/images/ic_offline_up.png')
        this.online = 'online-top'
        this.offline = 'offline-top'
        break
      case 'top-left':
        this.online_url = require('@/assets/images/onlinestate_ic_lignt.png')
        this.online = 'online-top-left'
        this.offline = 'offline-top-left'
        break
      case 'top-right':
        this.online_url = require('@/assets/images/onlinestate_ic_lignt.png')
        this.online = 'online-top-right'
        this.offline = 'offline-top-left'
        break
      case 'left':
        this.online_url = require('@/assets/images/ic_offline_right.png')
        this.online = 'online-left'
        this.offline = 'offline-left'
        break
      case 'right':
        this.online_url = require('@/assets/images/ic_offline_left.png')
        this.online = 'online-right'
        this.offline = 'offline-right'
        break
      case 'bottom':
        this.online_url = require('@/assets/images/ic_offline_up.png')
        this.online = 'online-bottom'
        this.offline = 'offline-bottom'
        break
      case 'bottom-left':
        this.online_url = require('@/assets/images/onlinestate_ic_lignt.png')
        this.online = 'online-bottom-left'
        this.offline = 'offline-bottom-left'
        break
      case 'bottom-right':
        this.online_url = require('@/assets/images/onlinestate_ic_lignt.png')
        this.online = 'online-bottom-right'
        this.offline = 'offline-bottom-left'
        break
    }
  }
}
</script>

<style lang="scss" scoped>

.marking-box{
  width: 20%;
  min-width: 120px;
  height: 100px;
    position: relative;
  .content{
    height: 50px;
    width: 100%;
    background:url('~@/assets/images/btn_inline.png') no-repeat;
    background-size: 100% 100%;
    text-align: center;
    span{
      color: #fff;
      line-height: 50px;
    }
  }
  .online-top{
    margin: 0 30px;
  }
  .online-top-left{
    position: absolute;
    top: 10%;
    left: 10%;
  }
  .online-top-right{
    position: absolute;
    top: 10%;
    right: 15%;
    transform:  rotateY(180deg);
  }
  .online-right{
    transform: translate(-100%,-70%);
  }
  .online-bottom{
    position: absolute;
    transform: translate(-50%,-150%) rotateX(180deg);
  }
  .online-bottom-left{
    position: absolute;
    top: 30%;
    left: 15%;
    transform: translate(0,-100%) rotateX(180deg);
  }
  .online-bottom-right{
    position: absolute;
    top:30%;
    right: 0;
    transform: translate(-20%,-100%) rotateX(180deg) rotateY(180deg);
  }
  .online-left{
    transform: translate(110%,-70%);
  }
  
  
  .offline-top{
    position: absolute;
    left: 40%;
  }
  .offline-top-left{
    position: absolute;
    transform: translate(140%,70%);
  }
  .offline-right{
    position: absolute;
    left: -40px;
    bottom: 50px;
  }
  .offline-bottom{
    position: absolute;
    // bottom: 50px;
    transform: translate(-50%,-250%);
  }
  .offline-bottom-left{
    position: absolute;
    transform: translate(-50%,-300%);
  }
  .offline-left{
    transform: translate(300%,-110%);
  }
}
</style>
<style lang="scss">
.popper{
  border: 1px solid #0091FF ;
  background: #001344 ;
}
</style>
