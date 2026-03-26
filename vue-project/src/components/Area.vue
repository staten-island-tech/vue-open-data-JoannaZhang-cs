<template>
  <router-link :to="areaPath" class="card">
    <h2>{{ area.name }}</h2>
  </router-link>
</template>

<script setup>
import { computed } from 'vue'
const { area } = defineProps({
  area: {
    type: Object,
    required: true,
  },
})
const areaPath = computed(() => `/area/${area}`)
</script>

<style scoped>
.card {
  width: 28%;
  height: 500px;
  background-color: aliceblue;
  margin: 30px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  text-transform: uppercase;
}
img {
  width: 100%;
  height: 80%;
  object-fit: cover;
}
</style>