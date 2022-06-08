import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class SiteListQueryDto {
  @ApiProperty({
    description: '每页数量',
    default: 20,
    required: false,
    type: 'int',
  })
  // @Transform(({ value }) => Number(value), { toClassOnly: true })
  size: number;

  @ApiProperty({
    description: '当前页数',
    default: 1,
    required: false,
    type: 'int',
  })
  // @Transform(({ value }) => Number(value), { toClassOnly: true })
  page: number;

  @ApiProperty({
    description: '排序',
    default: 'updatedAt DESC',
    required: false,
    type: 'string',
  })
  order: string;

  @ApiProperty({
    description: '标签过滤',
    default: 0,
    required: false,
    type: 'int',
  })
  // @Transform(
  //   ({ value }) => {
  //     console.log('Number(value)', value);
  //     return Number(value);
  //   },
  //   { toClassOnly: true },
  // )
  tagId?: number;
}
