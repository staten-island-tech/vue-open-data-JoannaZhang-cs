<template>
  <div class="container">
    <Area v-for="item in area" :key="item.id" :area="item" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

import Area from "@/components/Area.vue";

const area = ref([]);
async function getHomeless() {
  try {
    const response = await fetch(
      "https://data.cityofnewyork.us/resource/5t4n-d72c.json",
    );
    const data = await response.json();
    area.value = data;
  } catch (error) {
    console.log(error);
  }
}
onMounted(() => {
  getHomeless();
});
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
