<script setup>
import { Icon } from "@iconify/vue";
const searchedCity = defineModel();

const emit = defineEmits(["search-city", "get-geolocation"]);
</script>

<template>
  <div class="search-bar">
    <input
      v-model="searchedCity"
      type="text"
      placeholder="Поиск"
      @keyup.enter="$emit('search-city')"
    />
    <div class="search-buttons-block">
      <button aria-label="Определить геолокацию" @click="$emit('get-geolocation')">
        <Icon
          icon="iconamoon:location-light"
          width="30"
          height="30"
          style="color: white"
        />
      </button>
      <button aria-label="Найти место" @click="$emit('search-city', searchedCity)">
        <Icon
          icon="fluent:search-20-filled"
          width="30"
          height="30"
          style="color: white"
        />
      </button>
    </div>
  </div>
</template>

<style scoped>
.search-bar {
  border: 2px solid #ffffff70;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-radius: 10px;
  background-color: #4d6170;
}

.search-buttons-block {
  padding-top: 5px;
  display: flex;
  gap: 20px;
}

.search-bar:focus-within {
  border: #2b4260 solid 2px;
  box-shadow: inset #ffffff66;
}

.search-bar button {
  border: none;
  background-color: transparent;
}

input {
  background-color: transparent;
  width: 100%;
  border: none;
  color: white;
}

input::placeholder {
  color: #ffffff9e;
}

input:focus {
  outline: none;
}
</style>
