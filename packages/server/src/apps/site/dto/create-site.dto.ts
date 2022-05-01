import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateSiteDto {
  id?: number;
  uuid?: string;

  @ApiProperty({
    description: '项目名称',
  })
  @IsNotEmpty({
    message: '项目名称不能为空！',
  })
  @IsString()
  name: string;

  @IsString()
  @ApiProperty({
    description: '项目描述',
  })
  description?: string;

  @IsString()
  @ApiProperty({
    description: '封面',
  })
  thumb?: string;

  @IsString()
  @ApiProperty({
    description: '标签',
  })
  tagIds?: string;

  @ApiProperty({
    default: 2,
    description: '作者id',
  })
  authorId?: number;

  @ApiProperty({
    default: 1,
    description: '是否可用：1-可用，2-不可用',
  })
  isShow?: number;

  createdAt?: Date;

  updatedAt?: Date;
}
