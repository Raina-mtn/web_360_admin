/*
 * @Author: your name
 * @Date: 2021-03-15 18:47:27
 * @LastEditTime: 2021-11-16 10:36:01
 * @LastEditors: Please set LastEditors
 * @Description: 数字加减法
 * @FilePath: /robot-web/src/utils/public/lib/number.js
 */

export class Check {
  static type(type) {
    return async (value)=> {
      if( Object.prototype.toString.call(value) !== type ){
        throw new Error('类型不对')
      }

    }
  }

  static async require(value) {
    if(!value ){
      throw new Error('值为空')
    }
  }
}
