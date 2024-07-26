<script setup>
import WeatherCard from "./UI/WeatherCard.vue";
import { Icon } from "@iconify/vue";

const props = defineProps({
  sunrise: {
    type: String,
  },
  sunset: {
    type: String,
  },
  uv: {
    type: Number,
  },
});

const sunriseFormated = props.sunrise.split(" ").pop().split(":").slice(0, 2).join(":");

const sunsetFormated = props.sunset.split(" ").pop().split(":").slice(0, 2).join(":");
</script>

<template>
  <WeatherCard class="sun-card">
    <div class="sunrise">
      <Icon icon="bi:sunrise" width="32" height="32" style="color: white" />
      <p>{{ sunriseFormated }}</p>
    </div>
    <div class="sunset">
      <Icon icon="bi:sunset" width="32" height="32" style="color: white" />
      <p>{{ sunsetFormated }}</p>
    </div>
    <div class="uv">
      <Icon icon="hugeicons:uv-02" width="32" height="32" style="color: white" />
      <p>{{ uv }}</p>
    </div>
  </WeatherCard>
</template>

<style scoped>
.sun-card {
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
}

.sunrise,
.sunset,
.uv {
  display: flex;
  gap: 30px;
  align-items: center;
}

p {
  font-size: 1.5rem;
}
</style>
