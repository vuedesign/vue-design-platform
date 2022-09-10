import { ApiProperty } from '@nestjs/swagger';

export class CreateTagDto {
    id: number;

    @ApiProperty({
        description: '标签名称',
    })
    name: string;

    @ApiProperty({
        description: '标签描述',
    })
    description: string;

    @ApiProperty({
        default: 1,
        description: '是否可用：1-可用，2-不可用',
    })
    status: number;

    createdAt: Date;

    updatedAt: Date;
}
