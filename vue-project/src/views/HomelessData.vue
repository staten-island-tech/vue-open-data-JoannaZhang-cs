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

const homeless = ref([])
const chartRef = ref(null)

const getHomeless = async () => {
  try {
    const response = await fetch(`https://data.cityofnewyork.us/resource/5t4n-d72c.json`)    
    const data = await response.json()
    
    new Chart(chartRef.value, {
      type: 'bar',
      data: {
        labels: data.labels,
        datasets: [{
          label: 'Homeless Count',
          data: data.values,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    })
  } catch (error) {
    console.error('error')
  }
}

onMounted(() => {
  getHomeless()
})
</script>

<style scoped></style>