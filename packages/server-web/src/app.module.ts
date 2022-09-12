import { Module, CacheModule } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { BaseMicroserviceModule } from '@/globals/microservices/base.module';
import { ConfigModule } from '@nestjs/config';
import { SiteModule } from './modules/site/site.module';
import { NavigationModule } from './modules/navigation/navigation.module';
import { AuthModule } from './modules/auth/auth.module';
import { CountModule } from './modules/count/count.module';
import { TagModule } from './modules/tag/tag.module';
import { UserModule } from './modules/user/user.module';
import microservicesConfig from '@/configs/microservices.config';
import globalConfig from '@/configs/global.config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [globalConfig, microservicesConfig],
        }),
        CacheModule.register({
            isGlobal: true,
        }),
        // 微服务
        BaseMicroserviceModule,
        SiteModule,
        NavigationModule,
        AuthModule,
        CountModule,
        TagModule,
        UserModule,
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
    ],
})
export class AppModule {}
