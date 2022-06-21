import {
  BaseService,
  IPaginationResponse,
  IPaginationQuery,
} from '@/globals/services/base.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileEntity } from '@/entities/file.entity';

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

  findList(query: IPaginationQuery): Promise<IPaginationResponse> {
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

  remove(id: number) {
    return this.fileRepository.delete(id);
  }

  count() {
    return this.fileRepository.count();
  }
}
