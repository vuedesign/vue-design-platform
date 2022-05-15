<template>
    <router-view />
</template>

<script lang="ts">
export default {
    name: 'app',
};
</script>
<script setup lang="ts"></script>

<style lang="scss">
html,
body {
    overflow: hidden;
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100%;
    display: flex;
}
* {
    margin: 0;
    padding: 0;
    box-sizing: content-box;
}
ul,
ol,
li {
    list-style: none;
    margin: 0;
    padding: 0;
}
</style>
