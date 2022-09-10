import { PartialType, ApiProperty } from '@nestjs/swagger';
import { CreateNavigationDto } from './create-navigation.dto';

export class UpdateNavigationDto extends PartialType(CreateNavigationDto) {}

export class UpdateFieldDto {
    @ApiProperty({
        description: '要更新的字段',
    })
    field: string;

    @ApiProperty({
        description: '要更新的数据',
    })
    value: string;

    @ApiProperty({
        description: '数据类型',
    })
    type: string;
}
