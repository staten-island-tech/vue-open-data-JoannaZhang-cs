<template>
  <div class="container">
    <HomelessData
      v-for="(item, index) in homeless"
      :key="index"
      :homeless="item"
      :id="index + 1"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import HomelessData from '../components/HomelessData.vue'

const homeless = ref([])

async function getHomeless() {
  try {
    const response = await fetch('https://data.cityofnewyork.us/resource/5t4n-d72c.json')
    const data = await response.json()
    homeless.value = data
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
