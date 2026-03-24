import { createRouter, createWebHistory } from 'vue-router'
import Homeless from '@/views/HomelessData.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Homeless,
    },
    {
      path: '/location/:name',
      name: 'location',
      component: LocationView,
      props: true,
    },
  ],
})

export default router