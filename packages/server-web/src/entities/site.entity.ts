import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  Generated,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@Entity('site')
@ObjectType()
export class SiteEntity {
  @Field((type) => Int)
  @PrimaryGeneratedColumn({
    comment: '项目id',
  })
  id: number;

  @Field()
  @Column({
    width: 36,
    nullable: false,
    comment: '对外暴露 uuid',
  })
  @Generated('uuid')
  uuid: string;

  @Field()
  @Column({
    type: 'varchar',
    width: 255,
    nullable: false,
    comment: '名称 (标题)',
  })
  title: string;

  @Field()
  @Column({
    type: 'varchar',
    width: 255,
    nullable: false,
    comment: '封面 url',
    name: 'thumb_url',
  })
  thumbUrl: string;

  @Field((type) => Int, { nullable: true })
  @Column({
    type: 'varchar',
    width: 255,
    nullable: true,
    comment: 'logo url',
    name: 'logo_url',
  })
  logoUrl?: string;

  @Field((type) => Int, { nullable: true })
  @Column({
    type: 'varchar',
    width: 255,
    nullable: true,
    comment: 'icon url',
    name: 'icon_url',
  })
  iconUrl?: string;

  @Field((type) => Int, { nullable: true })
  @Column({
    type: 'varchar',
    width: 255,
    nullable: true,
    comment: '网站 url',
    name: 'site_url',
  })
  siteUrl?: string;

  @Field((type) => Int, { nullable: true })
  @Column({
    type: 'varchar',
    width: 255,
    nullable: true,
    comment: '代码 url',
    name: 'code_url',
  })
  codeUrl: string;

  @Field((type) => Int, { nullable: true })
  @Column({
    type: 'varchar',
    width: 255,
    nullable: true,
    comment: '项目描述',
  })
  description: string;

  @Field()
  @Column({
    type: 'int',
    width: 11,
    nullable: false,
    comment: '作者id',
    name: 'author_id',
  })
  authorId: number;

  @Field((type) => Int, { nullable: true })
  @Column({
    type: 'varchar',
    width: 255,
    nullable: true,
    comment: '标签ids: 1,2,3',
    name: 'tag_ids',
  })
  tagIds: string;

  @Field()
  @Column({
    type: 'int',
    width: 11,
    nullable: false,
    comment: '浏览量',
  })
  views: number;

  @Field()
  @Column({
    type: 'int',
    width: 11,
    nullable: false,
    comment: '收藏量',
  })
  collections: number;

  @Field()
  @Column({
    type: 'int',
    width: 11,
    nullable: false,
    comment: '顶',
  })
  top: number;

  @Field()
  @Column({
    type: 'int',
    width: 11,
    nullable: false,
    comment: '踩',
  })
  down: number;

  @Field()
  @Column({
    type: 'varchar',
    width: 36,
    nullable: false,
    comment: '类型: site code',
  })
  type: string;

  @Field()
  @Column({
    type: 'int',
    width: 1,
    nullable: false,
    comment: '是否可用：1-可用，2-不可用',
  })
  status: number;

  @Field()
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    nullable: false,
    comment: '添加时间',
  })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    nullable: false,
    comment: '更新时间',
  })
  updatedAt: Date;

  // @Field()
  @ManyToOne(() => UserEntity, (user) => user.sites)
  @JoinColumn({
    name: 'author_id',
  })
  author: UserEntity;
}
