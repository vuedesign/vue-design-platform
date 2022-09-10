import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    CreateDateColumn,
} from 'typeorm';

@Entity('count')
export class CountEntity {
    @PrimaryGeneratedColumn({
        comment: '作者id',
    })
    id: number;

    @Column({
        type: 'int',
        width: 11,
        nullable: false,
        comment: '作者id',
        name: 'author_id',
    })
    authorId: number;

    @Column({
        type: 'int',
        width: 11,
        nullable: false,
        comment: '站点',
    })
    sites: number;

    @Column({
        type: 'int',
        width: 11,
        nullable: false,
        comment: '浏览量',
    })
    views: number;

    @Column({
        type: 'int',
        width: 11,
        nullable: false,
        comment: '收藏量',
    })
    collections: number;

    @Column({
        type: 'int',
        width: 11,
        nullable: false,
        comment: '顶',
    })
    top: number;

    @Column({
        type: 'int',
        width: 11,
        nullable: false,
        comment: '踩',
    })
    down: number;

    @Column({
        type: 'varchar',
        width: 36,
        nullable: false,
        comment: '类型: site code',
    })
    type: string;

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamp',
        nullable: false,
        comment: '添加时间',
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at',
        type: 'timestamp',
        nullable: false,
        comment: '更新时间',
    })
    updatedAt: Date;
}
