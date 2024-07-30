<script setup>
import WeatherCard from "./WeatherCard.vue";
</script>

<template>
  <WeatherCard class="error-display">
    <p>Что-то пошло не так</p>
  </WeatherCard>
</template>

<style scoped>
.error-display {
  justify-content: space-around;
  align-self: center;
}
</style>
