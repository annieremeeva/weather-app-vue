<script setup>
import WeatherCard from "./UI/WeatherCard.vue";
import { Icon } from "@iconify/vue";

const props = defineProps({
  lat: {
    required: true,
  },
  long: {
    required: true,
  },
});
</script>

<template>
  <WeatherCard class="location-card">
    <Icon icon="ph:compass-rose" width="64" height="64" style="color: white" />
    <div>
      <div class="coords">
        <h2>Широта:</h2>
        <h2>{{ lat }}</h2>
      </div>
      <div class="coords">
        <h2>Долгота:</h2>
        <h2>{{ long }}</h2>
      </div>
    </div>
  </WeatherCard>
</template>

<style scoped>
.location-card {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 30px;
}

.coords {
  display: flex;
  flex-direction: column;
}

@media (orientation: landscape) {
  .coords {
    flex-direction: row;
    gap: 10px;
  }
}
</style>
