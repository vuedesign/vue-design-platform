import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, IsInt, IsNotEmpty, isNumberString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

export enum SiteType {
  // ALL = '',
  CODE = 'code',
  SITE = 'site',
}

export enum SiteStatus {
  ALL = '',
  AVAILABLE = 1,
  DISABLE = 2,
}

// title, type, status, size, page, order
@InputType()
export class SiteListInput {
  @Field(() => Number, { nullable: true, defaultValue: 20 })
  size?: number;

  @Field(() => Number, { nullable: true, defaultValue: 1 })
  page?: number;

  @Field(() => String, { nullable: true })
  order?: string;

  @Field(() => String, { nullable: true, defaultValue: '' })
  type?: string;

  @Field(() => String, { nullable: true, defaultValue: '' })
  title?: string;

  @Field(() => Number, { nullable: true, defaultValue: 1 })
  status?: number;
}
