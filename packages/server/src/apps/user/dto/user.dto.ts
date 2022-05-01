import { ApiProperty } from '@nestjs/swagger';

export class findUserItemQuery {
    @ApiProperty({
        required: false
    })
    username?: string;

    @ApiProperty({
        required: false
    })
    phone?: string

    @ApiProperty({
        required: false
    })
    id?: number
};