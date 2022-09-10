import { Module } from '@nestjs/common';
import { HomeController } from './home.controller';
import { UserModule } from '../user/user.module';
import { SiteModule } from '../site/site.module';
import { NavigationModule } from '../navigation/navigation.module';

@Module({
    imports: [UserModule, SiteModule, NavigationModule],
    controllers: [HomeController],
})
export class HomeModule {}
