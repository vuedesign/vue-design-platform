import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { BaseMicroserviceModule } from '@/globals/microservices/base.module';

@Module({
    imports: [BaseMicroserviceModule],
    controllers: [TagController],
    providers: [TagService],
    exports: [TagService],
})
export class TagModule {}
