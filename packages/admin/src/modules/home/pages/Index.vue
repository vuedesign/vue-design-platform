<template>
    <div class="page-home">
        <div class="page-home-container">
            <dl @click="handleReport">
                <dt class="icon"></dt>
                <dd>
                    <h4>审核</h4>
                    <p>站点审核</p>
                </dd>
                <dt class="btn-go"></dt>
            </dl>
        </div>
    </div>
</template>
<script lang="ts">
export default {
    name: 'page-home',
};
</script>
<script lang="ts" setup>
import { useRouter } from 'vue-router';
const router = useRouter();
const handleReport = () => {
    router.push({
        name: 'manage',
    });
};
</script>

<style scoped lang="scss">
.page-home {
    display: flex;
    flex-direction: column;
    height: 100%;
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
