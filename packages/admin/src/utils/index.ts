import { dayjs } from 'element-plus';

export function watting(time: number) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
}

export function dateFormat(date: string, format?: string) {
    return dayjs(date).format(format || 'YYYY-MM-DD HH:mm:ss');
}
