import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { ModuleRef } from '@nestjs/core';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super();
    }

    async validate(username: string): Promise<any> {
        const user = await this.authService.validateUser(username);
        if (!user) {
            throw new UnauthorizedException('local.strategy');
        }
        return user;
    }
}
