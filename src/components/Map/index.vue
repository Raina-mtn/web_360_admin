<template>
  <div :id="id" :style="{ height: height, width: width }" />
</template>
<script>
let AMap = window.AMap
import MapLoader from '@/utils/logic/amap.js'
export default {
  props: {
    id: {
      type: String,
      default: "map-container",
      require: true
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "300px"
    }
  },
  data() {
    return {
      map: null,
      timer: null,
      lineArr: [] // 线路
    };
  },
  mounted() {
    // this.initMap();
    const self = this
    MapLoader().then((map) => {
      AMap = map
      this.map = new AMap.Map(this.id, {
        resizeEnable: true,
        zoom: 20
      })
      // JSAPI2.0 使用覆盖物动画必须先加载动画插件
      AMap.plugin('AMap.MoveAnimation', async function() {
        self.lineArr = await self.getLineArr([{ keyword: "三坝" }, { keyword: "创景路" }])

        self.marker = new AMap.Marker({
          map: self.map,
          position: [116.478935, 39.997761],
          icon: "https://a.amap.com/jsapi_demos/static/demo-center-v2/car.png",
          offset: new AMap.Pixel(-13, -26)
        });

        // 绘制轨迹
        new AMap.Polyline({
          map: self.map,
          path: self.lineArr,
          showDir: true,
          strokeColor: "#28F", // 线颜色
          // strokeOpacity: 1,     //线透明度
          strokeWeight: 6 // 线宽
          // strokeStyle: "solid"  //线样式
        });

        self.passedPolyline = new AMap.Polyline({
          map: self.map,
          strokeColor: "#AF5", // 线颜色
          strokeWeight: 6 // 线宽
        });

        // marker.on('moving', function(e) {
        //   passedPolyline.setPath(e.passedPath);
        // });
        self.i = 0;
        self.timer = setInterval(() => {
          if (self.i < self.lineArr.length) {
            const [lng, lat] = self.lineArr[self.i]
            const path = self.lineArr.slice(0, self.i)
            self.passedPolyline.setPath(path);
            self.marker.moveTo(new AMap.LngLat(lng, lat))
            self.i++
          } else {
            self.i = 0
          }
        }, 200)
        // marker.moveAlong(lineArr, {
        //   // 每一段的时长
        //   duration: 200,
        //   // JSAPI2.0 是否延道路自动设置角度在 moveAlong 里设置
        //   autoRotation: true
        // });
      });
    })
  },
  methods: {
    async initMap() {
      // const AMapInstance = new MapLoader();
      // this.AMapInstance = AMapInstance;
      // await AMapInstance.init("map-container");
      // AMapInstance.addMarker();
      // const path1 = await this.addRoute([{ keyword: "三坝" }, { keyword: "创景路" }])
      // const path2 = await this.addRoute([120.241065, 30.300002], [120.176739, 30.285425])
      // this.curPathArr = [path1, path2]
      // await AMapInstance.showSimpleLine(this.curPathArr)
    },
    async addRoute(...args) {
      const _this = this;
      const AMap = await this.AMapInstance.load();
      return new Promise((resolve, reject) => {
        AMap.service("AMap.Transfer", function() {
          const transfer = new AMap.Transfer({
            panel: "",
            city: "杭州市",
            policy: AMap.TransferPolicy.LEAST_TIME
          });
          transfer.search(...args, function(
            status,
            result
          ) {
            if (status === "complete") {
              if (result.plans && result.plans.length) {
                resolve(_this.AMapInstance.drawRoute(result.plans[0]))
              }
            } else {
              reject(result)
              console.error(result);
            }
          });
        });
      })
    },
    async addNewLine() {
      const path1 = await this.addRoute([{ keyword: "金星" }, { keyword: "中泰" }])
      this.curPathArr.push(path1)
      this.AMapInstance.showSimpleLine(this.curPathArr)
    },
    delLine() {
      this.curPathArr.pop()
      this.AMapInstance.showSimpleLine(this.curPathArr)
    },
    getLineArr(...args) {
      const self = this
      return new Promise((resolve, reject) => {
        this.map.plugin(["AMap.Transfer"], function() {
          const transOptions = {
            map: self.map,
            city: '杭州市', // 公交城市
            policy: AMap.TransferPolicy.LEAST_TIME // 乘车策略
          };
          const transfer = new AMap.Transfer(transOptions);
          transfer.search(...args, function(
            status,
            result
          ) {
            if (status === "complete") {
              if (result.plans && result.plans.length) {
                const { segments } = result.plans[0]
                let routeLines = []
                segments.forEach(s => {
                  const { transit: { path }} = s
                  routeLines = routeLines.concat(path.map(p => [p.lng, p.lat]))
                })
                resolve(routeLines)
              }
            } else {
              reject(result)
              console.error(result);
            }
          });
        })
      })
    },
    pausePatrol() {
      clearInterval(this.timer)
      this.timer = null
    },
    resumePatrol() {
      const self = this
      this.pausePatrol()
      self.timer = setInterval(() => {
        if (self.i < self.lineArr.length) {
          const [lng, lat] = self.lineArr[self.i]
          const path = self.lineArr.slice(0, self.i)
          self.passedPolyline.setPath(path);
          self.marker.moveTo(new AMap.LngLat(lng, lat))
          self.i++
        } else {
          self.i = 0
        }
      }, 200)
    }

  }
};
</script>
