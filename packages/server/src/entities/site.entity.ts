import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  Generated,
} from 'typeorm';

@Entity('site')
export class SiteEntity {
  @PrimaryGeneratedColumn({
    comment: '项目id',
  })
  id: number;

  @Column({
    comment: 'uuid',
  })
  @Generated('uuid')
  uuid: string;

  @Column({
    type: 'varchar',
    width: 255,
    nullable: false,
    comment: '项目名称',
  })
  name: string;

  @Column({
    type: 'varchar',
    width: 255,
    nullable: true,
    comment: '项目描述',
  })
  description: string;

  @Column({
    type: 'int',
    width: 11,
    nullable: true,
    comment: '作者id',
    name: 'author_id',
  })
  authorId: number;

  @Column({
    type: 'varchar',
    width: 255,
    nullable: true,
    comment: '标签ids: 1,2,3',
    name: 'tag_ids',
  })
  tagIds: string;

  @Column({
    name: 'is_show',
    type: 'int',
    width: 1,
    nullable: true,
    comment: '是否可用：1-可用，2-不可用',
  })
  isShow: number;

  @Column({
    name: 'thumb',
    type: 'varchar',
    width: 255,
    nullable: true,
    comment: '封面',
  })
  thumb: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    nullable: true,
    comment: '添加时间',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    nullable: true,
    comment: '更新时间',
  })
  updatedAt: Date;
}
