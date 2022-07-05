import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileService } from './file.service';
import { OssService } from './oss.service';
import { QiniuService } from './qiniu.service';
import { FileController } from './file.controller';
import { FileEntity } from '@vue-design/shared/entities';

@Module({
  imports: [TypeOrmModule.forFeature([FileEntity])],
  controllers: [FileController],
  providers: [FileService, OssService, QiniuService],
})
export class FileModule {}
