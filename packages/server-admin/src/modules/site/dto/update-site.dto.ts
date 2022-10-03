import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateSiteDto } from './create-site.dto';

export class UpdateSiteDto extends PartialType(CreateSiteDto) {}

export class UpdateFieldDto {
    @ApiProperty({
        description: '要更新的字段',
    })
    field: string;

    @ApiProperty({
        description: '要更新的数据',
    })
    value: string | number;

    @ApiProperty({
        description: '数据类型',
    })
    type: string;
}
