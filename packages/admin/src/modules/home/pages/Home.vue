<template>
    <div class="page-home-container">
        <div class="page-home-header">
            <dl
                v-for="(item, index) in homeCardList"
                :key="index"
                :style="{ backgroundColor: `${item.bgColor}` }"
            >
                <dt>
                    <span :style="{ color: item.fontColor }">
                        <iconpark-icon
                            :name="item.icon"
                            :size="32"
                        ></iconpark-icon>
                    </span>
                    <span class="title">{{ item.title }}</span>
                </dt>
                <dd>
                    <p>{{ item.default }}</p>
                </dd>
            </dl>
            <dl class="tow left"></dl>
            <dl class="tow right"></dl>
        </div>
        <div class="page-home-body">
            <vd-card class="page-home-left">left</vd-card>
            <vd-card class="page-home-right">right</vd-card>
        </div>
    </div>
    <!-- <vd-card class="page-home">
        <template #default>
            <div class="page-home-container">home</div>
        </template>
    </vd-card> -->
</template>
<script lang="ts">
export default {
    name: 'page-home',
};
</script>
<script lang="ts" setup>
import VdCard from '../../global/components/VdCard.vue';
// import styles from '../styles/Home.module.scss';
interface HomeCardList {
    timer: any;
    title: string;
    default: number;
    number: number;
    icon: string;
    bgColor: string;
    fontColor: string;
}
const homeCardList: HomeCardList[] = reactive([
    {
        timer: null,
        title: '用户数',
        default: 0,
        number: 988,
        icon: 'data-user',
        bgColor: '#C7D9FC',
        fontColor: '#316EE8',
    },
    {
        timer: null,
        title: '分享数',
        default: 0,
        number: 1918,
        icon: 'share',
        bgColor: '#BDEBB0',
        fontColor: '#2DAB0A',
    },
    {
        timer: null,
        title: '推荐数',
        default: 0,
        number: 44,
        icon: 'trophy',
        bgColor: '#FCE2C2',
        fontColor: '#D97C0B',
    },
    {
        timer: null,
        title: '浏览量',
        default: 0,
        number: 22983,
        icon: 'preview-open',
        bgColor: '#FCC2F6',
        fontColor: '#DB1AC8',
    },
]);

function runNumberTick(homeCardList: HomeCardList[]) {
    homeCardList.forEach((item) => {
        item.timer = setInterval(() => {
            const len = item.number.toString().length;
            const num = Number(
                new Array(len)
                    .fill(1)
                    .map((item, index) => (index > 0 ? 0 : 1))
                    .join(''),
            );
            if (item.number > num - 1) {
                item.default = item.default + num;
                item.number = item.number - num;
            }
            if (item.number === 0) {
                clearInterval(item.timer);
            }
        }, 50);
    });
}

runNumberTick(homeCardList);
</script>

<style scoped lang="scss">
.page-home-container {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.page-home-header {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    justify-content: space-between;
    grid-column-gap: 16px;
    grid-row-gap: 16px;
    dl {
        border-radius: 8px;
        padding: 24px;
        height: 160px;
        box-sizing: border-box;
        flex: 1;
        &.tow {
            background-color: #fff;
            grid-row: 2;
            grid-template-rows: auto;
        }
        &.left {
            grid-column-start: 1;
            grid-column-end: 3;
        }
        &.right {
            grid-column-start: 3;
            grid-column-end: 5;
        }
    }

    dt {
        > span {
            display: inline-block;
            vertical-align: bottom;
            height: 32px;
            &.title {
                color: #666;
                font-size: 24px;
                height: 24px;
                line-height: 24px;
                margin-left: 8px;
            }
        }
    }

    dd {
        margin: 0;
        padding-top: 25px;
        p {
            color: #fff;
            font-size: 64px;
            line-height: 64px;
            height: auto;
            text-align: right;
        }
    }
}
.page-home-body {
    flex: 1;
    width: 100%;
    margin-top: 16px;
    display: grid;
    grid-row-gap: 16px;
    grid-column-gap: 16px;
    grid-template-columns: 2fr 2fr;
}
.page-home-left,
.page-home-right {
    background-color: #fff;
}
</style>
