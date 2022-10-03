import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    CreateDateColumn,
    OneToMany,
    OneToOne,
} from 'typeorm';
import { SiteEntity } from './site.entity';

@Entity('tool')
export class ToolEntity {
    @PrimaryGeneratedColumn({
        comment: '点赞id',
    })
    id: number;

    @Column({
        type: 'int',
        name: 'author_id',
        width: 11,
        nullable: false,
        comment: '用户id',
    })
    authorId: number;

    @Column({
        type: 'int',
        name: 'site_id',
        width: 11,
        nullable: false,
        comment: '站点id',
    })
    siteId: number;

    @Column({
        type: 'int',
        width: 1,
        nullable: true,
        default: 0,
        comment: '收藏 1-收藏，0',
    })
    collections: number;

    @Column({
        type: 'int',
        width: 1,
        nullable: true,
        default: 0,
        comment: '顶 1-顶，0',
    })
    top: number;

    @Column({
        type: 'int',
        width: 1,
        nullable: true,
        default: 0,
        comment: '踩 1-踩，0',
    })
    down: number;

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
