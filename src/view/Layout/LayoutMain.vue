<script setup>
import TempertureSp from '@/components/TempertureSp.vue'
import HeatMap from '@/components/HeatMap.vue'
import { useBmuStore } from '@/stores/modules/bmu'
const bmuStore = useBmuStore()
bmuStore.SetBmuTemperatureList()
setInterval(() => {
  bmuStore.SetBmuTemperatureList()
}, 1000)
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
        <h2>温度数据展示</h2>
        <div class="chart"></div>
        <div class="panel-footer"></div>
      </div>
    </div>
    <!-- 中部地图和信息展示 -->
    <div class="column">
      <div class="clockinfo">
        <div class="clockinfo-hd">
          <ul>
            <li>电压：</li>
            <li>平均温度：</li>
          </ul>
        </div>
      </div>
      <div class="map"></div>
    </div>
    <div class="column">
      <div class="panel">
        <h2>昨日温度变化曲线</h2>
        <div class="chart"></div>
        <div class="panel-footer"></div>
      </div>
      <div class="panel">
        <h2>历史电压</h2>
        <div class="chart"></div>
        <div class="panel-footer"></div>
      </div>
      <div class="panel">
        <h2>报警提示</h2>
        <div class="chart"></div>
        <div class="panel-footer"></div>
      </div>
    </div>
  </section>
</template>
