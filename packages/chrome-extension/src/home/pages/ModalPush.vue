<template>
    <a-modal
        v-model:visible="state.visible"
        :width="560"
        :closable="false"
        wrapClassName="vue-design-modal"
        @ok="handleCancel"
    >
        <template #title>
            <modal-header />
        </template>
        <div id="vue-design-modal-content">
            <component :is="currentComponent" />
        </div>
        <template #footer>
            <modal-footer />
        </template>
    </a-modal>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { message } from 'ant-design-vue';
import ModalHeader from '../components/ModalHeader.vue';
import ModalFooter from '../components/ModalFooter.vue';
import ModalContent from '../components/ModalContent.vue';
import ModalLogin from '../components/ModalLogin.vue';
import ModalRegister from '../components/ModalRegister.vue';
import { onExtensionReady } from '../../globals/ajax';
import useAuth from '../uses/useAuth';
import { state } from '../uses/useStore';
import useStore from '../uses/useStore';

message.config({
    getContainer: () => document.getElementById('vue-design-modal-content'),
});

const tabs = {
    'modal-content': ModalContent,
    'modal-login': ModalLogin,
    'modal-register': ModalRegister,
};
const currentComponent = computed(() => tabs[state.view]);
const { findProfile } = useAuth();
const { handleCancel } = useStore();

onExtensionReady(() => {
    findProfile();
});
</script>

<style lang="scss" scoped>
.vue-design-modal-inner {
    display: flex;
    flex-direction: column;
    background-color: white;
    width: 560px;
    height: auto;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}

.vue-design-modal-body {
    padding: 0 16px;
}
#vue-design-modal-content {
    position: relative;
}
</style>
<style lang="scss">
@import '~/assets/styles/message.scss';
.vue-design-modal {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    .ant-modal-header {
        padding: 9px 16px 8px;
    }
    .ant-modal-body {
        padding: 16px;
    }
}
</style>
