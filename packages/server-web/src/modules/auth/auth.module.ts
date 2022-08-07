import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthResolver } from './auth.resolver';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategys/jwt.strategy';
import { BaseMicroserviceModule } from '@/globals/microservices/base.module';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '7d' },
    }),
    BaseMicroserviceModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, AuthResolver],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
