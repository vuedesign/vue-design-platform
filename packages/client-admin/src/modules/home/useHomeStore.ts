import { HOME_STORE_KEY } from '@/configs/storeKeys';
import { DataUser, Share, Trophy, PreviewOpen } from '@icon-park/vue-next';
import { findCountData } from './api';
import { ConcreteComponent, ShallowRef, Ref } from 'vue';

interface HomeCountList {
    key: string;
    timer: any;
    title: string;
    default: Ref<number>;
    number: Ref<number>;
    icon: ConcreteComponent;
    bgColor: string;
    fontColor: string;
}

function runNumberTick(homeCountList: HomeCountList[]) {
    setTimeout(() => {
        homeCountList.forEach((item) => {
            item.timer = setInterval(() => {
                const len = item.number.value.toString().length;
                const num = Number(
                    new Array(len)
                        .fill(1)
                        .map((item, index) => (index > 0 ? 0 : 1))
                        .join(''),
                );
                if (item.number.value > num - 1) {
                    item.default.value = item.default.value + num;
                    item.number.value = item.number.value - num;
                }
                if (item.number.value === 0) {
                    clearInterval(item.timer);
                }
            }, 50);
        });
    }, 200);
}

export default defineStore(HOME_STORE_KEY, () => {
    const homeCountList: ShallowRef<HomeCountList[]> = shallowRef([
        {
            key: 'user',
            timer: null,
            title: '用户数',
            default: ref(0),
            number: ref(0),
            icon: DataUser,
            bgColor: '#C7D9FC',
            fontColor: '#316EE8',
        },
        {
            key: 'site',
            timer: null,
            title: '分享数',
            default: ref(0),
            number: ref(0),
            icon: Share,
            bgColor: '#BDEBB0',
            fontColor: '#2DAB0A',
        },
        {
            key: 'navigation',
            timer: null,
            title: '推荐数',
            default: ref(0),
            number: ref(0),
            icon: Trophy,
            bgColor: '#FCE2C2',
            fontColor: '#D97C0B',
        },
        {
            key: 'view',
            timer: null,
            title: '浏览量',
            default: ref(0),
            number: ref(2424),
            icon: PreviewOpen,
            bgColor: '#FCC2F6',
            fontColor: '#DB1AC8',
        },
    ]);
    const count = reactive({
        user: 0,
    });
    const findCount = async () => {
        const count = await findCountData();
        if (!count) {
            return;
        }
        console.log('findUserCount:', count);

        homeCountList.value.forEach((item) => {
            item.number.value = count[item.key];
        });
        runNumberTick(homeCountList.value);
    };
    return {
        findCount,
        count,
        homeCountList,
    };
});
