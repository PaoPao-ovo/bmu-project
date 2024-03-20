<script setup>
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll'
import { useBmuStore } from '@/stores/modules/bmu'
const bmuStore = useBmuStore()
const list = bmuStore.WarnList
</script>

<template>
  <vue3-seamless-scroll :list="list" class="scroll" :step="0.2" :hover="true" :limitScrollNum="8">
    <div class="item" v-for="(item, index) in list" :key="index">
      <span v-show="item.level != ''">{{ item.updatetime }}</span>
      <span v-show="item.level != ''">{{ item.level }}</span>
      <span v-show="item.level != ''">{{ item.content }}</span>
    </div>
  </vue3-seamless-scroll>
</template>

<style scoped>
.scroll {
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.scroll .item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3px 0;
}

span {
  color: aliceblue;
  font-size: 16px;
}
</style>
