import { ApiProperty } from '@nestjs/swagger';

export enum Status {
  ALL = '',
  AVAILABLE = 1,
  DISABLE = 2,
}

export class ListQueryDto {
  @ApiProperty({
    description: '每页数量',
    default: 20,
    type: Number,
    required: false,
  })
  size?: number;

  @ApiProperty({
    description: '当前页数',
    default: 1,
    type: Number,
    required: false,
  })
  page?: number;

  @ApiProperty({
    description: '状态',
    default: '',
    enum: [1, 2],
    required: false,
  })
  status?: Status;
}
