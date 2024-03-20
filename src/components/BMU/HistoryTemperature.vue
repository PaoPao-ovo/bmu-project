<script setup>
import { onMounted, watch } from 'vue'
import * as echarts from 'echarts'
import { useBmuStore } from '@/stores/modules/bmu'
import { TodayDateFormate, SelectDateFormate } from '@/utils/daytime'

const timerobj = defineModel('timer')

const bmuStore = useBmuStore()

const options = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    },
    confine: true,
    enterable: true,
    formatter: function (params) {
      let htmlStr =
        '<div style="height: auto;max-height: 200px;overflow-y: auto;"><p>' +
        params[0].axisValue +
        '</p>'
      for (let i = 0; i < params.length; i++) {
        htmlStr +=
          '<p style="color: #666;">' +
          params[i].marker +
          params[i].seriesName +
          ': ' +
          params[i].value +
          ' ℃</p>'
      }
      htmlStr += '</div>'
      return htmlStr
    }
  },
  animation: false,
  grid: {
    left: '0%',
    top: '40px',
    right: '0%',
    bottom: '4%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category'
    }
  ],
  yAxis: {
    type: 'value'
  }
}

const SeriesTransfer = (data) => {
  let series = []
  for (let i = 0; i < data.length; i++) {
    series.push({
      name: `温度${i + 1}`,
      type: 'line',
      data: data[i]
    })
  }
  return series
}
let Chart = null
watch(bmuStore.HistoryTemperatureTable.temperature, (newVal) => {
  if (timerobj.value.daytime === TodayDateFormate()) {
    const seriesdata = SeriesTransfer(newVal)
    const option = {
      series: seriesdata,
      xAxis: [
        {
          data: bmuStore.HistoryTemperatureTable.xAxis
        }
      ]
    }
    Chart.setOption(option)
  }
})

onMounted(() => {
  const TempCompareChart = echarts.init(document.getElementById('TempCompare'))
  Chart = TempCompareChart
  TempCompareChart.setOption(options)
  window.addEventListener('resize', function () {
    TempCompareChart.resize()
  })
})

const DisabledDate = (time) => {
  return time.getTime() > Date.now()
}

const UpdateChart = async (chosetime) => {
  const formattime = SelectDateFormate(chosetime)
  if (formattime !== TodayDateFormate()) {
    timerobj.value.daytime = formattime
    clearInterval(timerobj.value.timerid)
    timerobj.value.timerid = null
    await bmuStore.SetHistoryTemperatureTable(timerobj.value.daytime)
    const seriesdata = SeriesTransfer(bmuStore.HistoryTemperatureTable.temperature)
    const option = {
      series: seriesdata,
      xAxis: [
        {
          data: bmuStore.HistoryTemperatureTable.xAxis
        }
      ]
    }
    Chart.setOption(option)
  } else {
    if (timerobj.value.timerid === null) {
      timerobj.value.daytime = formattime
      await bmuStore.SetHistoryTemperatureTable(formattime)
      timerobj.value.timerid = setInterval(
        async (time) => {
          await bmuStore.SetHistoryTemperatureTable(time)
        },
        60000,
        timerobj.value.daytime
      )
    }
  }
}
</script>

<template>
  <div class="timeselect">
    <el-date-picker
      v-model="timerobj.daytime"
      class="timeselect"
      style="width: 1.5rem; height: 0.3rem"
      type="date"
      @change="UpdateChart"
      :disabled-date="DisabledDate"
      placeholder="选择日期"
    />
  </div>
  <h2>温度变化曲线</h2>
  <div class="chart" id="TempCompare"></div>
  <div class="panel-footer"></div>
</template>

<style scoped>
.timeselect {
  position: absolute;
  right: 0.25rem;
  top: 0.15rem;
}
</style>
