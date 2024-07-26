<script setup>
import WeatherCard from "./UI/WeatherCard.vue";
import { Icon } from "@iconify/vue";

const props = defineProps({
  windSpeed: {
    type: Number,
  },
  windGust: {
    type: Number,
  },
  windDir: {
    type: String,
  },
});
</script>

<template>
  <WeatherCard class="wind-card">
    <Icon icon="ph:wind" width="64" height="64" style="color: white" />
    <div>
      <p class="wind-speed">{{ windSpeed }} м/с</p>
      <p>до {{ windGust }} м/с</p>
      <p>{{ windDir }}</p>
    </div>
  </WeatherCard>
</template>

<style scoped>
.wind-card {
  gap: 30px;
  height: 100%;
  align-items: center;
}

.wind-speed {
  font-size: 1.5rem;
  font-weight: 700;
}
</style>
