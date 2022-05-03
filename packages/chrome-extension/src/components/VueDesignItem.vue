<template>
    <div class="vue-design-item-inner">
        <div class="vue-design-item-thumb">
            <a :href="props.siteUrl" :style="thumbStyle">
                <svg
                    v-if="!props.siteUrl"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                >
                    <g opacity="1" transform="translate(0 0)  rotate(0 16 16)">
                        <path
                            id="路径 1"
                            fill-rule="evenodd"
                            style="fill: #ffffff"
                            transform="translate(0 0)  rotate(0 16 16)"
                            opacity="0.01"
                            d="M0,32L32,32L32,0L0,0L0,32Z "
                        />
                        <g
                            opacity="1"
                            transform="translate(2.6666663333333718 4.666666333333315)  rotate(0 13.3316835 11.335016833333352)"
                        >
                            <path
                                id="拼合图形"
                                fill-rule="evenodd"
                                style="fill: #768cb5"
                                transform="translate(0 0)  rotate(0 13.33 11.333330178350877)"
                                opacity="1"
                                d="M26.51 21.44C26.61 21.2 26.66 20.94 26.66 20.67L26.66 2Q26.66 1.595 26.51 1.22C26.41 0.98 26.26 0.77 26.08 0.59C25.9 0.4 25.69 0.26 25.45 0.16C25.2 0.05 24.94 0 24.67 0L2 0C1.73 0 1.47 0.05 1.22 0.16C0.98 0.26 0.77 0.4 0.59 0.59C0.4 0.77 0.26 0.98 0.16 1.22C0.05 1.47 0 1.73 0 2L0 20.67C0 20.94 0.05 21.2 0.16 21.45C0.26 21.69 0.4 21.9 0.59 22.08C0.61816 22.1082 0.647054 22.1356 0.676682 22.1622C0.75125 22.2309 0.830468 22.2922 0.914337 22.3465C1.01016 22.4099 1.11204 22.465 1.22 22.51Q1.2675 22.529 1.3155 22.5456C1.53604 22.6285 1.76421 22.6667 2 22.6667L24.67 22.6667C24.94 22.6667 25.2 22.6167 25.45 22.5067C25.6591 22.4195 25.8455 22.302 26.0091 22.1475C26.0333 22.1255 26.057 22.103 26.08 22.08C26.1018 22.0582 26.1232 22.0357 26.1442 22.0128C26.2821 21.8682 26.3909 21.7051 26.4751 21.5187C26.4873 21.4927 26.499 21.4665 26.51 21.44Z M25.33 16.6579L25.33 2C25.33 1.81 25.27 1.66 25.14 1.53C25.01 1.4 24.85 1.33 24.67 1.33L2 1.33C1.82 1.33 1.66 1.4 1.53 1.53C1.4 1.66 1.33 1.82 1.33 2L1.33 16.4067L6.87 10.8667C6.89 10.8367 6.93 10.8067 6.96 10.7867C6.99 10.7567 7.03 10.7367 7.06 10.7267C7.1 10.7067 7.14 10.6967 7.18 10.6867C7.22 10.6767 7.26 10.6667 7.3 10.6667C7.34 10.6667 7.38 10.6667 7.42 10.6767C7.46 10.6767 7.5 10.6867 7.54 10.6967C7.58 10.7067 7.62 10.7267 7.65 10.7467C7.69 10.7667 7.72 10.7867 7.75 10.8167L10.58 13.0767L14.16 8.89666C14.19 8.86666 14.22 8.83666 14.25 8.81666C14.28 8.78666 14.32 8.76666 14.36 8.74666C14.39 8.72666 14.43 8.70666 14.47 8.69666C14.51 8.68666 14.55 8.67666 14.6 8.66666L14.72 8.66666C14.77 8.67666 14.81 8.67666 14.85 8.68666C14.89 8.70666 14.93 8.71666 14.96 8.73666C15 8.75666 15.04 8.77666 15.07 8.80666L25.33 16.6579Z M8.66333 6.33667C8.66333 6.10667 8.62333 5.88667 8.53333 5.68667C8.45333 5.48667 8.33333 5.30667 8.17333 5.15667C8.02333 5.00667 7.84333 4.88667 7.65333 4.79667C7.44333 4.70667 7.22333 4.66667 7.00333 4.66667C6.77333 4.66667 6.55333 4.70667 6.35333 4.79667C6.15333 4.88667 5.97333 5.00667 5.82333 5.15667C5.67333 5.30667 5.55333 5.48667 5.46333 5.68667C5.37333 5.88667 5.33333 6.10667 5.33333 6.33667C5.33333 6.55667 5.37333 6.77667 5.46333 6.98667C5.55333 7.17667 5.67333 7.35667 5.82333 7.50667C5.97333 7.66667 6.15333 7.78667 6.35333 7.86667C6.55333 7.95667 6.77333 7.99667 7.00333 7.99667C7.22333 7.99667 7.44333 7.95667 7.65333 7.86667C7.84333 7.78667 8.02333 7.66667 8.17333 7.50667C8.33333 7.35667 8.45333 7.17667 8.53333 6.98667C8.62333 6.77667 8.66333 6.55667 8.66333 6.33667Z M6.76333 6.56667C6.83333 6.63667 6.91333 6.66667 7.00333 6.66667C7.09333 6.66667 7.17333 6.63667 7.23333 6.56667C7.30333 6.50667 7.33333 6.42667 7.33333 6.33667C7.33333 6.24667 7.30333 6.16667 7.23333 6.09667C7.17333 6.03667 7.09333 5.99667 7.00333 5.99667C6.91333 5.99667 6.83333 6.03667 6.76333 6.09667C6.70333 6.16667 6.66333 6.24667 6.66333 6.33667C6.66333 6.42667 6.70333 6.50667 6.76333 6.56667Z "
                            />
                        </g>
                    </g>
                </svg>
            </a>
        </div>
        <div class="vue-design-item-tools">
            <dl>
                <dd>
                    <thumbs-up theme="outline" size="16" fill="#666" />
                </dd>
                <dd>
                    <thumbs-down theme="outline" size="16" fill="#666" />
                </dd>
                <dt>
                    <img
                        v-if="props.user && props.user.avatar"
                        :src="props.user.avatar"
                    />
                </dt>
                <dd>
                    <like theme="outline" size="16" fill="#666" />
                </dd>
                <dd>
                    <home
                        v-if="props.type === 'site'"
                        theme="outline"
                        size="16"
                        fill="#666"
                    />
                    <github-one
                        v-else-if="props.type === 'code'"
                        theme="outline"
                        size="16"
                        fill="#666"
                    />
                </dd>
            </dl>
        </div>
        <div class="vue-design-item-info">
            <h5>{{ props.title }}</h5>
            <p>{{ props.description }}</p>
            <div class="vue-design-item-tags">
                <span v-for="t in props.tags" :key="t">
                    {{ t }}
                </span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps, withDefaults, computed } from 'vue';
import {
    GithubOne,
    Home,
    Like,
    ThumbsUp,
    ThumbsDown,
} from '@icon-park/vue-next';
// import { chrome-outlined} from '<chrome-outlined />'

interface UserData {
    avatar: string;
    username: string;
}
type SiteType = 'site' | 'code';
interface ItemData {
    id?: number;
    thumb: string;
    title: string;
    description: string;
    tags: string[];
    user: UserData | null;
    type: SiteType;
    imgs?: string[];
    logo?: string;
    siteUrl: string;
    codeUrl: string;
    star: string;
}
const props = withDefaults(defineProps<ItemData>(), {
    thumbUrl: '',
    title: '',
    description: '',
    tags: () => [],
    user: () => ({
        avatar: 'string',
        username: 'string',
    }),
    type: 'site',
    imgs: () => [],
    logo: '',
    siteUrl: '',
});

const thumbStyle = computed(() => {
    if (!props.thumbUrl) {
        return {};
    }
    return {
        backgroundImage: `url(${props.thumbUrl})`,
    };
});
</script>

<style lang="scss" scoped>
.vue-design-item-inner {
    width: 256px;
    height: 230px;
    position: relative;
}

.vue-design-item-thumb {
    // background
    width: inherit;
    height: 0;
    padding-top: 50%;
    border-radius: 3px;
    overflow: hidden;
    position: relative;
    background-color: #cad6dc;
    z-index: 0;
}

.vue-design-item-thumb a {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: inherit;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    opacity: 0.8;
    transition: opacity 0.3s;
    display: flex;
    justify-content: center;
    align-items: center;
}

.vue-design-item-info {
    padding: 18px 8px 8px 8px;
    height: 94px;
    z-index: 0;
    position: relative;
    h5,
    p {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        color: rgba(128, 128, 128, 1);
        margin: 0;
    }
    h5 {
        font-size: 14px;
        height: 20px;
        line-height: 20px;
    }
    p {
        font-size: 12px;
        height: 18px;
        line-height: 18px;
        margin-top: 1px;
    }
}

.vue-design-item-tools {
    height: 28px;
    width: 100%;
    top: 114px;
    left: 0;
    position: absolute;
    padding: 0 8px;
    z-index: 3;
    dl {
        display: flex;
        justify-content: space-between;
        width: inherit;
        height: inherit;
        dd,
        dt {
            width: 28px;
            height: 28px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            background-color: #eff3f5;
            cursor: pointer;
        }
        dt {
            img {
                display: block;
                border-radius: 50%;
                width: 100%;
                height: 100%;
            }
        }
        dd {
            > span {
                display: flex;
            }
        }
    }
}

.vue-design-item-tags {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    margin-top: 4px;
    span {
        display: inline-block;
        height: 20px;
        line-height: 20px;
        padding: 0 5px;
        background-color: #f5f6f7;
        margin-right: 6px;
        border-radius: 2px;
        color: rgba(128, 128, 128, 1);
        font-size: 12px;
    }
}
</style>
