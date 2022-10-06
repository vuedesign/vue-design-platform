import {
    IPaginationOptions,
    IPaginationResponse,
} from '@/globals/services/base.service';
import { SiteEntity } from '@/entities/site.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Repository, FindManyOptions, FindOptionsWhere } from 'typeorm';
import { Transform } from 'class-transformer';
import { IsString, IsInt, IsNotEmpty, isNumberString } from 'class-validator';

export type IOptions = IPaginationOptions<SiteEntity>;
export type IWhere = FindOptionsWhere<SiteEntity>;
export type IRepository = Repository<SiteEntity>;
export type IResponse = IPaginationResponse<SiteEntity>;

export enum SiteType {
    ALL = 'all',
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
        description: '排除uuid',
        type: Number,
        required: false,
    })
    uuid?: string;

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

    @ApiProperty({
        description: '作者id',
        required: false,
    })
    authorId?: number;
}
