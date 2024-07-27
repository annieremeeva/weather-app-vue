<script setup>
import { Icon } from "@iconify/vue";
</script>

<template>
  <div class="loading-display">
    <Icon
      icon="ep:loading"
      class="loader"
      width="192"
      height="192"
      style="color: #2b4260"
    />
  </div>
</template>

<style scoped>
.loading-display {
  display: flex;
  justify-content: center;
  align-items: center;
}

.loader {
  animation: spinner 3s linear infinite;
}

@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
