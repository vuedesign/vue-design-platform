import { ApiProperty } from '@nestjs/swagger';

export class CreateTagDto {
    id: number;

    @ApiProperty({
        description: '标签名称',
    })
    name: string;

    @ApiProperty({
        default: 1,
        description: '标签类型：1-项目，2-页面，3-服务，4-组件',
    })
    type: number;

    @ApiProperty({
        description: '标签描述',
    })
    description: string;

    @ApiProperty({
        default: 2,
        description: '作者id',
    })
    authorId: number;

    @ApiProperty({
        default: 1,
        description: '是否可用：1-可用，2-不可用',
    })
    isShow: number;

    createdAt: Date;

    updatedAt: Date;
}
