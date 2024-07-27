<script setup>
import WeatherCard from "./UI/WeatherCard.vue";
import WeatherInnerCard from "./UI/WeatherInnerCard.vue";
import { Icon } from "@iconify/vue";

const props = defineProps({});
</script>

<template>
  <WeatherCard class="forecast">
    <WeatherInnerCard></WeatherInnerCard>
  </WeatherCard>
</template>

<style scoped></style>
