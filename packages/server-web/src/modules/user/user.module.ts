import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { BaseMicroserviceModule } from '@/globals/microservices/base.module';

@Module({
  imports: [BaseMicroserviceModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
