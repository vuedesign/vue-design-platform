import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('tag')
export class TagEntity {
  @PrimaryGeneratedColumn({
    comment: '标签id',
  })
  id: number;

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
    comment: '标签描述',
  })
  description: string;

  @Column({
    type: 'int',
    width: 1,
    nullable: true,
    comment: '标签类型：1-项目，2-页面，3-服务，4-组件',
  })
  type: number;

  @Column({
    type: 'int',
    width: 11,
    nullable: true,
    comment: '作者id',
    name: 'author_id',
  })
  authorId: number;

  @Column({
    type: 'int',
    width: 1,
    nullable: true,
    comment: '是否可用：1-可用，2-不可用',
  })
  status: number;

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
