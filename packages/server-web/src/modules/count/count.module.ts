import { Module } from '@nestjs/common';
import { CountService } from './count.service';
import { CountController } from './count.controller';
import { BaseMicroserviceModule } from '@/globals/microservices/base.module';

@Module({
  imports: [BaseMicroserviceModule],
  controllers: [CountController],
  providers: [CountService],
  exports: [CountService],
})
export class CountModule {}
