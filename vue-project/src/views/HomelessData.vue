<template>
  <div>
    <h2>Homeless Data in NYC</h2>
    <div v-if="homeless">
      <!-- <div v-if="homeless.lenth"> -->
      <div v-for="item in homeless" :key="item.year + item.area">
        <p>Year: {{ item.year }}</p>
        <p>Area: {{ item.area }}</p>
        <p>Homeless Estimates: {{ item.estimates }}</p>
      </div>
    </div>
    <div v-else>
      <p>No data found</p>
    </div>
    <canvas ref="chartRef"></canvas>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import Chart from "chart.js/auto";

const homeless = ref([]);
const chartRef = ref(null);

const getHomeless = async () => {
  try {
    const response = await fetch(
      `https://data.cityofnewyork.us/resource/5t4n-d72c.json`,
    );
    const data = await response.json();

    new Chart(chartRef.value, {
      type: "bar",
      data: {
        labels: data.labels,
        datasets: [
          {
            label: "Homeless Count",
            data: data.values,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  } catch (error) {
    console.error("error");
  }
};

onMounted(() => {
  getHomeless();
});
</script>

<style scoped></style>
