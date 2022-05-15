<template>
    <div class="page-manage">
        <var-app-bar title="审核" />
        <div class="page-manage-container">
            <ul>
                <li>
                    <var-card
                        title="风景"
                        subtitle="公园里的风景"
                        description="公园的树林也很美。在公园的小山上栽满了树木，梧桐树的叶子随着时间的流逝慢慢变黄，纷纷飘落；枫树的叶子却变红了，公园笼罩在片片红云中，也使秋天增添了一分热情。而柏树的叶子仍是那么青翠欲滴，令你陶醉极了。山上有一群孩子在快乐的嬉戏，不时传来阵阵欢笑声，瞧，他们玩得多起劲呀，给树林增添了活力。"
                        src="https://varlet-varletjs.vercel.app/cat.jpg"
                    >
                        <template #extra>
                            <var-space>
                                <var-button type="success">
                                    <var-icon name="check" />
                                    <span class="btn-text">通 过</span>
                                </var-button>
                                <var-button
                                    type="danger"
                                    @click="handleUnreachable"
                                >
                                    <var-icon name="window-close" />
                                    <span class="btn-text">不通过</span>
                                </var-button>
                            </var-space>
                        </template>
                    </var-card>
                </li>
                <li>
                    <var-card
                        title="风景"
                        subtitle="公园里的风景"
                        description="公园的树林也很美。在公园的小山上栽满了树木，梧桐树的叶子随着时间的流逝慢慢变黄，纷纷飘落；枫树的叶子却变红了，公园笼罩在片片红云中，也使秋天增添了一分热情。而柏树的叶子仍是那么青翠欲滴，令你陶醉极了。山上有一群孩子在快乐的嬉戏，不时传来阵阵欢笑声，瞧，他们玩得多起劲呀，给树林增添了活力。"
                        src="https://varlet-varletjs.vercel.app/cat.jpg"
                    />
                </li>
            </ul>
        </div>
        <var-popup position="bottom" v-model:show="isUnreachableView">
            <div class="popup-unreachable">
                <header class="popup-unreachable-header">
                    <h4>不通过</h4>
                </header>
                <section class="popup-unreachable-body">
                    <var-radio-group v-model="unreachable.type">
                        <var-radio :checked-value="0">不合收录范围</var-radio>
                        <var-radio :checked-value="1">涉黄、赌、毒</var-radio>
                        <var-radio :checked-value="2">有广告嫌疑</var-radio>
                    </var-radio-group>
                    <var-input
                        placeholder="请输不通过理由"
                        textarea
                        v-model="unreachable.description"
                    />
                </section>
                <footer class="popup-unreachable-footer">
                    <var-button block type="primary">确认</var-button>
                </footer>
            </div>
        </var-popup>
    </div>
</template>
<script lang="ts">
export default {
    name: 'page-manage',
};
</script>
<script lang="ts" setup>
import { ref, reactive } from 'vue';
const isUnreachableView = ref(false);
const unreachable = reactive({
    type: 0,
    description: '',
});
const handleUnreachable = () => {
    isUnreachableView.value = true;
};
</script>

<style scoped lang="scss">
.page-manage {
    display: flex;
    flex-direction: column;
    height: 100%;
}
.page-manage-container {
    padding: 16px 24px;
    flex: 1;
    overflow: hidden;
    overflow-y: auto;
    li {
        margin-bottom: 16px;
    }
    .btn-text {
        display: inline-flex;
        vertical-align: text-top;
        margin-left: 3px;
    }
}

.popup-unreachable {
    width: 100%;
}

.popup-unreachable-body {
    padding: 16px 24px;
}
.popup-unreachable-header {
    height: 54px;
    line-height: 54px;
    padding: 0 24px;
    border-bottom: 1px solid #ddd;
    h4 {
        color: #333;
    }
}
.popup-unreachable-footer {
    padding: 16px 24px;
    border-top: 1px solid #ddd;
}
</style>
