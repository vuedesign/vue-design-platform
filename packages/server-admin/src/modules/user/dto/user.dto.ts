import { ApiProperty } from '@nestjs/swagger';
import { ListQueryDto } from '@/dtos/query.dto';

export class UserListQueryDto extends ListQueryDto {
    @ApiProperty({
        description: '排序',
        required: false,
        type: String,
        default: 'updatedAt DESC',
    })
    order?: string;

    @ApiProperty({
        description: '搜索',
        required: false,
        type: String,
        default: '',
    })
    search?: string;

    @ApiProperty({
        description: '角色',
        required: false,
        type: Number,
    })
    rule?: number;
}

export class findUserItemQuery {
    @ApiProperty({
        required: false,
    })
    username?: string;

    @ApiProperty({
        required: false,
    })
    phone?: string;

    @ApiProperty({
        required: false,
    })
    id?: number;
}
