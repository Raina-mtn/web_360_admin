export function fileDownLoad(data, name) {
  // 判断浏览器是否支持blob对象
  try {
    // 该实例化的方式第一个参数必须是数组的格式
    var blob = new Blob([data], { type: name });
    // console.log(blob);
  } catch (e) {
    // 旧版本浏览器下的blob创建对象
    /* window.BlobBuilder = window.BlobBuilder ||
                            window.WebKitBlobBuilder ||
                            window.MozBlobBuilder ||
                            window.MSBlobBuilder
        if (e.name === 'TypeError' && window.BlobBuilder) {
          var blobbuilder = new BlobBuilder()
          BlobBuilder.append(data)
          var blob = blobbuilder.getBlob('application/zip')
        } else {
          alert('浏览器版本较低，暂不支持该文件类型下载')
        } */
  }
  if (!!window.ActiveXObject || 'ActiveXObject' in window) { //判断了有该方法即为IE浏览器
    try {
      window.navigator.msSaveBlob(blob, name)
    } catch (e) {
      console.log(e);
    }
  } else {
    var linkElement = document.createElement("a"); // 创建点击下载的元素
    document.body.appendChild(linkElement);
    var url = window.URL.createObjectURL(blob);
    linkElement.setAttribute("href", url); //"/operator-api/report/exportRobotAssets"
    linkElement.setAttribute("downLoad", name);
    linkElement.click();
    document.body.removeChild(linkElement);
  }
}
export function fileDownLoad1(url, name) {
  console.log('url>>>', url)
  var linkElement = document.createElement("a"); // 创建点击下载的元素
  document.body.appendChild(linkElement);
  linkElement.setAttribute("href", url); //"/operator-api/report/exportRobotAssets"
  linkElement.setAttribute("downLoad", name);
  linkElement.click();
  document.body.removeChild(linkElement);
}