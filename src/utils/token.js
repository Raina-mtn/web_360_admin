export const TokenKey = 'shenhao-vuex'
export function getToken() {
  const storage = window.localStorage.getItem(TokenKey)
  return storage && JSON.parse(storage)
}
export function removeToken() {
  return window.localStorage.removeItem(TokenKey)
}
export function getTokenByKey(){
  var _args = Array.prototype.slice.call(arguments);
  let obj = getToken()
  let res = ''
  _args.forEach(v=>{
    if (obj && obj[v]){
      res = obj[v]
      obj = JSON.parse(JSON.stringify(obj[v]))
    } else {
      res = ''
    }
  })
  return res
}
