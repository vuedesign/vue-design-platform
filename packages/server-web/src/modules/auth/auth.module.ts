import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';

import { JwtStrategy } from './strategys/jwt.strategy';
import { LocalStrategy } from './strategys/local.strategy';
import { BaseMicroserviceModule } from '@/globals/microservices/base.module';
import globalConfig from '@/configs/global.config';
import { RsaService } from '@/globals/services/rsa.service';

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                return {
                    secret: configService.get('JWT.secret'),
                    signOptions: { expiresIn: '2d' },
                };
            },
        }),
        BaseMicroserviceModule,
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy, RsaService],
    exports: [AuthService, JwtModule],
})
export class AuthModule {}
