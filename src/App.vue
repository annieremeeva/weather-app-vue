<script setup>
import axios from "axios";
import Humidity from "./components/Humidity.vue";
import Location from "./components/Location.vue";
import TodayHighlights from "./components/TodayHighlights.vue";
import WeatherMain from "./components/WeatherMain.vue";
import { Icon } from "@iconify/vue";
import { useGeolocation } from "@vueuse/core";
import { watch, onMounted, ref } from "vue";

const { coords, locatedAt, error, resume, pause } = useGeolocation();

onMounted(() => {
  setGeolocationCoords();
});

let userCoordinates = ref({});

const setGeolocationCoords = async () => {
  if (coords.value?.latitude !== Infinity) {
    userCoordinates.value.latitude = coords.value.latitude;
    userCoordinates.value.longitude = coords.value.longitude;

    console.log(coords.value.latitude, coords.value.longitude);
  }
};

watch(
  () => coords.value.latitude,
  () => {
    setGeolocationCoords();
    fetchTimezoneData();
    fetchWeatherData();
  }
);

const apiKey = import.meta.env.VITE_API_KEY;

const weatherIcons = {
  a01d: "material-symbols:mist",
  a01n: "material-symbols:mist",
  a02d: "fluent:weather-fog-20-regular",
  a02n: "fluent:weather-fog-20-regular",
  a03d: "fluent:weather-fog-20-regular",
  a03n: "fluent:weather-fog-20-regular",
  a04d: "fluent:weather-fog-20-regular",
  a04n: "fluent:weather-fog-20-regular",
  a05d: "fluent:weather-fog-20-regular",
  a05n: "fluent:weather-fog-20-regular",
  a06d: "fluent:weather-fog-20-regular",
  a06n: "fluent:weather-fog-20-regular",
  c01d: "fluent:weather-sunny-16-regular",
  c01n: "fluent:weather-moon-16-regular",
  c02d: "fluent:weather-partly-cloudy-day-16-regular",
  c02n: "fluent:weather-partly-cloudy-night-24-regular",
  c03d: "fluent:weather-partly-cloudy-day-16-regular",
  c04d: "fluent:weather-cloudy-24-regular",
  c04n: "fluent:weather-cloudy-24-regular",
  d01d: "fluent:weather-drizzle-20-regular",
  d01n: "fluent:weather-drizzle-20-regular",
  d02d: "fluent:weather-drizzle-20-regular",
  d02n: "fluent:weather-drizzle-20-regular",
  d03d: "fluent:weather-drizzle-20-regular",
  d03n: "fluent:weather-drizzle-20-regular",
  f01d: "fluent:weather-rain-snow-20-regular",
  f01n: "fluent:weather-rain-snow-20-regular",
  r01d: "fluent:weather-rain-20-regular",
  r01n: "fluent:weather-rain-20-regular",
  r02d: "fluent:weather-rain-20-regular",
  r02n: "fluent:weather-rain-20-regular",
  r03d: "fluent:weather-rain-20-regular",
  r03n: "fluent:weather-rain-20-regular",
  r04d: "fluent:weather-rain-showers-day-20-regular",
  r04n: "fluent:weather-rain-shower-night-20-regular",
  r05d: "fluent:weather-rain-showers-day-20-regular",
  r05n: "fluent:weather-rain-shower-night-20-regular",
  r06d: "fluent:weather-rain-showers-day-20-regular",
  r06n: "fluent:weather-rain-shower-night-20-regular",
  s01d: "fluent:weather-snow-shower-day-20-regular",
  s01n: "fluent:weather-snow-shower-night-20-regular",
  s02d: "fluent:weather-snow-20-regular",
  s02n: "fluent:weather-snow-20-regular",
  s03d: "fluent:weather-snow-20-regular",
  s03n: "fluent:weather-snow-20-regular",
  s04d: "fluent:weather-rain-snow-20-regular",
  s04n: "fluent:weather-rain-snow-20-regular",
  s05d: "fluent:weather-blowing-snow-20-regular",
  s05n: "fluent:weather-blowing-snow-20-regular",
  s06d: "fluent:weather-snow-20-regular",
  s06n: "fluent:weather-snow-20-regular",
  t01d: "fluent:weather-thunderstorm-20-regular",
  t01n: "fluent:weather-thunderstorm-20-regular",
  t02d: "fluent:weather-thunderstorm-20-regular",
  t02n: "fluent:weather-thunderstorm-20-regular",
  t03d: "fluent:weather-thunderstorm-20-regular",
  t03n: "fluent:weather-thunderstorm-20-regular",
  t04d: "fluent:weather-thunderstorm-20-regular",
  t04n: "fluent:weather-thunderstorm-20-regular",
  t05d: "fluent:weather-thunderstorm-20-regular",
  t05n: "fluent:weather-thunderstorm-20-regular",
};

let weatherData;

let loadingError = false;
let city;

async function fetchTimezoneData() {
  const response = await axios.get("http://worldtimeapi.org/api/timezone/Europe/London");
}
async function fetchWeatherData() {
  try {
    const response = await axios.get("https://api.weatherbit.io/v2.0/current", {
      params: {
        lang: "ru",
        city,
        key: apiKey,
        lat: userCoordinates.value.latitude,
        lon: userCoordinates.value.longitude,
      },
    });
    console.log(response.data);
  } catch (e) {
    console.log(e.message);
  }
}
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
  <p>{{ userCoordinates }}</p>

  <Icon :icon="weatherIcons.c01d" />
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  color: white;
  font-family: Nunito, Arial;
}
</style>
