import { UserModule } from '@/modules/user/user.module';
import { SiteModule } from '@/modules/site/site.module';
import { CountModule } from '@/modules/count/count.module';
import { Module } from '@nestjs/common';
import { TaskService } from './task.service';

@Module({
    imports: [UserModule, SiteModule, CountModule],
    providers: [TaskService],
})
export class TaskModule {}
