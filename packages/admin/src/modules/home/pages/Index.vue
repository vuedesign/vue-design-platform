<template>
    <vd-card class="page-home">
        <!-- <template #header>
            <div class="page-home-container">home</div>
        </template> -->
        <template #default>
            <div class="page-home-container">home</div>
        </template>
    </vd-card>
</template>
<script lang="ts">
export default {
    name: 'page-home',
};
</script>
<script lang="ts" setup>
import VdCard from '../../globals/components/VdCard.vue';
</script>

<style scoped lang="scss">
.page-home {
    display: flex;
    flex-direction: column;
    height: 100%;
}
.page-home-filter {
    padding: 16px 24px;
    .el-input,
    .el-select,
    .el-button {
        vertical-align: middle;
        margin-right: 12px;
    }
}
.page-home-container {
    padding: 16px;
    flex: 1;
    overflow: hidden;
    overflow-y: auto;
    dl {
        background-color: #fff;
        border-radius: 4px;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
        padding: 24px;
        display: flex;
        dt {
            display: flex;
            height: 48px;
            justify-content: center;
            &.icon {
                width: 48px;
                background-color: #f5f5f5;
                margin-right: 16px;

                .var-badge {
                    display: flex;
                    justify-content: center;
                }
            }
            &.btn-go {
                width: 24px;
            }
        }
        dd {
            flex: 1;
            h4 {
                color: #333;
            }
            p {
                color: #666;
            }
        }
    }
}
</style>
