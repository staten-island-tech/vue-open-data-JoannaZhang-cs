<template>
  <div>
    <h2>{{ location.name }}</h2>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const homeless = ref(null)
async function gethomeless(id) {
  console.log('did i run?')
  const response = await fetch(`https://data.cityofnewyork.us/resource/5t4n-d72c.json${id}`)
  const data = await response.json()
  homeless.value = data
}
watch(
  () => route.params.id,
  function (id) {
    gethomeless(id)
  },
)
onMounted(function () {
  gethomeless(route.params.id)
})
</script>

<style scoped></style>
