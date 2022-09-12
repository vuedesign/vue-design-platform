import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { TagTcpController } from './tag.tcp.controller';
import { TagEntity } from '@/entities/tag.entity';

@Module({
    imports: [TypeOrmModule.forFeature([TagEntity])],
    controllers: [TagController, TagTcpController],
    providers: [TagService],
    exports: [TagService],
})
export class TagModule {}
