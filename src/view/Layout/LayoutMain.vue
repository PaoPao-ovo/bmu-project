<script setup>
import TempertureSp from '@/components/BMU/TempertureSp.vue'
import HeatMap from '@/components/BMU/HeatMap.vue'
import TemperatureTable from '@/components/BMU/TemperatureTable.vue'
import HistoryTemperature from '@/components/BMU/HistoryTemperature.vue'
import VoltagesCompare from '@/components/BMU/VoltagesCompare.vue'
import WarnInfo from '@/components/BMU/WarnInfo.vue'
import { useBmuStore } from '@/stores/modules/bmu'
import { onBeforeUnmount, ref, computed, watch } from 'vue'
import { TodayDateFormate } from '@/utils/daytime'
import { VolGetService } from '@/api/bmu'

const ClusterValue = ref('')

const ClusterOptions = [
  {
    value: '1',
    label: '1号电池簇'
  },
  {
    value: '2',
    label: '2号电池簇'
  },
  {
    value: '3',
    label: '3号电池簇'
  },
  {
    value: '4',
    label: '4号电池簇'
  }
]

const CellOptions = []

for (let i = 0; i < 50; i++) {
  CellOptions.push({
    value: `${i + 1}`,
    label: `${i + 1}号电池`
  })
}

const CellValue = ref('')

const bmuStore = useBmuStore()

const SelData = () => {
  if (bmuStore.bmu_id <= 50) {
    ClusterValue.value = {
      value: 1,
      label: '1号电池簇'
    }
  } else if (bmuStore.bmu_id > 50 && bmuStore.bmu_id <= 100) {
    ClusterValue.value = {
      value: 2,
      label: '2号电池簇'
    }
  } else if (bmuStore.bmu_id > 100 && bmuStore.bmu_id <= 150) {
    ClusterValue.value = {
      value: 3,
      label: '3号电池簇'
    }
  } else {
    ClusterValue.value = {
      value: 4,
      label: '4号电池簇'
    }
  }

  if (bmuStore.bmu_id <= 50) {
    CellValue.value = {
      value: bmuStore.bmu_id,
      label: `${bmuStore.bmu_id}号电池`
    }
  } else if (bmuStore.bmu_id > 50 && bmuStore.bmu_id <= 100) {
    CellValue.value = {
      value: bmuStore.bmu_id - 50,
      label: `${bmuStore.bmu_id - 50}号电池`
    }
  } else if (bmuStore.bmu_id > 100 && bmuStore.bmu_id <= 150) {
    CellValue.value = {
      value: bmuStore.bmu_id - 100,
      label: `${bmuStore.bmu_id - 100}号电池`
    }
  } else {
    CellValue.value = {
      value: bmuStore.bmu_id - 150,
      label: `${bmuStore.bmu_id - 150}号电池`
    }
  }
}

SelData()

// 初始化数据
const InitData = async () => {
  await bmuStore.SetBmuTemperatureList()
  await bmuStore.SetHistoryTemperatureTable(TodayDateFormate())
  await bmuStore.SetBmuHistoryTemperatureList(TodayDateFormate())
  await bmuStore.SetWarnList()

  const voltageRes = await VolGetService(bmuStore.bmu_id)
  BmuInfo.value.voltage = voltageRes.data.voltage / 1000 + ' V'
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
  voltage: null,
  temperature: null
})

// BMU数据定时更新
setInterval(async () => {
  const voltageRes = await VolGetService(bmuStore.bmu_id)
  BmuInfo.value.voltage = voltageRes.data.voltage / 1000 + ' V'
  BmuInfo.value.temperature = bmuStore.TemperatureTable[2].value1
}, 5000)

const IdTable = ref({
  ClusterId: 1,
  CellId: 8
})

const TempId = computed(() => {
  return +(IdTable.value.ClusterId - 1) * 50 + +IdTable.value.CellId
})
const ClusteridChange = (ClusterVal) => {
  IdTable.value.ClusterId = ClusterVal
}

const CellidChange = (CellVal) => {
  IdTable.value.CellId = CellVal
}

// 当ID变化后，刷新数据
watch(TempId, async (newVal) => {
  bmuStore.bmu_id = newVal
  await bmuStore.SetBmuHistoryTemperatureList(TodayDateFormate())
  await bmuStore.SetWarnList()
  await bmuStore.SetHistoryTemperatureTable(TodayDateFormate())
})
</script>

<template>
  <!-- 页面头部 -->
  <div id="mainlayout">
    <header>
    <div class="header-select">
      <el-select v-model="ClusterValue" placeholder="选择电池簇" @change="ClusteridChange">
        <el-option
          v-for="item in ClusterOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div class="body-select">
      <el-select v-model="CellValue" placeholder="选择电池" @change="CellidChange">
        <el-option
          v-for="item in CellOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <h1>{{ TempId }}号电池数据展示大屏</h1>
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
  </div>

</template>

<style scoped>
.header-select {
  position: absolute;
  width: 1.5rem;
  left: 0.1rem;
  top: 0.1rem;
}

.body-select {
  position: absolute;
  width: 1.5rem;
  left: 1.7rem;
  top: 0.1rem;
}
</style>
