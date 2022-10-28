import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, IsInt, IsNotEmpty, isNumberString } from 'class-validator';

export enum FileType {
    // ALL = '',
    CODE = 'code',
    SITE = 'site',
}

export enum FileStatus {
    ALL = '',
    AVAILABLE = 1,
    DISABLE = 2,
}

// title, type, status, size, page, order
export class FileListQueryDto {
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
        description: '状态',
        default: '',
        enum: [1, 2],
        required: false,
    })
    status?: FileStatus;
}

export class UpdateFieldDto {
    @ApiProperty({
        description: '要更新的字段',
    })
    field: string;

    @ApiProperty({
        description: '要更新的数据',
    })
    value: string;

    @ApiProperty({
        description: '数据类型',
    })
    type: string;
}
