import { Module } from '@nestjs/common';
import { ToolService } from './tool.service';
import { ToolController } from './tool.controller';
import { ToolTcpController } from './tool.tcp.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToolEntity } from '@/entities/tool.entity';
import { SiteEntity } from '@/entities/site.entity';
import { SiteService } from '@/modules/site/site.service';
// import { SiteModule } from '@/modules/site/site.module';

@Module({
    imports: [TypeOrmModule.forFeature([ToolEntity, SiteEntity])],
    controllers: [ToolController, ToolTcpController],
    providers: [ToolService, SiteService],
    exports: [ToolService],
})
export class ToolModule {}
