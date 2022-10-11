import { ApiProperty } from '@nestjs/swagger';
import { ListQueryDto } from '@/dtos/query.dto';

export class ConfigureListQueryDto extends ListQueryDto {
    @ApiProperty({
        description: '搜索',
        required: false,
        type: String,
        default: '',
    })
    search?: string;
}

export class findConfigureItemQuery {
    @ApiProperty({
        required: false,
    })
    id?: number;
    @ApiProperty({
        required: false,
    })
    key?: string;

    @ApiProperty({
        required: false,
    })
    value?: string;
}
