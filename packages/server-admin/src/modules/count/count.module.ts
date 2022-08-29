import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountEntity } from '@/entities/count.entity';
import { CountService } from './count.service';
import { CountController } from './count.controller';
import { CountTcpController } from './count.tcp.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CountEntity])],
  controllers: [CountController, CountTcpController],
  providers: [CountService],
  exports: [CountService],
})
export class CountModule {}
