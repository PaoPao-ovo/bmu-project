<script setup>
import * as echarts from 'echarts'
import { storeToRefs } from 'pinia'
import { useBmuStore } from '@/stores/modules/bmu'
import { onMounted, watch } from 'vue'
const xAxisData = () => {
  const TempArr = []
  for (let i = 0; i < 50; i++) {
    TempArr[i] = i + 1
  }
  return TempArr
}

const bmuStore = useBmuStore()
const { BmuList } = storeToRefs(bmuStore)

onMounted(() => {

  const TempertureSp = echarts.init(document.getElementById('TempertureSp'))
  const options = {
    color: ['#00f2f1'],
    animation: false,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: function (params) {
        return (
          params[0].dataIndex +
          1 +
          '号' +
          '<br/>' +
          params[0].marker +
          params[0].seriesName +
          ' ' +
          '<strong>' +
          params[0].value +
          ' ℃' +
          '<strong/>'
        )
      }
    },
    grid: {
      left: '0%',
      top: '40px',
      right: '0%',
      bottom: '4%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: xAxisData(),
      axisTick: {
        show: false // 去除刻度线
      },
      axisLine: {
        show: false // 去除轴线
      }
    },
    yAxis: {
      type: 'value',
      name: '温度(℃)',
      min: -10,
      max: 60,
      splitLine: {
        lineStyle: {
          color: '#012f4a'
        }
      },
      nameLocation: 'end',
      nameTextStyle: {
        fontStyle: 'italic',
        color: 'white',
        align: 'left'
      }
    },
    series: [
      {
        name: '温度',
        type: 'scatter',
        symbolSize: 6
      }
    ]
  }
  TempertureSp.setOption(options)
  window.addEventListener('resize', function () {
    TempertureSp.resize()
  })
})

watch(BmuList.value, (newvalue) => {
  const TempertureSp = echarts.init(document.getElementById('TempertureSp'))
  const options = {
    series: [{ data: newvalue }]
  }
  TempertureSp.setOption(options)
},
  { deep: true })
</script>

<template>
  <div>
    <h2>单体温度散点图</h2>
    <div class="chart" id="TempertureSp"></div>
    <div class="panel-footer"></div>
  </div>
</template>
