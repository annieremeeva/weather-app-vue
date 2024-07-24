<script setup>
import WeatherCard from "./UI/WeatherCard.vue";
import { Icon } from "@iconify/vue";

const props = defineProps({
  humidity: {
    type: Number,
  },
});
</script>

<template>
  <WeatherCard class="humidity-card">
    <Icon icon="uil:raindrops-alt" width="64" height="64" style="color: white" />
    <div class="humidity">
      <h2>Влажность</h2>
      <p>{{ humidity }}%</p>
    </div>
  </WeatherCard>
</template>

<style scoped>
.humidity-card {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 30px;
}

.humidity {
  display: flex;
  flex-direction: column;
}

p {
  font-size: 2rem;
  align-self: center;
}
</style>
