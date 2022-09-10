import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { SiteModule } from './site/site.module';
import { TagModule } from './tag/tag.module';
import { FileModule } from './file/file.module';
import { NavigationModule } from './navigation/navigation.module';
import { HomeModule } from './home/home.module';
import { CountModule } from './count/count.module';

export default [
    AuthModule,
    UserModule,
    SiteModule,
    TagModule,
    FileModule,
    NavigationModule,
    HomeModule,
    CountModule,
];
