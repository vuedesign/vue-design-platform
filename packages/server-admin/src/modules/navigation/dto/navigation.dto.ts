import { ApiProperty } from '@nestjs/swagger';
import { ListQueryDto } from '@/dtos/query.dto';

export class NavigationListDto extends ListQueryDto {
    @ApiProperty({
        description: '排序',
        required: false,
        type: String,
        default: 'updatedAt DESC',
    })
    order?: string;

    @ApiProperty({
        description: '站点Id',
        type: Number,
        required: false,
    })
    siteId?: number;

    @ApiProperty({
        description: '站点名称',
        type: String,
        required: false,
    })
    title?: string;
}
