<script setup></script>

<template>
  <div>
    <slot></slot>
  </div>
</template>

<style scoped>
div {
  display: flex;
  background: radial-gradient(
    ellipse farthest-corner at 80% 70%,
    #360e43 5%,
    #2b1b3c 70%,
    #39132a 100%
  );
  border-radius: 5px;
  padding: 10px;
}
</style>
