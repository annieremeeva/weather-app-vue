<script setup>
import WindCard from "./components/WindCard.vue";
import SunCard from "./components/SunCard.vue";
import Forecast from "./components/Forecast.vue";
import WeatherMain from "./components/WeatherMain.vue";
import { useGeolocation } from "@vueuse/core";
import { watch, ref, reactive } from "vue";
import { weatherIcons } from "./icons.js";
import SearchBar from "./components/SearchBar.vue";
import LoadingElement from "./components/UI/LoadingElement.vue";
import ErrorCard from "./components/UI/ErrorCard.vue";
import {
  addUIDToDays,
  fetchTimeData,
  fetchWeatherForecast,
  fetchWeatherCurrentData,
} from "./functions";

const weatherCurrentData = ref();
const paramCity = ref(undefined);
const isLoading = ref(false);
const isError = ref(false);
const { coords, error } = useGeolocation();
const lat = ref();
const lon = ref();

isLoading.value = true;
setGeolocationCoords();
firstSetup();

if (error.message) {
  paramCity.value = "Moscow";
  lat.value = undefined;
  lon.value = undefined;
  firstSetup();
}

async function setGeolocationCoords() {
  if (coords.value.latitude !== Infinity) {
    paramCity.value = undefined;
    lat.value = coords.value.latitude;
    lon.value = coords.value.longitude;
  } else {
    paramCity.value = "Moscow";
    lat.value = undefined;
    lon.value = undefined;
  }
}

let count = 0;

watch(
  () => coords.value.latitude,
  () => {
    setGeolocationCoords();
    setData();
    count++;
  }
);

const forecastDays = ref();

function transformSunTime(sunTime, obTime) {
  return obTime.split(" ").slice(0, 1).toString() + " " + sunTime;
}

async function returnSunTime(timeZone) {
  try {
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
  } catch (e) {
    isError.value = true;
    return e.message;
  }
}

const sunTime = ref();

async function setData() {
  try {
    weatherCurrentData.value = await fetchWeatherCurrentData(
      paramCity.value,
      lat.value,
      lon.value
    );
    sunTime.value = await returnSunTime(weatherCurrentData.value.timezone);
    forecastDays.value = await fetchWeatherForecast(
      paramCity.value,
      lat.value,
      lon.value
    );
    forecastDays.value = addUIDToDays(forecastDays.value);
  } catch (e) {
    isError.value = true;
    return e.message;
  } finally {
    isLoading.value = false;
  }
}

const searchedCityParent = ref();

async function searchCity() {
  paramCity.value = searchedCityParent.value;
  lat.value = undefined;
  lon.value = undefined;
  weatherCurrentData.value = await fetchWeatherCurrentData(
    paramCity.value,
    lat.value,
    lon.value
  );
  sunTime.value = await returnSunTime(weatherCurrentData.value.timezone);
  setData();
  searchedCityParent.value = "";
}

async function firstSetup() {
  isLoading.value = true;
  try {
    weatherCurrentData.value = await fetchWeatherCurrentData(
      paramCity.value,
      lat.value,
      lon.value
    );
    sunTime.value = await returnSunTime(weatherCurrentData.value.timezone);
    forecastDays.value = await fetchWeatherForecast(
      paramCity.value,
      lat.value,
      lon.value
    );
    forecastDays.value = addUIDToDays(forecastDays.value);
  } catch (e) {
    isError.value = true;
    return e.message;
  } finally {
    isLoading.value = false;
  }
}

async function resetGeolocation() {
  if (coords.value.latitude !== Infinity) {
    paramCity.value = undefined;
    lat.value = coords.value.latitude;
    lon.value = coords.value.longitude;
  }
  setData();
}
</script>

<template>
  <img src="./assets/images/altBackground.svg" class="background" />

  <SearchBar
    v-model="searchedCityParent"
    @search-city="searchCity"
    @reset-geolocation="resetGeolocation"
    class="search-block"
  />

  <ErrorCard v-if="isError" />

  <div class="weather-display" v-else-if="!isLoading">
    <div class="display-group">
      <WeatherMain
        :city="weatherCurrentData.city_name"
        :temperature="weatherCurrentData.app_temp"
        :weather-description="weatherCurrentData.weather?.description"
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
    <Forecast :forecast-days="forecastDays" />
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
  padding: 20px;
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
  gap: 20px;
}

.display-group {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
}

.details-display {
  display: flex;
  flex-direction: column;
  gap: 20px;
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
  body {
    padding: 50px;
  }
  .display-group {
    flex-direction: row;
    width: 100%;
  }

  .details-display {
    justify-content: space-between;
  }
}
</style>
