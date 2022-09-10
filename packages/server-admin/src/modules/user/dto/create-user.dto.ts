import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    id: number;

    uuid: string;

    @ApiProperty({
        description: '用户名',
    })
    username: string;

    @ApiProperty({
        description: '头像',
    })
    avatar: string;

    @ApiProperty({
        description: '昵称',
        required: false,
    })
    nickname: string;

    @ApiProperty({
        description: '邮箱',
        required: false,
    })
    email: string;

    @ApiProperty({
        description: '手机号',
        required: false,
    })
    phone: string;

    @ApiProperty({
        description: '用户密码',
        required: true,
    })
    password: string;

    @ApiProperty({
        name: 'is_show',
        default: 1,
        description: '是否可用：1-可用，2-不可用',
        required: true,
    })
    isShow: number;

    @ApiProperty({
        default: 3,
        description: '角色：1-超级管理员，2-管理员，3-普通用户',
        required: true,
    })
    rule: number;

    createdAt: Date;

    updatedAt: Date;
}
