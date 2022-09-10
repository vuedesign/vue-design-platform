import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    CreateDateColumn,
    Generated,
} from 'typeorm';

@Entity('navigation')
export class NavigationEntity {
    @PrimaryGeneratedColumn({
        comment: '站点id',
    })
    id: number;

    @Column({
        type: 'int',
        width: 11,
        nullable: false,
        comment: '站点id',
        name: 'site_id',
    })
    siteId: number;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
        comment: '站点地址',
        name: 'site_url',
    })
    siteUrl: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
        comment: '站点地址',
        name: 'icon_url',
    })
    iconUrl: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
        comment: '名称 (标题)',
    })
    title: string;

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
        nullable: false,
        comment: '排序',
    })
    order: number;

    @Column({
        type: 'int',
        width: 1,
        nullable: false,
        comment: '是否可用：1-可用，2-不可用',
    })
    status: number;

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
