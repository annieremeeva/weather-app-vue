<script setup>
import WeatherCard from "./UI/WeatherCard.vue";
import WeatherInnerCard from "./UI/WeatherInnerCard.vue";
import { Icon } from "@iconify/vue";

const props = defineProps({
  windSpeed: {
    type: Number,
  },
  windDir: {
    type: String,
  },
  windGust: {
    type: Number,
  },
  uv: {
    type: Number,
  },
  appTemp: {
    type: Number,
  },
  pressure: {
    type: Number,
  },
  sunrise: {
    type: String,
  },
  sunset: {
    type: String,
  },
});
</script>

<template>
  <WeatherCard class="highlights">
    <div class="highlights-column">
      <WeatherInnerCard class="highlights-card">
        <h2>Ветер</h2>
        <Icon
          class="icon"
          icon="ph:waveform"
          width="64"
          height="64"
          style="color: white"
        />
        <p>{{}}</p>
      </WeatherInnerCard>
      <WeatherInnerCard class="highlights-card-small">
        <h2>Порывы ветра</h2>
        <Icon
          class="icon"
          icon="fluent:weather-squalls-20-filled"
          width="64"
          height="64"
          style="color: white"
        />
        <p>{{}}</p>
      </WeatherInnerCard>
    </div>
    <div class="highlights-column">
      <WeatherInnerCard class="highlights-card">
        <h2>Давление</h2>
        <Icon
          class="icon"
          icon="lets-icons:pressure"
          width="64"
          height="64"
          style="color: white"
        />
        <p>{{}}</p>
      </WeatherInnerCard>
      <WeatherInnerCard class="highlights-card-small">
        <h2>Ощущается</h2>
        <Icon
          class="icon"
          icon="carbon:temperature-feels-like"
          width="64"
          height="64"
          style="color: white"
        />
        <p>{{}}</p>
      </WeatherInnerCard>
    </div>
    <div class="highlights-column">
      <WeatherInnerCard class="highlights-card">
        <h2>Рассвет и закат</h2>
        <Icon
          class="icon"
          icon="uil:sunset"
          width="64"
          height="64"
          style="color: white"
        />
        <p>{{}}</p>
      </WeatherInnerCard>
      <WeatherInnerCard class="highlights-card-small">
        <h2>UV-индекс</h2>
        <Icon
          class="icon"
          icon="hugeicons:uv-02"
          width="64"
          height="64"
          style="color: white"
        />
        <p>{{}}</p>
      </WeatherInnerCard>
    </div>
  </WeatherCard>
</template>

<style scoped>
.highlights {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
}

.highlights-column {
  height: 100%;
  gap: 20px;
  display: flex;
  flex-direction: column;
}

.highlights-card {
  height: 300px;
  gap: 30px;
}

.highlights-card-small {
  height: 200px;
  gap: 20px;
}

.icon {
  align-self: center;
}

@media (orientation: landscape) {
  .highlights {
    flex-direction: row;
  }

  .highlights-column {
    width: 33%;
  }
}
</style>
