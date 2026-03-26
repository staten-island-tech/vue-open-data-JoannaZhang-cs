<template>
  <div class="container">
    <Area v-for="area in HomelessData" :key="area.name" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

import Area from '@/components/Area.vue'
import HomelessData from './HomelessData.vue'
const area = ref([])
async function getHomeless() {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0')
    const data = await response.json()
    area.value = data.results
  } catch (error) {
    console.log(error)
  }
}
onMounted(() => {
  getHomeless()
})
</script>

<style scoped>
.container {
  width: 80vw;
  margin: 30px auto;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}
</style>
