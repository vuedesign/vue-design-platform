import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { CreateTagDto } from './create-tag.dto';

export class TagListQueryDto extends PartialType(CreateTagDto) {
    @ApiProperty({
        description: '每页数量',
        default: 20,
        required: false,
        type: 'int',
    })
    size?: number = 20;

    @ApiProperty({
        description: '当前页数',
        default: 1,
        required: false,
        type: 'int',
    })
    page?: number = 1;

    @ApiProperty({
        description: '排序',
        default: 'updatedAt DESC',
        required: false,
        type: 'string',
    })
    order?: string;
}
