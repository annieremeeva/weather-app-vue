<script setup>
import axios from "axios";
import WindCard from "./components/WindCard.vue";
import SunCard from "./components/SunCard.vue";
import Forecast from "./components/Forecast.vue";
import WeatherMain from "./components/WeatherMain.vue";
import { useGeolocation } from "@vueuse/core";
import { watch, ref, computed, onMounted } from "vue";
import { Icon } from "@iconify/vue";
import { weatherIcons } from "./icons";
import WeatherCard from "./components/UI/WeatherCard.vue";
import SearchBar from "./components/SearchBar.vue";
import LoadingElement from "./components/UI/LoadingElement.vue";
import ErrorCard from "./components/UI/ErrorCard.vue";

const apiKey = import.meta.env.VITE_API_KEY;
const timeAPIKey = import.meta.env.VITE_API_KEY_TZ;
const weatherCurrentData = ref({});
const paramCity = ref(undefined);
const isLoading = ref(false);
const isError = ref(false);
const { coords } = useGeolocation();

onMounted(() => {
  setGeolocationCoords();
});

console.log(coords);

const lat = ref();
const lon = ref();

async function setGeolocationCoords() {
  if (coords.value?.latitude !== Infinity) {
    paramCity.value = undefined;
    lat.value = coords.value.latitude;
    lon.value = coords.value.longitude;
    console.log(lat.value, lon.value);
  } else {
    paramCity.value = "Moscow";
    lat.value = undefined;
    lon.value = undefined;
  }
}

watch(
  () => coords.value.latitude,
  () => {
    setGeolocationCoords();
    firstSetup();
  },
  { once: true }
);

const imageSource = ref("./src/assets/images/drizzle.jpg");

function setBackground(weatherCode) {
  if ([300, 301, 302].includes(weatherCode)) {
    imageSource.value = "./src/assets/images/drizzle.jpg";
  } else if ([500, 501, 502, 511, 520, 521, 522].includes(weatherCode)) {
    imageSource.value = "./src/assets/images/rain.jpg";
  } else if ([600, 601, 602, 610, 611, 612, 621, 622, 623].includes(weatherCode)) {
    imageSource.value = "./src/assets/images/snow.jpg";
  } else if ([700, 711, 721, 731, 741, 751].includes(weatherCode)) {
    imageSource.value = "./src/assets/images/fog.jpg";
  } else if ([800, 801].includes(weatherCode)) {
    imageSource.value = "./src/assets/images/sunny.jpg";
  } else if ([802, 803].includes(weatherCode)) {
    imageSource.value = "./src/assets/images/clouds.jpg";
  } else if ([804].includes(weatherCode)) {
    imageSource.value = "./src/assets/images/heavy-clouds.jpg";
  } else if ([200, 201, 202, 230, 231, 232, 233].includes(weatherCode)) {
    imageSource.value = "./src/assets/images/thunder.jpg";
  } else {
    imageSource.value = "./src/assets/images/clouds-undefined.jpg";
  }
}

async function fetchWeatherCurrentData(city, lat, lon) {
  console.log(2);
  try {
    const response = await axios.get("https://api.weatherbit.io/v2.0/current", {
      params: {
        lang: "ru",
        city,
        key: apiKey,
        lat,
        lon,
      },
    });
    return response.data.data[0];
  } catch (e) {
    isError.value = true;
    return e.message;
  }
}

const timeData = ref({});

async function fetchTimeData(time, timeZone) {
  console.log(3);
  try {
    let url = `https://api.ipgeolocation.io/timezone/convert`;

    const response = await axios.get(url, {
      params: {
        tz_from: "UTC",
        tz_to: timeZone,
        time,
        apiKey: timeAPIKey,
      },
    });
    timeData.value = response;
    return response.data;
  } catch (e) {
    isError.value = true;
    console.log(e.message);
    return e.message;
  }
}

function transformSunTime(sunTime, obTime) {
  return obTime.split(" ").slice(0, 1).toString() + " " + sunTime;
}

async function returnSunTime(timeZone) {
  try {
    console.log(4);
    const sunriseTime = transformSunTime(
      weatherCurrentData.value.sunrise,
      weatherCurrentData.value.ob_time
    );
    let sunriseTimeConv = await fetchTimeData(sunriseTime, timeZone);
    sunriseTimeConv = sunriseTimeConv.converted_time;

    const sunsetTime = transformSunTime(
      weatherCurrentData.value.sunset,
      weatherCurrentData.value.ob_time
    );

    let sunsetTimeConv = await fetchTimeData(sunsetTime, timeZone);

    sunsetTimeConv = sunsetTimeConv.converted_time;

    return { sunriseTimeConv, sunsetTimeConv };
  } catch (e) {}
}

let sunTime = ref();

async function setData() {
  console.log(5);
  isLoading.value = true;
  try {
    weatherCurrentData.value = await fetchWeatherCurrentData(paramCity.value, lat, lon);
    sunTime.value = await returnSunTime(weatherCurrentData.value.timezone);
    setBackground(weatherCurrentData.value.weather.code);
  } catch (e) {
    isError.value = true;
    console.log(e.message);
    return e.message;
  } finally {
    isLoading.value = false;
  }
}

async function searchCity(searchedCity) {
  paramCity.value = searchedCity;
  weatherCurrentData.value = await fetchWeatherCurrentData(
    paramCity.value,
    lat.value,
    lon.value
  );
  sunTime.value = await returnSunTime(weatherCurrentData.value.timezone);
  setData();
}

async function firstSetup() {
  console.log(6);
  isLoading.value = true;
  try {
    lat.value = coords.value.latitude;
    lon.value = coords.value.longitude;
    console.log(lat);
    weatherCurrentData.value = await fetchWeatherCurrentData(
      paramCity.value,
      lat.value,
      lon.value
    );
    sunTime.value = await returnSunTime(weatherCurrentData.value.timezone);
    setBackground(weatherCurrentData.value.weather.code);
  } catch (e) {
    isError.value = true;
    return e.message;
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <img src="./assets/images/altBackground.svg" class="background" />

  <SearchBar @search-city="searchCity" class="search-block" />

  <ErrorCard v-if="isError" />

  <div class="weather-display" v-else-if="!isLoading">
    <div class="display-group">
      <WeatherMain
        :city="weatherCurrentData.city_name"
        :temperature="weatherCurrentData.app_temp"
        :weather-description="weatherCurrentData.weather?.description"
        @search-city="searchCity"
        :weather-icon="weatherIcons[weatherCurrentData.weather?.icon]"
        :app-temp="weatherCurrentData.app_temp"
        :pressure="weatherCurrentData.pres"
        :humidity="weatherCurrentData.rh"
      />
      <div class="details-display">
        <WindCard
          :wind-speed="weatherCurrentData.wind_spd"
          :wind-dir="weatherCurrentData.wind_cdir_full"
          :wind-gust="weatherCurrentData.gust"
        />
        <SunCard
          :sunrise="sunTime.sunriseTimeConv"
          :sunset="sunTime.sunsetTimeConv"
          :uv="weatherCurrentData.uv"
        />
      </div>
    </div>
    <Forecast />
  </div>

  <LoadingElement v-else />
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Nunito, Arial;
  font-size: 1rem;
}

button:hover {
  cursor: pointer;
}
body {
  padding: 50px;
  background-color: #b69cff;
  color: white;
}

.search-block {
  margin-inline: auto;
  margin-bottom: 30px;
}

.weather-display {
  display: flex;
  flex-direction: column;
  flex: 2;
  gap: 30px;
}

.display-group {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 30px;
}

.details-display {
  display: flex;
  flex-direction: column;
  gap: 30px;
  flex: 3;
}

h1 {
  background: linear-gradient(to right, #7f209b 5%, #5d3b82 70%, #7f2a5b 100%);
  font-size: 2.5rem;
  background-clip: text;
  color: transparent;
  font-weight: 700;
  text-align: center;
  margin-bottom: 30px;
  text-shadow: 2px 2px 2px #0000005c;
}

h2 {
  font-size: 1.25rem;
}

.background-video,
.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
}

@media (orientation: landscape) {
  .display-group {
    flex-direction: row;
    width: 100%;
  }

  .details-display {
    justify-content: space-between;
  }
}
</style>
