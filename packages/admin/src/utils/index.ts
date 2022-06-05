export function watting(time: number) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
}
