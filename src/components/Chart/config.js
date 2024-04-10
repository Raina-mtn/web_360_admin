// import { cloneDeep } from 'lodash-es'
// 是否是二维（多维）数组
const is2DArray = (arr) => {
  return arr.length && arr.every(v => Array.isArray(v))
}
// 坐标轴一般配置
const axisSetting = (option) => ({
  axisLine: {
    lineStyle: {
      color: '#ccc'
    }
  },
  splitLine: {
    lineStyle: {
      color: '#ccc'
    }
  },
  axisTick: {
    show: false
  },
  axisLabel: {
    color: '#999'
  },
  ...option
})
// grid一般配置
const gridSetting = (option) => ({
  top: '12%',
  bottom: '12%',
  ...option
})
// tooltip一般配置
const tooltipSetting = (option, type) => ({
  trigger: type === 'pie' ? 'item' : 'axis',
  ...option
})
// 折线轴一般配置
const seriesLineSetting = (option) => ({
  symbol: 'circle',
  symbolSize: 6,
  ...option
})
// 柱形轴一般配置
const seriesBarSetting = (option) => ({
  barWidth: 20,
  color: "#3299FF",
  ...option
})
// 饼状图一般配置
const seriesPieSetting = (option) => ({
  type: 'pie',
  radius: ['45%', '60%'],
  center: ['50%', '50%'],
  labelLine: {
    normal: {
      length: 4,
      length2: 0,
      lineStyle: {
        color: '#e6e6e6'
      }
    }
  },
  ...option
})
/**
 *
 * @param {object} sSet series的样式配置
 * @param {string} type echarts类型
 * @param {arr} data 传入series的数据,这里只针对同类型图标。比如存在2种类型的bar，data 的格式可能为[[1,2,3],[2,3,4]],多维数组需要定制配置项，例如每个series的name，可以使用[[{name:'aaa', data:[1,2,3]}]]
 * 如果存在不同类型组合图表，可以先使用该函数得到两个series项，再塞到createOptions里面去
 * @returns
 */
const seriesSetting = (sSet, type, data) => {
  switch (type) {
    case 'line':
    case 'bar' : {
      if (is2DArray(data)) { // 如果是二维数据，表示有多个series
        return (data && data.map(d => {
          const constantOption = {
            type,
            ...(type === 'line' ? seriesLine : seriesBar), ...sSet
          }
          if (d[0].data && Array.isArray(d[0].data)) { // d是[{name:'aaa', data:[1,2,3]}]
            const { data, ...args } = d[0]
            return {
              data: data,
              ...args,
              ...constantOption
            }
          }
          return {
            data: d,
            ...constantOption
          }
        }))
      } else {
        return [{
          data,
          type,
          ...(type === 'line' ? seriesLine : seriesBar),
          ...sSet
        }]
      }
    }
    case 'pie' : {
      return [{
        ...seriesPieSetting(sSet),
        data
      }]
    }
    case 'scatter': {
      return data.map(d => ({
        type: 'scatter',
        symbolSize: 6, ...d }))
    }
  }
}
const seriesLine = seriesLineSetting();
const seriesBar = seriesBarSetting();
/**
 *
 * @param {xSet:x轴样式设置, ySet:y轴样式设置, sSet::series样式设置, grid, tooltip, type:图表类型, data: 数据值, ...args：其余参数} 传入的是对象属性，属性使用默认属性可以不传参
 * @returns
 */
const createOptions = ({ xSet, ySet, sSet, grid, tooltip, type, data, ...args }) => {
  const axisSet = {
    xAxis: {
      type: 'category',
      data: [],
      ...axisSetting(xSet)
    },
    yAxis: {
      type: 'value',
      ...axisSetting(ySet)
    }}
  return {
    grid: {
      ...gridSetting(grid)
    },
    tooltip: {
      ...tooltipSetting(tooltip, type)
    },
    ...(type === 'pie' ? {} : axisSet),
    series: seriesSetting(sSet, type, data),
    ...args
  }
}
export { axisSetting, gridSetting, seriesLineSetting, createOptions }