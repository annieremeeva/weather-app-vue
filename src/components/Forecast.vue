<script setup>
import WeatherCard from "./UI/WeatherCard.vue";
import WeatherInnerCard from "./UI/WeatherInnerCard.vue";
import { Icon } from "@iconify/vue";

const props = defineProps({
  windSpeed: {
    type: Number,
  },
  windDir: {
    type: String,
  },
  windGust: {
    type: Number,
  },
  uv: {
    type: Number,
  },

  pressure: {
    type: Number,
  },
  sunrise: {
    type: String,
  },
  sunset: {
    type: String,
  },
});
</script>

<template>
  <WeatherCard class="forecast"> </WeatherCard>
</template>

<style scoped></style>
