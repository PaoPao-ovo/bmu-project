<script setup>
import { useBmuStore } from '@/stores/modules/bmu'
import { storeToRefs } from 'pinia'
const bmuStore = useBmuStore()
const { TemperatureTable } = storeToRefs(bmuStore)
</script>

<template>
  <h2>温度数据展示</h2>
  <div class="chart">
    <el-table
      :data="TemperatureTable"
      :show-header="false"
      :cell-style="{ 'text-align': 'left' }"
      style="--el-table-border-color: none; --el-table-bg-color: none; --el-table-tr-bg-color: none"
      class="tablechart"
    >
      <el-table-column prop="key1" label="key1" />
      <el-table-column prop="value1" label="value1" />
      <el-table-column prop="key2" label="key2" />
      <el-table-column prop="value2" label="value2" />
    </el-table>
  </div>
  <div class="panel-footer"></div>
</template>

<style>
.chart .tablechart {
  color: white;
}

.chart .tablechart tr:hover > td {
  background-color: #134d80 !important;
}
</style>
