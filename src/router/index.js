import { createRouter, createWebHistory } from 'vue-router'
import LayoutMain from '@/view/Layout/LayoutMain.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/bmu',
      name: 'LayoutMain',
      component: LayoutMain
    },
    {
      path: '/',
      name:'LoginMain'
    }
  ]
})

export default router