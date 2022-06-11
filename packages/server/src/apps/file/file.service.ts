import { BaseService } from '@/globals/services/base.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileEntity } from '../../entities/file.entity';

@Injectable()
export class FileService extends BaseService {
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

  findAll() {
    return `This action returns all file`;
  }

  findOne(id: number) {
    return `This action returns a #${id} file`;
  }

  update(id: number, updateFileDto: UpdateFileDto) {
    return `This action updates a #${id} file`;
  }

  remove(id: number) {
    return `This action removes a #${id} file`;
  }
}
