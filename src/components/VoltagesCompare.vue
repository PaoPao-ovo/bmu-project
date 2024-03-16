<script setup>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import { useBmuStore } from '@/stores/modules/bmu'
import { GetHistoryVolService } from '@/api/bmu'
// const bmuStore = useBmuStore()
// const VoltagesData = ref([])
// const options = {
//   color: ["#56D0E3", "#F8B448", "#8B78F6"],
//   tooltip: {
//     trigger: 'axis',
//     axisPointer: {
//       type: 'shadow'
//     },
//   },
//   animation: false,
//   grid: {
//     left: '1%',
//     top: '10%',
//     right: '0%',
//     bottom: '10%',
//     containLabel: true
//   },
//   xAxis: [
//     {
//       type: 'time',
//       axisTick: {
//         show: false // 去除刻度线
//       },
//       axisLine: {
//         show: false // 去除轴线
//       },
//       axisLabel: {
//         magrin: 10, // 刻度标签与轴线之间的距离
//         formatter:'{hh}-{mm}'
//       }
//     }
//   ],
//   yAxis: {
//     type: 'value',
//     min: 10,
//     max: 15,
//     splitLine: {
//       lineStyle: {
//         color: '#012f4a'
//       }
//     },
    
//   },
//   series: [
//     {
//       name: '今日电压',
//       type: 'line',
//     },
//     {
//       name: '昨日电压',
//       type: 'line',
//     }
//   ]
// }
// const DataInit = async () => {
//   // 获取昨日和今日数据（字符串格式）
//   const Yesterday = new Date(new Date().getTime() - 24 * 60 * 60 * 1000).toISOString().split('T')[0]
//   const Today = new Date().toISOString().split('T')[0]
//   const YesterdayRes = await GetHistoryVolService(bmuStore.bmu_id, Yesterday)
//   const TodayRes = await GetHistoryVolService(bmuStore.bmu_id, Today)
//   const YesterdayDataTime = YesterdayRes.data.timedata
//   const YesterdayVol = YesterdayRes.data.voltage.map((item) => item / 1000)
//   const TodayDataTime = TodayRes.data.timedata
//   const TodayVol = TodayRes.data.voltage.map((item) => item / 1000)
//   VoltagesData.value = [YesterdayDataTime, YesterdayVol, TodayDataTime, TodayVol]
// }

// onMounted(async() => {
//   await DataInit()
//   const VoltagesCompareChart = echarts.init(document.getElementById('VoltagesCompare'))
//   options.xAxis[0].data = VoltagesData.value[2]
//   options.series[0].data = VoltagesData.value[3]
//   options.series[1].data = VoltagesData.value[1]
//   VoltagesCompareChart.setOption(options)
//   window.addEventListener('resize', function () {
//     VoltagesCompareChart.resize()
//   })
// })
</script>

<template>
  <h2>电压变化曲线</h2>
  <div class="chart" id="VoltagesCompare"></div>
  <div class="panel-footer"></div>
</template>
