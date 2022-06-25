// 状态
export enum STATUS {
    ALL = '',
    AVAILABLE = 1,
    DISABLE = 2,
}

export const statusMap = new Map([
    [STATUS.ALL, '全部'],
    [STATUS.AVAILABLE, '可用'],
    [STATUS.DISABLE, '禁用'],
]);

// 文件类型：1-图片（png、jpeg），2-动图（gif），3-音频（mp3），4-视频(mp4)，5-文件（zip、rar）
export enum TYPE {
    ALL = '',
    IMAGE = 1,
    GIF = 2,
    MP3 = 3,
    MP4 = 4,
    ZIP = 5,
}

export const typeMap = new Map([
    [TYPE.ALL, '全部类型'],
    [TYPE.IMAGE, '图片（png、jpeg）'],
    [TYPE.GIF, '动图（gif）'],
    [TYPE.MP3, '音频（mp3）'],
    [TYPE.MP4, '音频（mp4）'],
    [TYPE.ZIP, '文件（zip、rar）'],
]);
