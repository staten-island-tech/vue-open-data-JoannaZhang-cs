<template>
  <div>
    <h2>{{ homeless?.name || 'Loading...' }}</h2>
    <div v-if="homeless">
      <p><strong>ID:</strong> {{ homeless.id }}</p>
      <p><strong>Year:</strong> {{ homeless.year }}</p>
      <p><strong>Location:</strong> {{ homeless.location }}</p>
      <p><strong>Homeless_Estimates:</strong> {{ homeless.estimates }}</p>

      <!-- Add other fields you need to display -->
    </div>
    <div v-else>
      <p>No data found</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const homeless = ref(null)

async function gethomeless(id) {
  const response = await fetch(`https://data.cityofnewyork.us/resource/5t4n-d72c.json?`)
  const data = await response.json()
  homeless.value = data[0]
}

watch(() => route.params.id, (id) => {
  gethomeless(id)
})

onMounted(() => {
  gethomeless(route.params.id)
})
</script>

<style scoped></style>
