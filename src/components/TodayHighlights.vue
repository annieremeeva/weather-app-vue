<script setup>
import WeatherCard from "./UI/WeatherCard.vue";
import WeatherInnerCard from "./UI/WeatherInnerCard.vue";
import { Icon } from "@iconify/vue";
</script>

<template>
  <WeatherCard class="highlights">
    <div class="highlights-column">
      <WeatherInnerCard class="highlights-card">
        <h2>Ветер</h2>
      </WeatherInnerCard>
      <WeatherInnerCard class="highlights-card-small">
        <h2>Порывы ветра</h2>
      </WeatherInnerCard>
    </div>
    <div class="highlights-column">
      <WeatherInnerCard class="highlights-card">
        <h2>Давление</h2>
      </WeatherInnerCard>
      <WeatherInnerCard class="highlights-card-small">
        <h2>Ощущается</h2>
      </WeatherInnerCard>
    </div>
    <div class="highlights-column">
      <WeatherInnerCard class="highlights-card">
        <h2>Рассвет и закат</h2>
      </WeatherInnerCard>
      <WeatherInnerCard class="highlights-card-small">
        <h2>UV-индекс</h2>
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
  width: 33%;
  height: 100%;
  gap: 20px;
  display: flex;
  flex-direction: column;
}

.highlights-card {
  height: 60%;
}

@media (orientation: landscape) {
  .highlights {
    flex-direction: row;
  }
}
</style>
