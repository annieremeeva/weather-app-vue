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

const sunriseFormated = props.sunrise.split(" ").pop().split(":").slice(0, 2).join(":");

const sunsetFormated = props.sunset.split(" ").pop().split(":").slice(0, 2).join(":");
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
        <div class="wind-data">
          <p>{{ windSpeed }} м/с</p>
          <p>{{ windDir }}</p>
        </div>
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
        <p>{{ windGust }} м/с</p>
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
        <p>{{ Math.round(pressure * 0.75006156) }} мм рт. ст.</p>
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
        <p>{{ appTemp }} &deg;C</p>
      </WeatherInnerCard>
    </div>
    <div class="highlights-column">
      <WeatherInnerCard class="highlights-card">
        <h2>Рассвет и закат</h2>
        <div class="sunrise-sunset">
          <Icon
            class="icon"
            icon="hugeicons:sunrise"
            width="64"
            height="64"
            style="color: white"
          />
          <Icon
            class="icon"
            icon="hugeicons:sunset"
            width="64"
            height="64"
            style="color: white"
          />
        </div>
        <div class="sun-data">
          <p>{{ sunriseFormated }}</p>
          <p>{{ sunsetFormated }}</p>
        </div>
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
        <p>{{ uv }}</p>
      </WeatherInnerCard>
    </div>
  </WeatherCard>
</template>

<style scoped>
.wind-data,
.sun-data {
  display: flex;
  justify-content: space-evenly;
}

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
  gap: 50px;
}

.highlights-card-small {
  height: 200px;
  gap: 20px;
}
.sunrise-sunset {
  display: flex;
  justify-content: space-evenly;
}
.icon {
  align-self: center;
}

p {
  align-self: center;
  font-size: 1.2rem;
  font-weight: 700;
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
