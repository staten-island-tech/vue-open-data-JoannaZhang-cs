import { createRouter, createWebHistory } from "vue-router";
import Homeless from "@/views/HomelessData.vue";
import SecondChart from "@/views/SecondChart.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Homeless,
    },
    {
      path: "/chart2",
      component: SecondChart,
    },
  ],
});

export default router;
