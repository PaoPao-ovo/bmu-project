<script setup>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import { useBmuStore } from '@/stores/modules/bmu'
import { GetHistoryVolService } from '@/api/bmu'
</script>

<template>
  <h2>电压变化曲线</h2>
  <div class="chart" id="VoltagesCompare"></div>
  <div class="panel-footer"></div>
</template>
