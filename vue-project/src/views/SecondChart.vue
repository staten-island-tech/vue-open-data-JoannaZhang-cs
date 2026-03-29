<template>
  <div>
    <h2>Homeless Data in NYC</h2>
    <select v-model="selectedArea">
      <option value="all">All Locations</option>
      <option value="Surface Area - Manhattan">Manhattan</option>
      <option value="Surface Area - Brooklyn">Brooklyn</option>
      <option value="Surface Area - Queens">Queens</option>
      <option value="Surface Area - Bronx">Bronx</option>
      <option value="Surface Area - Staten Island">Staten Island</option>
      <option value="Subways">Subways</option>
      <option value="Surface Total">Total Surface</option>
    </select>
    <p v-if="error">{{ error }}</p>

    <div v-if="homeless">
      <!-- <div v-if="homeless.length"> -->
      <div v-for="item in filteredData" :key="item.year">
        <p>Year: {{ item.year }}</p>
        <p>Area: {{ item.area }}</p>
        <p>Homeless Estimates: {{ item.homeless_estimates }}</p>
      </div>
    </div>
    <div v-else>
      <p>No data found</p>
    </div>
    <canvas ref="chartRef"></canvas>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import Chart from "chart.js/auto";

const homeless = ref([]);
const chartRef = ref();
const error = ref("");
const selectedArea = ref("all");

const filteredData = computed(() => {
  return homeless.value.filter((item) => {
    const matchYear = item.year === "2012"; // or make this dynamic later
    const matchArea =
      selectedArea.value === "all" || item.area.trim() === selectedArea.value;

    return matchYear && matchArea;
  });
});

const getHomeless = async () => {
  try {
    const response = await fetch(
      `https://data.cityofnewyork.us/resource/5t4n-d72c.json`,
    );
    const data = await response.json();

    const filtered = filteredData.value;
    const points = filtered.map((item) => ({
      x: item.area.trim(), // remove trailing space
      y: Number(item.homeless_estimates),
    }));

    console.log(data[0]);
    homeless.value = data;

    const colors = filtered.map((item) => {
      const area = item.area.trim(); // removes trailing space behind location name in api data
      switch (area) {
        case "Surface Area - Manhattan":
          return "rgba(255, 99, 132, 0.5)";
        case "Surface Area - Brooklyn":
          return "rgba(54, 162, 235, 0.5)";
        case "Surface Area - Queens":
          return "rgba(255, 206, 86, 0.5)";
        case "Surface Area - Bronx":
          return "rgba(75, 192, 192, 0.5)";
        case "Surface Area - Staten Island":
          return "rgba(153, 102, 255, 0.5)";
        case "Subways":
          return "gray";
        case "Surface Total":
          return "black";
        case "Total Unsheltered Individuals":
          return "brown";
        default:
          return "pink";
      }
    });
    new Chart(chartRef.value, {
      type: "scatter",
      data: {
        datasets: [
          {
            label: "Homeless Estimates",
            data: points,
            backgroundColor: colors,
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: "category",
            title: {
              display: true,
              text: "Area",
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Homeless Estimates",
            },
          },
        },
      },
    });
  } catch (error) {
    console.error("error");
    error.value = "failed to load data";
  }
};

onMounted(() => {
  getHomeless();
});
</script>

<style scoped></style>
