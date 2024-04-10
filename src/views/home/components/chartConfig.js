// import {defectGradeObj} from '@/utils/config'

/*
  echarts 通用配置项
*/
//legend配置项
const legendRender = (option={})=>({legend:{
  itemWidth:12,
  itemHeight:12,
  icon:'rect',
  orient: 'vertical',
  type: 'scroll',
  x:'left', 
  y:'center',
  left: '10%',
  textStyle:{
    height:20,
    color: "#FFF"
  },
  ...option
}})
//grid配置项
const grid = {
  grid:{
    // left:'10%',
    top:'10%',
    // right:'10%',
    bottom:'10%',
    borderWidth:1,
    containLabel: true
  }}
//tooltip配置项
const tooltip ={
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    },
  },
}

//报警数量
export const barOption =(seriesData)=> {
  const xAxisData = seriesData.map(v=> v.name)
  const data = seriesData.map(v=>v.count)
  return {
    grid: {
      left:'5%',
      top:'10%',
      right:'5%',
      bottom:'10%',
      borderWidth:1,
      containLabel: true
    },
    ...legendRender(),
    ...tooltip,
    color: ['#FAC858'],
    xAxis:{
      data:xAxisData,
      axisLabel: {
        interval:0,
        fontSize:12,
        // rotate:"45"
      },
      axisLine:{
        lineStyle:{
          color:'#fff'
        }
      },
    },
    yAxis:{
      axisLine:{
        show:true,
        lineStyle:{
          color:'#fff'
        }
      },
      splitLine:false
    },
    series: [
      {
        type: 'bar',
        barWidth: 17,
        data:data
      }
    ]}
}
//报警分布
export const pieOption = (seriesData)=>  {
  const xAxisData = seriesData.map(v=>v.name)
  const data = seriesData.map(v=>({
    name:v.name,
    percent:v.percent,
    value:v.count
  }))
  return {
    tooltip: {
      trigger: 'item',
    },
    ...legendRender({ data:xAxisData}),
    legend: {
      orient: 'vertical',
      left:'0%',
      height:'80%',
      top:'0%',
      icon:'circle',
      itemWidth:10,
      itemHeight:10,
      itemGap:12,
      textStyle: {	
        color: '#fff',// 添加
      }
    },
    series: [
      {
        type: 'pie',
        left: '0',
        center: ['80%', '40%'],
        radius: ['40%', '60%'],
        avoidLabelOverlap: false,
        itemStyle: {
          // borderRadius: 10,
        },
        data: data,
        label: {
          show: false,
          formatter: '{b}:{d}%',
          position:'outer',
          alignTo:'edge',
        },
        labelLine: {// 图形外文字线
          normal: {
            show: false,
            length: 15,
            length2: 30,
          }
        },
      }
    ]
  }}
//未检列车
export const rowBarOption = (seriesData)=>{
  const yAxisData = seriesData.map(v=>v.plateNumber)
  const data = seriesData.map(v=>v.day)
  return {
    ...grid,
    ...tooltip,
    color: ['#FAC858'],
    xAxis: {
      type: 'value',
      boundaryGap: [0, 0.01],
      axisLine:{
        lineStyle:{
          color:'#fff'
        }
      },
      minInterval: 1
    },
    yAxis: {
      type: 'category',
      data: yAxisData,
      axisLine:{
        lineStyle:{
          color:'#fff'
        }
      },
    },
    series: [
      {
        type: 'bar',
        data:data
      },
    ]
  };
}
//车故障数排行
export const stackBarOption = (seriesData)=>{
  const xAxisData = seriesData.map(v=>v.plateNumber)
  const highData = seriesData.map(v=>v.highCount)
  const mediumData = seriesData.map(v=>v.mediumCount)
  const lowData = seriesData.map(v=>v.lowCount)
  return {
    ...grid,
    ...tooltip,
    color: ['#EE6666','#FAC858','#91CC75'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
    },
    legend: {
      textStyle:{
        color:'#fff'
      }},
    grid: {
      left: '3%',
      right: '4%',
      bottom: '0%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: xAxisData,
        axisLine:{
          lineStyle:{
            color:'#fff'
          }
        },
      }
    ],
    yAxis: [
      {
        type: 'value',
        axisLine:{
          lineStyle:{
            color:'#fff'
          }
        },
        splitLine:{ //网格线
          show:false
        },
        // minInterval:1
      }
    ],
    series: [
      {
        name: '高',
        type: 'bar',
        stack: 'total',
        emphasis: {
          focus: 'series'
        },
        data: highData
      },
      {
        name: '中',
        type: 'bar',
        stack: 'total',
        emphasis: {
          focus: 'series'
        },
        data: mediumData
      },
      {
        name: '低',
        type: 'bar',
        stack: 'total',
        emphasis: {
          focus: 'series'
        },
        data: lowData
      }
    ]

  };
}
