<script setup>
import WeatherCard from "./WeatherCard.vue";

const props = defineProps({
  message,
});
</script>

<template>
  <WeatherCard class="error-display">
    <p>Что-то пошло не так {{ message }}</p>
  </WeatherCard>
</template>

<style scoped>
.error-display {
  justify-content: space-around;
  align-self: center;
}
</style>
