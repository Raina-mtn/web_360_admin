/*
 * @Author: your name
 * @Date: 2021-03-15 18:47:27
 * @LastEditTime: 2021-04-13 14:30:29
 * @LastEditors: Please set LastEditors
 * @Description: 数字加减法
 * @FilePath: /robot-web/src/utils/public/lib/number.js
 */

import { Decimal } from 'decimal.js'

export default class NumberUtils {
  /**
   * @func
   * @desc  乘法
   * @param { number } num1 - 数字1
   * @param { number } num2 - 数字2
   * @returns {number}
   */
  static accMul(arg1, arg2) {
    const s1 = arg1 || 0
    const s2 = arg2 || 0
    const num = new Decimal(s1).mul(new Decimal(s2)).toNumber()
    return num
  }

  /**
   * @func
   * @desc  除法
   * @param { number } num1 - 数字1
   * @param { number } num2 - 数字2
   * @returns {number}
   */
  static accDiv(arg1, arg2) {
    const s1 = arg1 || 0
    const s2 = arg2 || 0
    const num = new Decimal(s1).div(new Decimal(s2)).toNumber()
    return num
  }

  /**
   * @func
   * @desc  减法
   * @param { number } num1 - 数字1
   * @param { number } num2 - 数字2
   * @returns { number }
   */
  static accSub(arg1, arg2) {
    const s1 = arg1 || 0
    const s2 = arg2 || 0
    const num = Decimal.sub(s1, s2)
    return num
  }
}
