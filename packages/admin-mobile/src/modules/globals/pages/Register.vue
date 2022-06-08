<template>
    <div>register</div>
</template>
<script>
import { reactive, defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'register',
    setup() {},
});
</script>

<style scoped lang="scss">
.page-regiter {
    padding: 100px;
}

.page-regiter-inner {
    width: 800px;
    margin: 0 auto;
    display: flex;
    min-height: 300px;
}

.page-regiter-right {
    flex: 1;
}
.page-regiter-left {
    width: 300px;
}

.page-regiter-left-inner {
    border: 1px solid #eee;
    height: 100%;
    padding: 20px 40px 0 40px;
}
</style>
