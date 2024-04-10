import store from '@/store'
setFontSize()
function setFontSize(){
  let designWidth = 1920;//设计稿的宽度，根据实际项目调整
  let designHeight = 1080;//设计稿的高度，根据实际项目调整
  var fontSize = 
        document.documentElement.clientWidth/document.documentElement.clientHeight < designWidth/designHeight ? 
          (document.documentElement.clientWidth / designWidth) * 12:
          (document.documentElement.clientHeight / designHeight) * 12;
  document.querySelector('html').style.fontSize = fontSize + 'px';
}
window.onresize = function () {
  setFontSize()
  store.commit('SET_FONTSIZE', getFontSize())
};

export function getFontSize(){
  let designWidth = 1920;//设计稿的宽度，根据实际项目调整
  let designHeight = 1080;//设计稿的高度，根据实际项目调整
  var fontSize = 
        document.documentElement.clientWidth/document.documentElement.clientHeight < designWidth/designHeight ? 
          (document.documentElement.clientWidth / designWidth) * 12:
          (document.documentElement.clientHeight / designHeight) * 12;
  return fontSize
}