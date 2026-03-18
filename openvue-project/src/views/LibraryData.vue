<template>
  <div>
    <h2>{{ library.name }}</h2>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const library = ref(null)
async function getLibrary(id) {
  console.log('did i run?')
  const response = await fetch(`https://data.cityofnewyork.us/resource/5t4n-d72c.json?id=${id}`)
  const data = await response.json()
  library.value = data
}
watch(
  () => route.params.id,
  function (id) {
    getLibrary(id)
  },
)
onMounted(function () {
  getLibrary(route.params.id)
})
</script>

<style scoped></style>
