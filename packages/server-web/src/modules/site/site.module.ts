import { Module } from '@nestjs/common';
import { SiteService } from './site.service';
import { UserService } from '../user/user.service';
import { SiteController } from './site.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SiteEntity } from '@/entities/site.entity';
import { UserEntity } from '@/entities/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([SiteEntity, UserEntity])],
    controllers: [SiteController],
    providers: [SiteService, UserService],
    exports: [SiteService],
})
export class SiteModule {}
