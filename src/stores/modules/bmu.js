import { defineStore } from 'pinia'
import { ref } from 'vue'
import { TempGetService } from '@/api/bmu'
// 设备ID模块
export const useBmuStore = defineStore('bmu-id', () => {
  const bmu_id = ref(8)
  const BmuTemperatureList = ref([])
  const BmuList = ref([])
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
  }
  return {
    bmu_id,
    BmuTemperatureList,
    BmuList,
    SetBmuTemperatureList
  }
})
