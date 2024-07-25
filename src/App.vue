<script setup>
import axios from "axios";
import HumidityCard from "./components/HumidityCard.vue";
import LocationCard from "./components/LocationCard.vue";
import TodayHighlights from "./components/TodayHighlights.vue";
import WeatherMain from "./components/WeatherMain.vue";
import { useGeolocation } from "@vueuse/core";
import { watch, onMounted, ref, computed } from "vue";
import { weatherIcons } from "./icons";

const apiKey = import.meta.env.VITE_API_KEY;
const timeAPIKey = import.meta.env.VITE_API_KEY_TZ;

const { coords } = useGeolocation();

let weatherData = ref({});

let paramCity = ref(undefined);

let videoSource = ref("");

let lat;
let lon;

function setVideoBackground(weatherCode) {
  if ([300, 301, 302].includes(weatherCode)) {
    videoSource.value = "./src/assets/videos/drizzle1.mp4";
  } else if ([500, 501, 502, 511, 520, 521, 522].includes(weatherCode)) {
    videoSource.value = "./src/assets/videos/rain1.mp4";
  } else if ([600, 601, 602, 610, 611, 612, 621, 622, 623].includes(weatherCode)) {
    videoSource.value = "./src/assets/videos/snow1.mp4";
  } else if ([700, 711, 721, 731, 741, 751].includes(weatherCode)) {
    videoSource.value = "./src/assets/videos/fog1.mp4";
  } else if ([800, 801].includes(weatherCode)) {
    videoSource.value = "./src/assets/videos/sunny1.mp4";
  } else if ([802, 803].includes(weatherCode)) {
    videoSource.value = "./src/assets/videos/clouds1.mp4";
  } else if ([804].includes(weatherCode)) {
    videoSource.value = "./src/assets/videos/heavy-clouds1.mp4";
  } else if ([200, 201, 202, 230, 231, 232, 233].includes(weatherCode)) {
    videoSource.value = "./src/assets/videos/thunder1.mp4";
  } else {
    videoSource.value = "./src/assets/videos/clouds-undefined1.mp4";
  }
}

const userCoordinates = ref({});

onMounted(() => {
  setGeolocationCoords();
});

function setGeolocationCoords() {
  if (coords.value?.latitude !== Infinity) {
    lat = coords.value.latitude;
    lon = coords.value.longitude;
    paramCity.value = undefined;
  } else {
    paramCity.value = "Moscow";
  }
}

async function fetchWeatherData(city, lat, lon) {
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
    console.log(response.data.data[0]);
    return response.data.data[0];
  } catch (e) {
    return 0;
  }
}

const todayDate = new Date()
  .toISOString()
  .split("T")
  .slice(0, 1)
  .toString()
  .split("-")
  .reverse()
  .join(".");

const timeData = ref({});

async function fetchTimeData(time, timeZone) {
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
  console.log(timeData.value);
  return response.data;
}

function transformSunTime(sunTime, obTime) {
  return obTime.split(" ").slice(0, 1).toString() + " " + sunTime;
}

async function returnSunTime(timeZone) {
  const sunriseTime = transformSunTime(
    weatherData.value.sunrise,
    weatherData.value.ob_time
  );
  let sunriseTimeConv = await fetchTimeData(sunriseTime, timeZone);
  sunriseTimeConv = sunriseTimeConv.converted_time;

  const sunsetTime = transformSunTime(
    weatherData.value.sunset,
    weatherData.value.ob_time
  );

  let sunsetTimeConv = await fetchTimeData(sunsetTime, timeZone);

  sunsetTimeConv = sunsetTimeConv.converted_time;

  return { sunriseTimeConv, sunsetTimeConv };
}

//returnSunTime();

watch(
  () => weatherData.value.weather,
  () => setVideoBackground(weatherData.value.weather?.code),
  {
    deep: true,
  }
);

watch(
  () => coords.value.latitude,
  () => firstSetup()
);

let sunTime = ref();

async function searchCity(searchedCity) {
  weatherData.value = await fetchWeatherData(searchedCity, undefined, undefined);
  paramCity.value = searchedCity;
  sunTime.value = await fetchTimeData(weatherData.value.timezone);
}

async function firstSetup() {
  setGeolocationCoords();
  weatherData.value = await fetchWeatherData(paramCity.value, lat, lon);
  sunTime.value = await returnSunTime(weatherData.value.timezone);
}
firstSetup();
</script>

<template>
  <div class="weather-display">
    <video class="background-video" autoplay loop muted :src="videoSource"></video>
    <h1>Fantastic weather</h1>
    <div class="display-group">
      <WeatherMain
        :city="weatherData.city_name"
        :temperature="weatherData.app_temp"
        :weather-description="weatherData.weather?.description"
        :todayDate="todayDate"
        @search-city="searchCity"
        :weather-icon="weatherIcons[weatherData.weather?.icon]"
      />
      <div class="details-display">
        <LocationCard :lat="weatherData.lat" :long="weatherData.lon" />
        <HumidityCard :humidity="weatherData.rh" />
      </div>
    </div>
    <TodayHighlights
      :sunrise="sunTime.sunriseTimeConv"
      :sunset="sunTime.sunsetTimeConv"
      :app-temp="weatherData.app_temp"
      :wind-speed="weatherData.wind_spd"
      :wind-dir="weatherData.wind_cdir"
      :pressure="weatherData.pres"
      :uv="weatherData.uv"
      :wind-gust="weatherData.gust"
    />
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  color: white;
  font-family: Nunito, Arial;
  font-size: 1rem;
}

button:hover {
  cursor: pointer;
}
body {
  padding: 50px;
}

.weather-display {
  display: flex;
  flex-direction: column;
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
  width: 100%;
  gap: 30px;
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

.background-video {
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
