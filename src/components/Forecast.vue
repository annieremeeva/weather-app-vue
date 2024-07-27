<script setup>
import WeatherCard from "./UI/WeatherCard.vue";
import WeatherInnerCard from "./UI/WeatherInnerCard.vue";
import { Icon } from "@iconify/vue";
import { weatherIcons } from "@/icons";

const props = defineProps({
  forecastDays: {
    type: Array,
    required: true,
  },
});

function formatDate(date) {
  date = Date.parse(date);
  let formatter = new Intl.DateTimeFormat("ru", {
    weekday: "long",
    month: "numeric",
    day: "numeric",
  });
  date = formatter.format(date).split(", ");
  return { dayOfWeek: date[0], date: date[1] };
}
</script>

<template>
  <WeatherCard class="forecast">
    <WeatherInnerCard class="day-card" v-for="day in forecastDays" :key="day.id">
      <div class="date">
        <h2 class="day-stamp">
          {{ formatDate(day.datetime).dayOfWeek }}
        </h2>
        <p class="date-stamp">
          {{ formatDate(day.datetime).date }}
        </p>
      </div>
      <div class="weather">
        <div class="temp-block">
          <Icon
            :icon="weatherIcons[day.weather.icon]"
            width="32"
            height="32"
            style="color: white"
          />
          <p class="max-temp">{{ Math.round(day.max_temp) }}&nbsp;&deg;C</p>
          <p class="min-temp">{{ Math.round(day.min_temp) }}&nbsp;&deg;C</p>
        </div>
      </div>
    </WeatherInnerCard>
  </WeatherCard>
</template>

<style scoped>
h2 {
  font-size: 1rem;
}
.forecast {
  justify-content: space-between;
  gap: 10px;
  flex-direction: column;
  flex-wrap: wrap;
}
.day-card {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.temp-block {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.max-temp {
  font-weight: 700;
  font-size: 1.2rem;
}

.date {
  display: flex;
  flex-direction: column;
}

.day-stamp {
  text-transform: capitalize;
}

@media (orientation: landscape) {
  .forecast {
    flex-direction: row;
  }
  .date {
    align-items: center;
  }

  .day-card {
    flex-direction: column;
  }
}
</style>
