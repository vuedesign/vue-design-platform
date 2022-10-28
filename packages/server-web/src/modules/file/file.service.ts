import {
    BaseService,
    IPaginationResponse,
    IPaginationOptions,
} from '@/globals/services/base.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileEntity } from '@/entities/file.entity';
import { UpdateFieldDto } from './dto/file.dto';

@Injectable()
export class FileService extends BaseService<FileEntity> {
    constructor(
        @InjectRepository(FileEntity)
        private readonly fileRepository: Repository<FileEntity>,
    ) {
        super(fileRepository);
    }

    create(createFile: CreateFileDto) {
        this.fileRepository.create(createFile);
        return this.fileRepository.save(createFile);
    }
}
