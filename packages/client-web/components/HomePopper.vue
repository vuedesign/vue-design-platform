<template>
  <Popper v-bind="$attrs">
    <slot />
    <template #content="props">
      <slot name="content" v-bind="props" />
    </template>
  </Popper>
</template>

<script lang="ts" setup>
import { defineComponent } from 'vue'
import Popper from 'vue3-popper'
</script>

<style lang="scss">
:root {
  --popper-theme-background-color: #ffffff;
  --popper-theme-background-color-hover: #ffffff;
  --popper-theme-text-color: #333333;
  --popper-theme-border-width: 1px;
  --popper-theme-border-style: solid;
  --popper-theme-border-color: #fff;
  --popper-theme-border-radius: 5px;
  --popper-theme-padding: 0;
  --popper-theme-box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.05);
}
</style>
