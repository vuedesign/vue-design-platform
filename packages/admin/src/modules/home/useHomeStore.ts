import { HOME_STORE_KEY } from '@/configs/storeKeys';
import { findCountData } from './api';

interface HomeCountList {
    key: string;
    timer: any;
    title: string;
    default: number;
    number: number;
    icon: string;
    bgColor: string;
    fontColor: string;
}

function runNumberTick(homeCountList: HomeCountList[]) {
    setTimeout(() => {
        homeCountList.forEach((item) => {
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
    }, 200);
}

export default defineStore(HOME_STORE_KEY, () => {
    const homeCountList: HomeCountList[] = reactive([
        {
            key: 'user',
            timer: null,
            title: '用户数',
            default: 0,
            number: 0,
            icon: 'data-user',
            bgColor: '#C7D9FC',
            fontColor: '#316EE8',
        },
        {
            key: 'site',
            timer: null,
            title: '分享数',
            default: 0,
            number: 1918,
            icon: 'share',
            bgColor: '#BDEBB0',
            fontColor: '#2DAB0A',
        },
        {
            key: 'navigation',
            timer: null,
            title: '推荐数',
            default: 0,
            number: 44,
            icon: 'trophy',
            bgColor: '#FCE2C2',
            fontColor: '#D97C0B',
        },
        {
            key: 'view',
            timer: null,
            title: '浏览量',
            default: 0,
            number: 22983,
            icon: 'preview-open',
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
        homeCountList.forEach((item) => {
            item.number = count[item.key];
        });
        runNumberTick(homeCountList);
    };
    return {
        findCount,
        count,
        homeCountList,
    };
});
