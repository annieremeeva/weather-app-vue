<script setup>
import axios from "axios";
import HumidityCard from "./components/HumidityCard.vue";
import LocationCard from "./components/LocationCard.vue";
import TodayHighlights from "./components/TodayHighlights.vue";
import WeatherMain from "./components/WeatherMain.vue";
import { Icon } from "@iconify/vue";
import { useGeolocation } from "@vueuse/core";
import { watch, onMounted, ref, computed } from "vue";

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

const { coords, locatedAt, error, resume, pause } = useGeolocation();
let weatherData = ref({});

let loadingError = false;
let paramCity = ref(undefined);

let videoSource = ref("");

let lat;
let lon;

function setVideoBackground(weatherCode) {
  console.log(weatherCode);
  if ([300, 301, 302].includes(weatherCode)) {
    videoSource.value = "./src/assets/videos/drizzle.mp4";
  } else if ([500, 501, 502, 511, 520, 521, 522].includes(weatherCode)) {
    videoSource.value = "./src/assets/videos/rain.mp4";
  } else if ([600, 601, 602, 610, 611, 612, 621, 622, 623].includes(weatherCode)) {
    videoSource.value = "./src/assets/videos/snow.mp4";
  } else if ([700, 711, 721, 731, 741, 751].includes(weatherCode)) {
    videoSource.value = "./src/assets/videos/fog.mp4";
  } else if ([800, 801].includes(weatherCode)) {
    videoSource.value = "./src/assets/videos/sunny.mp4";
  } else if ([802, 803].includes(weatherCode)) {
    videoSource.value = "./src/assets/videos/clouds.mp4";
  } else if ([804].includes(weatherCode)) {
    videoSource.value = "./src/assets/videos/heavy-clouds.mp4";
  } else if ([200, 201, 202, 230, 231, 232, 233].includes(weatherCode)) {
    videoSource.value = "./src/assets/videos/thunder.mp4";
  } else {
    videoSource.value = "./src/assets/videos/clouds-undefined.mp4";
  }
}

const userCoordinates = ref({});

onMounted(() => {
  setGeolocationCoords();
});

const setGeolocationCoords = async () => {
  if (coords.value?.latitude !== Infinity) {
    userCoordinates.value.latitude = coords.value.latitude;
    userCoordinates.value.longitude = coords.value.longitude;
  }
};

watch(
  () => coords.value.latitude,
  () => {
    setGeolocationCoords();
    lat = userCoordinates.value.latitude;
    lon = userCoordinates.value.longitude;
    fetchWeatherData();
  }
);

watch(
  () => paramCity,
  () => console.log(paramCity)
);

watch(
  () => weatherData.value.weather,
  () => setVideoBackground(weatherData.value.weather?.code),
  {
    deep: true,
  }
);

function searchCity(searchedCity) {
  paramCity.value = searchedCity;
  lat = undefined;
  lon = undefined;
  fetchWeatherData();
  paramCity.value = undefined;
}

if (!userCoordinates.value.latitude) {
  paramCity.value = "Moscow";
  fetchWeatherData();
  paramCity.value = undefined;
}
async function fetchWeatherData() {
  try {
    const response = await axios.get("https://api.weatherbit.io/v2.0/current", {
      params: {
        lang: "ru",
        city: paramCity.value,
        key: apiKey,
        lat,
        lon,
      },
    });
    weatherData.value = JSON.parse(JSON.stringify(response.data.data[0]));
  } catch (e) {
    console.log(e.message);
  }
}

//let weatherCodePassed = ref(401);

//if (weatherData.value.weather?.code) {
//  weatherCodePassed.value = weatherData.value.weather.code;
//}

setVideoBackground(601);
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
        :todayDate="weatherData.ob_time"
        @search-city="searchCity"
        :weather-icon="weatherIcons[weatherData.weather?.icon]"
      />
      <div class="details-display">
        <LocationCard :lat="weatherData.lat" :long="weatherData.lon" />
        <HumidityCard :humidity="weatherData.rh" />
      </div>
    </div>
    <TodayHighlights />
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
