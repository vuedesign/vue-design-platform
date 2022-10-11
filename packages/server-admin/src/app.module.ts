import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeormConfig from '@/configs/typeorm.config';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from '@/modules/auth/auth.module';
import { UserModule } from '@/modules/user/user.module';
import { SiteModule } from '@/modules/site/site.module';
import { TagModule } from '@/modules/tag/tag.module';
import { FileModule } from '@/modules/file/file.module';
import { NavigationModule } from '@/modules/navigation/navigation.module';
import { HomeModule } from '@/modules/home/home.module';
import { CountModule } from '@/modules/count/count.module';
import { TaskModule } from '@/modules/task/task.module';
import { ToolModule } from '@/modules/tool/tool.module';
import { ConfigureModule } from './modules/configure/configure.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(typeormConfig),
        ScheduleModule.forRoot(),
        AuthModule,
        UserModule,
        SiteModule,
        TagModule,
        FileModule,
        NavigationModule,
        HomeModule,
        CountModule,
        TaskModule,
        ToolModule,
        ConfigureModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
    ],
})
export class AppModule {}
