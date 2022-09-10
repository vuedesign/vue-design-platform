import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateNavigationDto {
    @ApiProperty({
        default: 1,
        description: 'siteId',
    })
    siteId: number;

    @ApiProperty({
        description: '导航',
    })
    @IsNotEmpty({
        message: '导航不能为空！',
    })
    @IsString()
    title: string;

    @ApiProperty({
        description: '项目描述',
    })
    @IsString()
    description?: string;

    @ApiProperty({
        default: 1,
        description: '排序',
    })
    order: number;

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
        default: 1,
        description: '是否可用：1-可用，2-不可用',
    })
    status: number;

    createdAt?: Date;

    updatedAt?: Date;
}
