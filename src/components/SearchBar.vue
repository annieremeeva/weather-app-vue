<script setup>
import { Icon } from "@iconify/vue";
let searchedCity;

const emit = defineEmits(["search-city"]);
</script>

<template>
  <div class="search-bar">
    <input
      v-model="searchedCity"
      type="text"
      placeholder="Поиск"
      @keyup.enter="$emit('search-city', searchedCity)"
    />
    <button @click="$emit('search-city', searchedCity)">
      <Icon icon="fluent:search-20-filled" width="22" height="22" style="color: white" />
    </button>
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
