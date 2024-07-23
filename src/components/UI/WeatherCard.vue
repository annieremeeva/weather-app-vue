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
    #7f209b 5%,
    #553b82 70%,
    #7f2a5b 100%
  );
  border-radius: 15px;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.597);
  padding: 20px;
}
</style>
