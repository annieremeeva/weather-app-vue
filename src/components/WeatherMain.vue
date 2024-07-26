<script setup>
import WeatherCard from "./UI/WeatherCard.vue";
import { Icon } from "@iconify/vue";

const props = defineProps({
  city: {
    required: true,
  },
  temperature: {
    required: true,
  },
  weatherDescription: {
    required: true,
  },
  weatherIcon: {
    required: true,
  },
  appTemp: {
    type: Number,
  },
  pressure: {
    type: Number,
  },
  humidity: {
    type: Number,
  },
});
</script>

<template>
  <WeatherCard class="weather-main">
    <h2>Сегодня</h2>
    <Icon class="weather-icon" :icon="weatherIcon" width="100" style="color: white" />
    <p class="temperature">{{ temperature }} &deg;C</p>
    <p class="app-temperature">Ощущается как {{ appTemp }} &deg;C</p>

    <p class="weather-description">
      <Icon
        icon="fluent:weather-partly-cloudy-day-16-regular"
        width="22"
        height="22"
        style="color: white"
      />
      {{ weatherDescription }}
    </p>
    <hr class="line" />
    <p>
      <Icon icon="iconamoon:location-light" width="22" height="22" style="color: white" />
      {{ city }}
    </p>
    <p>
      <Icon icon="lets-icons:pressure" width="22" height="22" style="color: white" />
      {{ Math.round(pressure * 0.75006156) }} мм рт. ст.
    </p>
    <p>
      <Icon icon="uil:raindrops-alt" width="22" height="22" style="color: white" />
      {{ humidity }} %
    </p>
  </WeatherCard>
</template>

<style scoped>
h2 {
  align-self: center;
}

.weather-description {
  align-self: center;
}

.temperature {
  align-self: center;
  font-size: 1.5rem;
  justify-content: center;
  font-weight: 700;
}

.app-temperature {
  align-self: center;
  font-size: 1rem;
}

.weather-icon {
  align-self: center;
  margin: 20px;
  flex: 1;
}

.weather-main {
  flex-direction: column;
  flex: 1;
}
.line {
  width: 100%;
  margin-block: 20px;
}

p {
  display: flex;
  gap: 5px;
  align-items: center;
}
</style>
