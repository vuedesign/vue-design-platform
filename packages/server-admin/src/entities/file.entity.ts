import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    Generated,
    UpdateDateColumn,
    CreateDateColumn,
} from 'typeorm';

@Entity('file')
export class FileEntity {
    @PrimaryGeneratedColumn({
        comment: '文件id',
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
        comment: '原文件名称',
    })
    originalname: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: true,
        comment: '文件名称',
    })
    filename: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: true,
        comment: '文件描述',
    })
    description: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: true,
        comment: '文件路径',
    })
    path: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: true,
        comment: '文件路径',
    })
    size: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: true,
        comment: '文件类型',
    })
    mimetype: string;

    @Column({
        type: 'int',
        width: 1,
        nullable: true,
        comment:
            '文件类型：1-图片（png、jpeg），2-动图（gif），3-视频（mp4），4-音频(mp3)，5-文件（zip、rar）',
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
