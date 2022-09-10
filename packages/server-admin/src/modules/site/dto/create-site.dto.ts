import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import { TagEntity } from '@/entities/tag.entity';

export class CreateSiteDto {
    @ApiProperty({
        description: '项目名称',
    })
    @IsNotEmpty({
        message: '项目名称不能为空！',
    })
    @IsString()
    title: string;

    @ApiProperty({
        description: '项目描述',
        required: false,
    })
    @IsString()
    description?: string;

    @ApiProperty({
        description: '封面 url',
    })
    @IsString()
    @IsNotEmpty({
        message: '项目封面不能为空！',
    })
    thumbUrl: string;

    @ApiProperty({
        description: 'logo url',
        required: false,
    })
    @IsString()
    logoUrl?: string;

    @ApiProperty({
        description: 'icon url',
        required: false,
    })
    @IsString()
    iconUrl?: string;

    @ApiProperty({
        description: '网站 url',
        required: false,
    })
    @IsString()
    siteUrl?: string;

    @ApiProperty({
        description: '代码 url',
    })
    @IsString()
    codeUrl?: string;

    @ApiProperty({
        default: 2,
        description: '作者id',
    })
    authorId?: number;

    @ApiProperty({
        default: 0,
        description: '浏览量',
    })
    views: number;

    @ApiProperty({
        default: 0,
        description: '收藏量',
    })
    collections: number;

    @ApiProperty({
        default: 0,
        description: '顶',
    })
    top: number;

    @ApiProperty({
        default: 0,
        description: '踩',
    })
    down: number;

    @ApiProperty({
        description: '类型: site code',
    })
    @IsString()
    type: string;

    @ApiProperty({
        default: 1,
        description: '是否可用：1-可用，2-不可用',
    })
    status: number;

    tags: TagEntity[];

    createdAt?: Date;

    updatedAt?: Date;
}
