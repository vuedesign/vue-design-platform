import { Module, CacheModule } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeormConfig from '@/configs/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { SiteModule } from './modules/site/site.module';
import { NavigationModule } from './modules/navigation/navigation.module';
import { AuthModule } from './modules/auth/auth.module';
import { CountModule } from './modules/count/count.module';
import { TagModule } from './modules/tag/tag.module';
import { UserModule } from './modules/user/user.module';
import { ToolModule } from './modules/tool/tool.module';
import { ConfigureModule } from './modules/configure/configure.module';
import { FileModule } from '@/modules/file/file.module';
import microservicesConfig from '@/configs/microservices.config';
import globalConfig from '@/configs/global.config';
import rsaConfig from '@/configs/rsa.config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [globalConfig, microservicesConfig, rsaConfig],
        }),
        CacheModule.register({
            isGlobal: true,
        }),
        TypeOrmModule.forRoot(typeormConfig),
        SiteModule,
        NavigationModule,
        AuthModule,
        CountModule,
        TagModule,
        UserModule,
        ToolModule,
        ConfigureModule,
        FileModule,
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
    ],
})
export class AppModule {}
