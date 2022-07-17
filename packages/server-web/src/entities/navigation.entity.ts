import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  Generated,
} from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('navigation')
export class NavigationEntity {
  @Field((type) => Int)
  @PrimaryGeneratedColumn({
    comment: '站点id',
  })
  id: number;

  @Field((type) => Int)
  @Column({
    type: 'int',
    width: 11,
    nullable: false,
    comment: '站点id',
    name: 'site_id',
  })
  siteId: number;

  @Field((type) => String)
  @Column({
    type: 'varchar',
    width: 255,
    nullable: false,
    comment: '站点地址',
    name: 'site_url',
  })
  siteUrl: string;

  @Field((type) => String)
  @Column({
    type: 'varchar',
    width: 255,
    nullable: false,
    comment: '站点地址',
    name: 'icon_url',
  })
  iconUrl: string;

  @Field((type) => String)
  @Column({
    type: 'varchar',
    width: 255,
    nullable: false,
    comment: '名称 (标题)',
  })
  title: string;

  @Field((type) => String)
  @Column({
    type: 'varchar',
    width: 255,
    nullable: false,
    comment: '项目描述',
  })
  description: string;

  @Field((type) => String)
  @Column({
    type: 'int',
    width: 11,
    nullable: false,
    comment: '排序',
  })
  order: number;

  @Field((type) => String)
  @Column({
    type: 'int',
    width: 1,
    nullable: false,
    comment: '是否可用：1-可用，2-不可用',
  })
  status: number;

  @Field((type) => String)
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    nullable: false,
    comment: '添加时间',
  })
  createdAt: Date;

  @Field((type) => String)
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    nullable: false,
    comment: '更新时间',
  })
  updatedAt: Date;
}
