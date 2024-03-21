import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  TempGetService,
  GetHistoryTempService,
  GetHistoryVolService,
  AlarmGetService
} from '@/api/bmu'

// 设备ID模块
export const useBmuStore = defineStore('bmu-id', () => {
  // 设备的ID
  const bmu_id = ref(8)
  // 设备温度数组
  const BmuTemperatureList = ref([])
  const BmuList = ref([])
  // 系统信息数据
  const TemperatureTable = ref([
    {
      key1: '最高温度',
      value1: null,
      key2: '编号',
      value2: null
    },
    {
      key1: '最低温度',
      value1: null,
      key2: '编号',
      value2: null
    },
    {
      key1: '平均温度',
      value1: null,
      key2: '温度极差',
      value2: null
    }
  ])
  // 历史温度数据
  const HistoryTemperatureTable = ref({
    temperature: [],
    xAxis: []
  })
  // 历史电压数据
  const HistoryVoltageTable = ref({
    voltage: [],
    timedata: []
  })

  const WarnList = ref([])
  const SetBmuTemperatureList = async () => {
    const res = await TempGetService(bmu_id.value)
    let index = 0
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 5; j++) {
        BmuTemperatureList.value[index] = [i, j]
        index++
      }
    }
    for (let i = 0; i < BmuTemperatureList.value.length; i++) {
      BmuTemperatureList.value[i][2] = res.data.temperature[i]
    }
    for (let i = 0; i < res.data.temperature.length; i++) {
      BmuList.value[i] = res.data.temperature[i]
    }
    TemperatureTable.value[0].value1 = res.data['max_temperature'] + ' °C'
    TemperatureTable.value[0].value2 = res.data['max_temperature_id'] + ' 号'
    TemperatureTable.value[1].value1 = res.data['min_temperature'] + ' °C'
    TemperatureTable.value[1].value2 = res.data['min_temperature_id'] + ' 号'
    TemperatureTable.value[2].value1 = res.data['average_of_temperature'] + ' °C'
    TemperatureTable.value[2].value2 = res.data['range_of_temperature'] + ' °C'
  }
  const SetHistoryTemperatureTable = async (daytime) => {
    const res = await GetHistoryTempService(bmu_id.value, daytime)
    if (res.data.timedata === null) {
      HistoryTemperatureTable.value.xAxis = []
      HistoryTemperatureTable.value.temperature = []
    } else {
      for (let i = 0; i < res.data.temperature.length; i++) {
        HistoryTemperatureTable.value.temperature[i] = res.data.temperature[i]
      }
      for (let i = 0; i < res.data.timedata.length; i++) {
        HistoryTemperatureTable.value.xAxis[i] = res.data.timedata[i]
      }
    }
  }
  // 设置历史电压数据
  const SetBmuHistoryTemperatureList = async (daytime) => {
    const res = await GetHistoryVolService(bmu_id.value, daytime)
    if (res.data.voltage === null) {
      HistoryVoltageTable.value.voltage = []
    }
    else {
      for (let i = 0; i < res.data.voltage.length; i++) {
        HistoryVoltageTable.value.voltage[i] = res.data.voltage[i] / 1000
      }
      for (let i = 0; i < res.data.timedata.length; i++) {
        HistoryVoltageTable.value.timedata[i] = res.data.timedata[i]
      }
    }
  }
  // 设置报警信息数据
  const SetWarnList = async () => {
    const res = await AlarmGetService(bmu_id.value)
    if (res.data.msg === "fault") {
      WarnList.value = []
    }
    for (let i = 0; i < res.data.alarm.length; i++) {
      WarnList.value[i] = res.data.alarm[i]
    }
  }
  return {
    bmu_id,
    BmuTemperatureList,
    BmuList,
    TemperatureTable,
    HistoryTemperatureTable,
    HistoryVoltageTable,
    WarnList,
    SetBmuTemperatureList,
    SetHistoryTemperatureTable,
    SetBmuHistoryTemperatureList,
    SetWarnList
  }
})
