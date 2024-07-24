<script setup>
import WeatherCard from "./UI/WeatherCard.vue";
import { Icon } from "@iconify/vue";

let searchedCity;

const emit = defineEmits(["search-city"]);

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
  todayDate: {
    required: true,
  },
  weatherIcon: {
    required: true,
  },
});
</script>

<template>
  <WeatherCard class="weather-main">
    <div class="search-bar">
      <input
        v-model="searchedCity"
        type="text"
        placeholder="Поиск"
        @keyup.enter="$emit('search-city', searchedCity)"
      />
      <button @click="$emit('search-city', searchedCity)">
        <Icon
          icon="fluent:search-20-filled"
          width="22"
          height="22"
          style="color: white"
        />
      </button>
    </div>

    <Icon class="weather-icon" :icon="weatherIcon" width="100px" style="color: white" />
    <p class="temperature">{{ temperature }} &deg;C</p>
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
      <Icon
        icon="fluent:location-arrow-16-regular"
        width="22"
        height="22"
        style="color: white"
      />
      {{ city }}
    </p>
    <p>
      <Icon
        icon="fluent:calendar-ltr-20-regular"
        width="22"
        height="22"
        style="color: white"
      />
      {{ todayDate.split(" ").slice(0, 1)[0].split("-").reverse().join(".") }}
    </p>
  </WeatherCard>
</template>

<style scoped>
.weather-description {
  align-self: center;
}

.temperature {
  align-self: center;
  font-size: 2rem;
  font-weight: 700;
}

.weather-icon {
  align-self: center;
  margin: 20px;
}

.weather-main {
  flex-direction: column;
  flex: 50%;
}
.line {
  width: 100%;
  margin-block: 20px;
}

p {
  display: flex;
  gap: 5px;
}

input {
  background-color: transparent;
  width: 100%;
  border: none;
}

input::placeholder {
  color: #ffffff9e;
}

input:focus {
  outline: none;
}

.search-bar {
  border: 2px solid #ffffff66;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-radius: 10px;
}

.search-bar:focus-within {
  border: white solid 2px;
  box-shadow: #ffffff66;
  background: rgba(0, 0, 0, 0.329);
}

.search-bar button {
  border: none;
  background-color: transparent;
}
</style>
