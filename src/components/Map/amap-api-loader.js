const robotIcon = require('@/assets/images/roboticon.png')
let AMap = window.AMap
export class MyMarker {
  constructor(map, option = { icon: robotIcon, position: [116.478935, 39.997761] }) {
    AMap = window.AMap
    const icon = option.size ? this.getIcon(option.icon, { ...option.size }) : option.icon
    this.marker = new AMap.Marker({
      map: map,
      position: option.position,
      icon,
      offset: option.offset ? new AMap.Pixel(option.offset.x, option.offset.y) : undefined
    })
    this.map = map
  }
  moveTo(lng, lat) {
    this.marker.moveTo(new AMap.LngLat(lng, lat))
  }

  moveAlong(lineArr) {
    this.marker.moveAlong(lineArr, {
      // 每一段的时长
      duration: 200,
      // JSAPI2.0 是否延道路自动设置角度在 moveAlong 里设置
      autoRotation: true
    });
  }

  getIcon(url, { width, height }) {
    return new AMap.Icon({
      size: new AMap.Size(width, height), // 图标尺寸
      image: url, // Icon的图像
      imageSize: new AMap.Size(width, height)
    });
  }

  setPosition(position) {
    this.marker.setPosition(position)
  }
}

export class MyPolyline {
  constructor(map, { path, strokeColor = "#28F", strokeWeight, ...args }) {
    AMap = window.AMap
    this.polyline = new AMap.Polyline({
      map,
      path,
      showDir: true,
      strokeColor, // 线颜色
      // strokeOpacity: 1,     //线透明度
      strokeWeight, // 线宽
      // strokeStyle: "solid"  //线样式
      ...args
    });
  }

  setPath(path) {
    this.polyline.setPath(path)
  }
}