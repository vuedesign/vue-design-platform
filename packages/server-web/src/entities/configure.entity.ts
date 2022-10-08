import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    CreateDateColumn,
} from 'typeorm';

@Entity('configure')
export class ConfigureEntity {
    @PrimaryGeneratedColumn({
        comment: '配置id',
    })
    id: number;

    @Column({
        type: 'varchar',
        width: 36,
        nullable: true,
        comment: '配置组',
    })
    group: string;

    @Column({
        type: 'varchar',
        width: 100,
        nullable: false,
        comment: '配置键',
    })
    key: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
        comment: '配置值',
    })
    value: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: true,
        comment: '链接',
    })
    link: string;

    @Column({
        type: 'int',
        width: 1,
        nullable: false,
        comment: '是否可用：1-可用，2-不可用',
        default: 1,
    })
    status: number;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: true,
        comment: '配置备注',
    })
    remark: string;

    @Column({
        type: 'text',
        width: 60000,
        nullable: true,
        comment: '配置备注',
    })
    content: string;

    @Column({
        type: 'int',
        width: 3,
        nullable: true,
        comment: '排序',
        default: 1,
    })
    order: number;

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
