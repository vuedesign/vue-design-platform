<template>
  <footer class="vue-design-footer">
    <h3 :class="mod['titleColor']">this is home page ya~</h3>
  </footer>
</template>

<script setup lang="ts">
import mod from '@/assets/css/home.module.css';
</script>

<style lang="scss" scoped>
.vue-design-footer {
  width: 100%;
  height: 219px;
  background: rgba(229, 234, 237, 1);
}
</style>
