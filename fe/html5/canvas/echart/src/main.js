import './style.css'
import * as echarts from 'echarts'
import { months, salesData } from './data.js'

// ==================== 柱状图 ====================
const barDom = document.getElementById('bar-chart')
const barChart = echarts.init(barDom)

barChart.setOption({
  title: {
    text: '李氏集团 2025 年运动鞋月销售额',
    subtext: '单位：百万元',
    left: 'center',
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'shadow' },
    valueFormatter: (value) => `${value} 百万元`,
  },
  grid: {
    top: 80,
    left: 50,
    right: 30,
    bottom: 40,
  },
  xAxis: {
    type: 'category',
    data: months,
    axisLabel: { rotate: 30 },
  },
  yAxis: {
    type: 'value',
    name: '销售额（百万元）',
    min: 0,
    max: 18,
  },
  series: [
    {
      name: '销售额',
      type: 'bar',
      data: salesData,
      itemStyle: {
        color: (params) => {
          const max = Math.max(...salesData)
          return params.value === max ? '#e74c3c' : '#5470c6'
        },
        borderRadius: [4, 4, 0, 0],
      },
      label: {
        show: true,
        position: 'top',
      },
    },
  ],
})

// ==================== 饼状图 ====================
const pieDom = document.getElementById('pie-chart')
const pieChart = echarts.init(pieDom)

// 按季度聚合数据
const quarters = ['Q1（1-3月）', 'Q2（4-6月）', 'Q3（7-9月）', 'Q4（10-12月）']
const quarterData = [
  salesData.slice(0, 3).reduce((a, b) => a + b, 0),
  salesData.slice(3, 6).reduce((a, b) => a + b, 0),
  salesData.slice(6, 9).reduce((a, b) => a + b, 0),
  salesData.slice(9, 12).reduce((a, b) => a + b, 0),
].map((v) => +v.toFixed(1))

pieChart.setOption({
  title: {
    text: '李氏集团 2025 年季度销售占比',
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
    formatter: (p) => `${p.name}<br/>销售额：${p.value} 百万元（占比 ${p.percent}%）`,
  },
  legend: {
    bottom: 10,
  },
  series: [
    {
      name: '季度销售额',
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['50%', '50%'],
      data: quarters.map((name, i) => ({ name, value: quarterData[i] })),
      label: {
        show: true,
        formatter: '{b}\n{d}%',
      },
      emphasis: {
        label: {
          fontSize: 18,
          fontWeight: 'bold',
        },
      },
    },
  ],
})

// ==================== 响应式 ====================
window.addEventListener('resize', () => {
  barChart.resize()
  pieChart.resize()
})
