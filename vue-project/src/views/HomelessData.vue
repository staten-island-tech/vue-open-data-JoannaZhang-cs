<template>
  <div>
    <h2>{{ homeless?.name || 'Loading' }}</h2>
    <div v-if="homeless">
      <p><strong>Year:</strong> {{ homeless.year }}</p>
      <p><strong>Location:</strong> {{ homeless.location }}</p>
      <p><strong>Homeless_Estimates:</strong> {{ homeless.estimates }}</p>
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
const homeless = ref(null)

async function gethomeless() {
  const response = await fetch(`https://data.cityofnewyork.us/resource/5t4n-d72c.json`)
  const data = await response.json()

  const name = route.params.name
  homeless.value = data.find((item) => item.location?.toLowerCase() === name?.toLowerCase()) || null
}

onMounted(() => {
  gethomeless()
})
</script>

<style scoped></style>