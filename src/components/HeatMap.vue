<script setup>
import * as echarts from 'echarts';
import { useBmuStore } from '@/stores/modules/bmu';
import { onMounted} from 'vue';
const bmuStore = useBmuStore();
const TempGet = () => {
  const data = [];
  console.log(bmuStore.BmuTemperatureList);
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 5; j++) {
      data.push([i, j])
    }
  }
  for (let i = 0; i < bmuStore.BmuTemperatureList.length; i++) {
    data[i][2] = bmuStore.BmuTemperatureList[i]
  }
  return data;
}

onMounted( () => {  
  const xAxisData = ['1', '6', '11', '16', '21', '26', '31', '36', '41', '46']
  const yAxisData = ['1', '2', '3', '4', '5']
  const HeatMap = echarts.init(document.getElementById('HeatMap'));
  const data = TempGet();
  setInterval(()=>{
    TempGet()
  },1000)
  const options = {
    color: ['#00f2f1'],
    tooltip: {
      position: 'top',
      formatter: function (params) {
        return (
          params.marker +
          (params.dataIndex + 1) +
          '#' +
          '<br>' +
          '温度' +
          ' : ' +
          params.value[2] +
          '℃'
        )
      }
    },
    grid: {
      left: '0%',
      top: '0%',
      right: '0%',
      bottom: '4%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: xAxisData,
    },
    yAxis: {
      type: 'category',
      data: yAxisData,
    },
    visualMap: {
      show:false,
      min: 5,
      max: 65,
      calculable: true,
      orient: 'horizontal',
      left: '10%',
      top: '2%',
      inRange: {
        color: [
          '#313695',
          '#4575b4',
          '#74add1',
          '#abd9e9',
          '#e0f3f8',
          '#ffffbf',
          '#fee090',
          '#fdae61',
          '#f46d43',
          '#d73027',
          '#a50026'
        ]
      }
    },
    series: [
      {
        data: data,
        name: 'heatmap',
        type: 'heatmap',
        label: {
          show: true
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
  HeatMap.setOption(options);
  window.addEventListener('resize', function () {
    HeatMap.resize()
  })
})
</script>

<template>
  <div>
    <h2>热力图</h2>
    <div class="chart" id="HeatMap"></div>
    <div class="panel-footer"></div>
  </div>
</template>
