<template>
  <div>
    <h2>{{ 'Homeless Data in NYC' }}</h2>
    <div v-if="homeless">  
      <p>Year: {{ homeless.year }}</p>
      <p>Area: {{ homeless.area }}</p>
      <p>Homeless Estimates: {{ homeless.estimates }}</p>
    </div>
    <div v-else>
      <p>No data found</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const homeless = ref([])

async function getHomeless() {
  const response = await fetch(`https://data.cityofnewyork.us/resource/5t4n-d72c.json`)
  const data = await response.json()
  homeless.value = data
}

onMounted(function() {
  getHomeless()
})
</script>

<style scoped></style>