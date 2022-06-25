<template>
    <router-view />
</template>

<script setup lang="ts">
import { state, Info } from './uses/useStore';
chrome.storage.local.get('token', ({ token }: { token: string }) => {
    state.token = token;
});
chrome.storage.local.get('info', ({ info }: { info: Info }) => {
    console.log('info====', state.info, info);
    state.info = info;
});
</script>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
ul,
ol,
li {
    list-style: none;
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
</style>
