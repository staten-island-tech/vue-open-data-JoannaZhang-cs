<template>
  <div>
    <h2>Homeless Data in NYC</h2>
    <select v-model="selectedYear">
      <option value="2012">2012</option>
      <option value="2011">2011</option>
    </select>
    <p v-if="error">{{ error }}</p>
    <div v-if="homeless">
      <div v-for="item in filteredData" :key="item.year">
        <p>Year: {{ item.year }}</p>
        <p>Area: {{ item.area }}</p>
        <p>Homeless Estimates: {{ item.homeless_estimates }}</p>
      </div>
    </div>
    <div v-else>
      <p>No data found</p>
    </div>
    <RouterLink to="/chart2">View Chart Filtered by Location</RouterLink>

    <canvas ref="chartRef"></canvas>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import Chart from "chart.js/auto";

const homeless = ref([]);
const chartRef = ref();
const error = ref();
const selectedYear = ref("2012");

const filteredData = computed(() => {
  //depends on homeless and selected yr so must be near top of script setup
  return homeless.value.filter((item) => item.year === selectedYear.value);
});

const getHomeless = async () => {
  try {
    const response = await fetch(
      `https://data.cityofnewyork.us/resource/5t4n-d72c.json`,
    );
    const data = await response.json();

    console.log(data[0]);
    homeless.value = data;

    const labels = data.slice(0, 10).map((item) => item.year);
    const values = data
      .slice(0, 10)
      .map((item) => Number(item.homeless_estimates));

    const colors = data.slice(0, 10).map((item) => {
      switch (item.area) {
        case "Surface Area - Manhattan ":
          return "rgba(255, 99, 132, 0.5)";
        case "Surface Area - Brooklyn ":
          return "rgba(54, 162, 235, 0.5)";
        case "Surface Area - Queens ":
          return "rgba(255, 206, 86, 0.5)";
        case "Surface Area - Bronx ":
          return "rgba(75, 192, 192, 0.5)";
        case "Surface Area - Staten Island ":
          return "rgba(153, 102, 255, 0.5)";
        case "Subways ":
          return "gray";
        case "Surface Total ":
          return "black";
        case "Total Unsheltered Individuals ":
          return "brown";
        default:
          return "pink";
      }
    });
    new Chart(chartRef.value, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Homeless Count",
            data: values,
            backgroundColor: colors,
          },
        ],
      },
      options: {
        scales: {
          y: {
            min: 0,
            max: 5000,
          },
        },
      },
      responsive: true,
      maintainAspectRatio: false,
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
