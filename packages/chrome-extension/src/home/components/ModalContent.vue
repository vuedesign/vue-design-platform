<template>
    <div class="vue-design-modal-content">
        <div class="vue-design-modal-main">
            <div class="vue-design-modal-item">
                <vue-design-item v-bind="state.info" :user="state.user" />
            </div>
            <div class="vue-design-modal-info">
                <dl>
                    <dt>类型</dt>
                    <dd>
                        <template v-if="state.info.type === 'code'">
                            <github theme="outline" size="16" fill="#A6A6A6" />
                            <span>代码</span>
                        </template>
                        <template v-else>
                            <browser-chrome
                                theme="outline"
                                size="16"
                                fill="#A6A6A6"
                            />
                            <span>网站</span>
                        </template>
                    </dd>
                </dl>
                <dl v-if="state.info.star">
                    <dt>星星</dt>
                    <dd>
                        <star theme="outline" size="16" fill="#A6A6A6" />
                        <span>{{ state.info.star }}</span>
                    </dd>
                </dl>
                <dl v-if="state.info.siteUrl">
                    <dt>官网</dt>
                    <dd>
                        <home theme="outline" size="16" fill="#A6A6A6" />
                        <a :href="state.info.siteUrl">
                            {{ state.info.siteUrl }}
                        </a>
                    </dd>
                </dl>
                <dl v-if="state.info.tags && state.info.tags.length > 0">
                    <dt>标签</dt>
                    <dd>
                        <tag-one theme="outline" size="16" fill="#A6A6A6" />
                        <div>
                            <span
                                class="ellipsis"
                                v-for="(tag, i) in state.info.tags"
                                :key="i"
                            >
                                {{ tag }}
                            </span>
                        </div>
                    </dd>
                </dl>
                <dl>
                    <dt>关于</dt>
                    <dd>
                        <tips-one theme="outline" size="16" fill="#A6A6A6" />
                        <p>{{ state.info.description }}</p>
                    </dd>
                </dl>
            </div>
        </div>
        <div class="vue-design-modal-img-list">
            <ul :style="{ width: `${imgWrapWidth}px` }">
                <li
                    v-for="(img, i) in state.info.imgs"
                    :key="i"
                    :class="{ active: img === state.info.logoUrl }"
                >
                    <span @click="handleSelectLogo(img)">
                        <img v-if="img" :src="img" />
                    </span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script lang="ts">
export default {
    name: 'modal-content',
};
</script>
<script lang="ts" setup>
import VueDesignItem from '../../components/VueDesignItem.vue';
import {
    Home,
    Star,
    TagOne,
    Github,
    BrowserChrome,
    TipsOne,
} from '@icon-park/vue-next';
import { state, imgWrapWidth } from '../uses/useStore';
import useStore from '../uses/useStore';

const { handleSelectLogo } = useStore();
</script>

<style scoped lang="scss">
.vue-design-modal-main {
    height: 230px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    overflow: hidden;
}
.vue-design-modal-item {
    width: 256px;
    height: 230px;
    border-radius: 4px;
    background-color: #e5eaed;
}
.vue-design-modal-info {
    // margin-left: 16px;
    position: relative;
    width: 256px;
    font-size: 12px;
    dl {
        line-height: 24px;
        display: flex;
        margin-top: 10px;
        &:first-child {
            margin-top: 0;
        }
    }
    dt {
        margin-right: 8px;
        word-break: keep-all;
        color: #808080;
        font-weight: 700;
    }
    dd {
        flex: 1;
        display: flex;
        align-items: flex-start;

        > span {
            display: flex;
            height: 24px;
            line-height: 24px;
            padding: 0 4px;
            color: #333;
            align-items: center;
        }
        span,
        a,
        p {
            padding: 0 4px;
            color: #333;
        }
        > p {
            display: -webkit-box;
            color: #444;
            overflow: hidden;
            -webkit-line-clamp: 4;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
        }
        > div {
            height: 24px;
            overflow: hidden;
        }
    }
}
.vue-design-modal-img-list {
    width: 100%;
    margin-top: 16px;
    overflow-x: auto;
    overflow-y: hidden;
    position: relative;
    > .ant-alert {
        position: absolute;
        width: 100%;
        box-sizing: border-box;
        height: 100%;
        border-radius: 4px;
    }
}
.vue-design-modal-img-list ul {
    margin: 0;
    padding: 0;
    display: flex;
    height: 100px;
    width: 100%;
    flex-wrap: nowrap;
}
.vue-design-modal-img-list li {
    width: 100px;
    height: 100px;
    background-color: #eff3f5;
    border-radius: 3px;
    margin-left: 7px;
    &:first-child {
        margin-left: 0;
    }
    span {
        display: block;
        width: 100px;
        height: 100px;
        overflow: hidden;
    }
    &.active {
        span {
            background-color: #000000;
            opacity: 0.6;
        }
    }
    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
}
</style>
<style lang="scss">
.vue-design-modal-img-list {
    width: 100%;
    margin-top: 16px;
    overflow-x: auto;
    overflow-y: hidden;
    > .ant-alert {
        position: absolute;
        width: 100%;
        box-sizing: border-box;
        height: 100%;
        border-radius: 3px;
    }
}
</style>
