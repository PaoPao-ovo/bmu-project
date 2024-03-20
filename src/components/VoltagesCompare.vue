<script setup>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import { useBmuStore } from '@/stores/modules/bmu'
import { GetHistoryVolService } from '@/api/bmu'


const bmuStore = useBmuStore()

const options = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    },
    confine: true,
    enterable: true,
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
    min:10,
    max:30
  },
  series:[{
    name:'电压',
    type:'line',
  }]
}

onMounted(() => {
  
})
</script>

<template>
  <h2>电压变化曲线</h2>
  <div class="chart" id="VoltagesCompare"></div>
  <div class="panel-footer"></div>
</template>
