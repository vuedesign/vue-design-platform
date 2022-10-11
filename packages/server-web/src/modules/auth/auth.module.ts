import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';

import { JwtStrategy } from './strategys/jwt.strategy';
import { LocalStrategy } from './strategys/local.strategy';
import globalConfig from '@/configs/global.config';
import { RsaService } from '@/globals/services/rsa.service';
import { UserEntity } from '@/entities/user.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
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
    ],
    controllers: [AuthController],
    providers: [
        UserService,
        AuthService,
        LocalStrategy,
        JwtStrategy,
        RsaService,
    ],
    exports: [AuthService, JwtModule],
})
export class AuthModule {}
