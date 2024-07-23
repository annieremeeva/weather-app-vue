<script setup>
import WeatherCard from "./UI/WeatherCard.vue";
import { Icon } from "@iconify/vue";
</script>

<template>
  <WeatherCard class="weather-main">
    <input type="text" placeholder="898" />
    <Icon
      icon="fluent:weather-blowing-snow-20-filled"
      width="100px"
      style="color: white"
    />
    <p>21 C ghjfsbnfkj</p>
  </WeatherCard>
</template>

<style scoped>
.weather-main {
  flex-direction: column;
}
</style>
