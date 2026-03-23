<template>
  <div>
    <h1>Location Page</h1>
    <p>Name: {{ name }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  name: String,
})
</script>

<style scoped></style>
