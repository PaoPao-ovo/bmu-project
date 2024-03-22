<script setup>
import { onMounted, watch } from 'vue'
import * as echarts from 'echarts'
import { useBmuStore } from '@/stores/modules/bmu'
import { TodayDateFormate, SelectDateFormate } from '@/utils/daytime'

const bmuStore = useBmuStore()
const timerobj = defineModel('voltagestimer')

const options = {
  color: ['#00f2f1'],
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    },
    confine: true,
    enterable: true
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
    type: 'value',
    min: 9,
    max: 16
  }
}
let Chart = null

const DisabledDate = (time) => {
  return time.getTime() > Date.now()
}

onMounted(() => {
  const VoltagesCompareChart = echarts.init(document.getElementById('VoltagesCompare'))
  Chart = VoltagesCompareChart
  VoltagesCompareChart.setOption(options)
  window.addEventListener('resize', function () {
    VoltagesCompareChart.resize()
  })
})

watch(
  bmuStore.HistoryVoltageTable,
  (newVal) => {
    if (timerobj.value.daytime === TodayDateFormate()) {
      if (newVal.voltage.length > 0) {
        const option = {
          series: [
            {
              name: '电压',
              type: 'line',
              data: newVal.voltage
            }
          ],
          xAxis: [
            {
              data: bmuStore.HistoryVoltageTable.timedata
            }
          ]
        }
        Chart.setOption(option)
      } else {
        const option = {
          series: [
            {
              name: '电压',
              type: 'line',
              data: newVal.voltage
            }
          ],
          xAxis: [
            {
              data: []
            }
          ]
        }
        Chart.setOption(option)
      }
    }
  },
  {
    deep: true
  }
)

const UpdateChart = async (chosetime) => {
  const formattime = SelectDateFormate(chosetime)
  if (formattime !== TodayDateFormate()) {
    timerobj.value.daytime = formattime
    clearInterval(timerobj.value.timerid)
    timerobj.value.timerid = null
    await bmuStore.SetBmuHistoryTemperatureList(timerobj.value.daytime)
    const option = {
      series: [
        {
          data: bmuStore.HistoryVoltageTable.voltage
        }
      ],
      xAxis: [
        {
          data: bmuStore.HistoryVoltageTable.timedata
        }
      ]
    }
    Chart.setOption(option)
  } else {
    if (timerobj.value.timerid === null) {
      timerobj.value.daytime = formattime
      await bmuStore.SetBmuHistoryTemperatureList(formattime)
      timerobj.value.timerid = setInterval(
        async (time) => {
          await bmuStore.SetBmuHistoryTemperatureList(time)
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
  <h2>电压变化曲线</h2>
  <div class="chart" id="VoltagesCompare"></div>
  <div class="panel-footer"></div>
</template>
<style scoped>
.timeselect {
  position: absolute;
  right: 0.25rem;
  top: 0.15rem;
}
</style>
