import { defineStore } from 'pinia'
import { ref } from 'vue'
import { TempGetService } from '@/api/bmu'
// 设备ID模块
export const useBmuStore = defineStore('bmu-id', () => {
  const bmu_id = ref(8)
  const BmuTemperatureList = ref([])
  const SetBmuTemperatureList = async () => {
    const res = await TempGetService(bmu_id.value);
    BmuTemperatureList.value = res.data.temperature;
  }
  const SetBmuid = (id) => {
    bmu_id.value = id;
  }
  const GetBmuTemperatureList = () => {
    return BmuTemperatureList.value;
  }
  return {
    bmu_id,
    BmuTemperatureList,
    SetBmuTemperatureList,
    SetBmuid,
    GetBmuTemperatureList
  }
})