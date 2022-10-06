import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    CreateDateColumn,
} from 'typeorm';

@Entity('config')
export class ConfigEntity {
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
