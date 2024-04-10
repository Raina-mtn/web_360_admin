// import { debounce } from 'lodash-es'
import elementResizeDetectorMaker from "element-resize-detector";

export default {
  data(){
    return{
    }
  },
  methods: {
    initListener(divId,cb) {
      const  that = this;
      const erd = elementResizeDetectorMaker();
      erd.listenTo(document.getElementById(divId), element => {
        const width = element.offsetWidth;//当前div的宽度
        const height = element.offsetHeight;//当前div的高度
        that.$nextTick(() => {
          //监听到事件后执行的业务逻辑
          //使echarts尺寸重置
          cb(width, height)
        });
      });

      // 监听销毁
      this.$once('hook:beforeDestroy', () => {            
        // erd.removeListener(document.getElementById(divId),element=> {
        //   console.log('移除成功')
        // })                                 
      })
    },
  
  }
}
