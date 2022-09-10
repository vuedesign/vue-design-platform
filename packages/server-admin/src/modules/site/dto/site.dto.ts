import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, IsInt, IsNotEmpty, isNumberString } from 'class-validator';

export enum SiteType {
    // ALL = '',
    CODE = 'code',
    SITE = 'site',
}

export enum SiteStatus {
    ALL = '',
    AVAILABLE = 1,
    DISABLE = 2,
}

// title, type, status, size, page, order
export class SiteListQueryDto {
    @ApiProperty({
        description: '每页数量',
        default: 20,
        type: Number,
        required: false,
    })
    size?: number;

    @ApiProperty({
        description: '当前页数',
        default: 1,
        type: Number,
        required: false,
    })
    page?: number;

    @ApiProperty({
        description: '排序',
        default: 'updatedAt DESC',
        required: false,
    })
    order?: string;

    @ApiProperty({
        description: '类型',
        default: '',
        enum: ['site', 'code'],
        required: false,
    })
    type?: SiteType;

    @ApiProperty({
        description: '标题',
        default: '',
        required: false,
    })
    title?: string;

    @ApiProperty({
        description: '状态',
        default: '',
        enum: [1, 2],
        required: false,
    })
    status?: SiteStatus;
}
