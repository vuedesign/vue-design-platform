<template>
    <home-header />
    <home-mainer />
    <home-footer />
    <router-view />
</template>

<script setup lang="ts">
import HomeHeader from '../components/HomeHeader.vue';
import HomeMainer from '../components/HomeMainer.vue';
import HomeFooter from '../components/HomeFooter.vue';
</script>
