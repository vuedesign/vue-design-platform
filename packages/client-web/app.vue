<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script lang="ts" setup>
import 'normalize.css'
</script>
<style lang="scss">
body {
  ul,
  ol,
  li,
  dl,
  dd,
  dt {
    list-style: none;
    margin: 0;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
}
</style>
