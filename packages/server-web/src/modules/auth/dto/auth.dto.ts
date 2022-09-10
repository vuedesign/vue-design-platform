import { ApiProperty } from '@nestjs/swagger';

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
