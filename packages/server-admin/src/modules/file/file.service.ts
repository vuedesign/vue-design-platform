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

    findList(
        query: IPaginationOptions<FileEntity>,
    ): Promise<IPaginationResponse> {
        return this.findListAndPage(query);
    }

    findOne(query: any): Promise<FileEntity | undefined> {
        return this.fileRepository.findOne({
            where: query,
        });
    }

    update(id: number, updateUserDto: UpdateFileDto) {
        return this.fileRepository.update(id, updateUserDto);
    }

    updateField(id: number, updateField: UpdateFieldDto) {
        const value =
            updateField.type === 'number'
                ? Number(updateField.value)
                : updateField.value;
        return this.fileRepository.update(id, {
            [updateField.field]: value,
        });
    }

    remove(id: number) {
        return this.fileRepository.delete(id);
    }

    count() {
        return this.fileRepository.count();
    }
}
