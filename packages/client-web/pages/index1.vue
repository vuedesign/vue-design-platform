<template>
  <div>
    Index page
    <h4 v-if="pending">Loading ...</h4>
    <p v-else>{{ profile }}</p>
    <button @click="handleRefresh">click</button>
  </div>
</template>

<script lang="ts" setup>
// import useGlobalStore from "../stores/useGlobalStore";
const globalStore = useGlobalStore();
// const { profile, pending } = storeToRefs(globalStore);
const { data: profile, pending, refresh } = await globalStore.findProfile();
const handleRefresh = () => refresh();
</script>
