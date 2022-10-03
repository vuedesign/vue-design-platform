import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    CreateDateColumn,
    // ManyToMany,
    // JoinTable,
} from 'typeorm';
// import { SiteEntity } from './site.entity';

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

    // @ManyToMany(() => SiteEntity, (site) => site.tags, {
    //     cascade: ['insert', 'update', 'recover', 'soft-remove'],
    // })
    // @JoinTable()
    // sites: SiteEntity[];
}
