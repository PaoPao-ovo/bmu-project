<script setup>
import TempertureSp from '@/components/BMU/TempertureSp.vue'
import HeatMap from '@/components/BMU/HeatMap.vue'
import TemperatureTable from '@/components/BMU/TemperatureTable.vue'
import HistoryTemperature from '@/components/BMU/HistoryTemperature.vue'
import VoltagesCompare from '@/components/BMU/VoltagesCompare.vue'
import WarnInfo from '@/components/BMU/WarnInfo.vue'
import { useBmuStore } from '@/stores/modules/bmu'
import { onBeforeUnmount, ref } from 'vue'
import { TodayDateFormate } from '@/utils/daytime'
import { VolGetService} from '@/api/bmu'
const bmuStore = useBmuStore()
// 初始化数据
const InitData = async () => {
  await bmuStore.SetBmuTemperatureList()
  await bmuStore.SetHistoryTemperatureTable(TodayDateFormate())
  await bmuStore.SetBmuHistoryTemperatureList(TodayDateFormate())
  await bmuStore.SetWarnList()

  const voltageRes = await VolGetService(bmuStore.bmu_id)
  BmuInfo.value.voltage = voltageRes.data.voltage/1000 + ' V'
  BmuInfo.value.temperature = bmuStore.TemperatureTable[2].value1
}

const Timer = ref({
  daytime: TodayDateFormate(),
  timerid: null
})

const VoltagesTimer = ref({
  daytime: TodayDateFormate(),
  timerid: null
})

InitData()

// 定时更新数据
setInterval(async () => {
  await bmuStore.SetBmuTemperatureList()
}, 1000)

// 历史温度定时更新
Timer.value.timerid = setInterval(
  async (time) => {
    await bmuStore.SetHistoryTemperatureTable(time)
  },
  60000,
  Timer.value.daytime
)

// 历史电压定时更新
VoltagesTimer.value.timerid = setInterval(
  async (time) => {
    await bmuStore.SetBmuHistoryTemperatureList(time)
  },
  60000,
  VoltagesTimer.value.daytime
)

// 报警数据定时更新
setInterval(async () => {
  await bmuStore.SetWarnList()
}, 5000)

onBeforeUnmount(() => {
  clearInterval(Timer.value.timerid)
  Timer.value.timerid = null
})

const BmuInfo = ref({
  voltage:null,
  temperature:null
})

// BMU数据定时更新
setInterval(async () => {
  const voltageRes = await VolGetService(bmuStore.bmu_id)
  BmuInfo.value.voltage = voltageRes.data.voltage/1000 + ' V'
  BmuInfo.value.temperature = bmuStore.TemperatureTable[2].value1
}, 5000)
</script>
<template>
  <!-- 页面头部 -->
  <header>
    <h1>电池数据展示大屏</h1>
  </header>
  <!-- 页面主体 -->
  <section class="mainbox">
    <!-- 左侧数据展示主体 -->
    <div class="column">
      <!-- 左侧数据展示组件 -->
      <div class="panel">
        <TempertureSp />
      </div>
      <div class="panel">
        <HeatMap />
      </div>
      <div class="panel">
        <TemperatureTable />
      </div>
    </div>
    <!-- 中部地图和信息展示 -->
    <div class="column">
      <div class="clockinfo">
        <div class="clockinfo-hd">
          <ul>
            <li>电压：{{ BmuInfo.voltage }}</li>
            <li>平均温度：{{ BmuInfo.temperature }}</li>
          </ul>
        </div>
      </div>
      <div class="map"></div>
    </div>
    <div class="column">
      <div class="panel">
        <HistoryTemperature v-model:timer="Timer"></HistoryTemperature>
      </div>
      <div class="panel">
        <VoltagesCompare v-model:voltagestimer="VoltagesTimer"></VoltagesCompare>
      </div>
      <div class="panel">
        <h2>报警提示</h2>
        <div class="chart">
          <WarnInfo />
        </div>
        <div class="panel-footer"></div>
      </div>
    </div>
  </section>
</template>
