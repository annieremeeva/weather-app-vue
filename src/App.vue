<script setup>
import axios from "axios";
import Humidity from "./components/Humidity.vue";
import Location from "./components/Location.vue";
import TodayHighlights from "./components/TodayHighlights.vue";
import WeatherMain from "./components/WeatherMain.vue";
const apiKey = import.meta.env.VITE_API_KEY;
console.log(import.meta.env);
console.log(apiKey);
async function fetchTimezoneData() {
  const response = await axios.get("http://worldtimeapi.org/api/timezone/Europe/London");
  console.log(response);
}
async function fetchWeatherData() {
  const response = await axios.get("https://api.weatherbit.io/v2.0/current", {
    params: {
      lang: "ru",
      city: "Moscow",
      key: apiKey,
    },
  });
  console.log(response.data);
}
fetchTimezoneData();
fetchWeatherData();
</script>

<template>
  <div>
    <WeatherMain />
    <div>
      <Location />
      <Humidity />
    </div>
  </div>
  <TodayHighlights />
</template>

<style scoped></style>
