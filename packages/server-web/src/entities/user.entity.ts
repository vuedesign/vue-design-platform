import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  Generated,
  OneToMany,
} from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { SiteEntity } from './site.entity';

@ObjectType()
@Entity('user')
export class UserEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn({
    comment: '用户id',
  })
  id: number;

  @Field()
  @Column({
    comment: 'uuid',
  })
  @Generated('uuid')
  uuid: string;

  @Field()
  @Column({
    type: 'varchar',
    width: 255,
    nullable: false,
    comment: '用户名',
  })
  username: string;

  @Field()
  @Column({
    type: 'varchar',
    width: 255,
    nullable: true,
    comment: '昵称',
  })
  nickname: string;

  @Field()
  @Column({
    type: 'varchar',
    width: 255,
    nullable: true,
    comment: '邮件',
  })
  email: string;

  @Field()
  @Column({
    type: 'varchar',
    width: 255,
    nullable: true,
    comment: '手机号',
  })
  phone: string;

  @Field()
  @Column({
    type: 'varchar',
    width: 255,
    nullable: true,
    comment: '密码',
  })
  password: string;

  @Field()
  @Column({
    type: 'varchar',
    width: 255,
    nullable: true,
    comment: '头像',
  })
  avatar: string;

  @Field()
  @Column({
    name: 'status',
    type: 'int',
    width: 1,
    nullable: true,
    comment: '是否可用：1-可用，2-不可用',
  })
  status: number;

  @Field()
  @Column({
    type: 'int',
    width: 1,
    nullable: true,
    comment: '角色：1-超级管理员，2-管理员，3-普通用户',
  })
  rule: number;

  @Field()
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    nullable: true,
    comment: '添加时间',
  })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    nullable: true,
    comment: '更新时间',
  })
  updatedAt: Date;

  @OneToMany(() => SiteEntity, (site) => site.author)
  sites: SiteEntity[];
}
