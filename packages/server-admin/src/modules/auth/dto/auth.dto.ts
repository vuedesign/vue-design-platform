import { ApiProperty } from '@nestjs/swagger';
import { Request } from 'express';
import { UserEntity } from '@/entities/user.entity';

export class LoginBodyDto {
    @ApiProperty({
        required: true,
    })
    account: string;

    @ApiProperty({
        required: true,
    })
    password: string;
}

export class LoginParam {
    [x: string]: string;
    password: string;
}

export interface AuthRequest extends Request {
    user: UserEntity;
}
